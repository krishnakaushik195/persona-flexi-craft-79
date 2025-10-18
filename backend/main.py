from fastapi import FastAPI, Request, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os
import re
import json
import tempfile
from jsonschema import validate, ValidationError
import google.generativeai as genai
from pdfminer.high_level import extract_text
from pdfminer.pdfparser import PDFParser
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfpage import resolve1
import hashlib

# Load .env variables
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "YOUR_API_KEY_HERE")
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash")

app = FastAPI(title="Resume ➜ JSON API")

# Custom CORS middleware
@app.middleware("http")
async def custom_cors_middleware(request: Request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

# JSON schema (loose check)
resume_schema = {
    "type": "object",
    "minProperties": 1,
    "additionalProperties": True
}

parse_cache = {}

# --- PDF Utils ---
def extract_text_from_pdf(file_path):
    return extract_text(file_path)

def extract_links_from_pdf(file_path):
    links = []
    with open(file_path, 'rb') as f:
        parser = PDFParser(f)
        doc = PDFDocument(parser)
        for page in PDFPage.create_pages(doc):
            if 'Annots' in page.attrs:
                for annot in resolve1(page.attrs['Annots']):
                    uri = resolve1(annot).get('A', {}).get('URI', None)
                    if isinstance(uri, bytes):
                        uri = uri.decode("utf-8", errors="ignore")
                    if uri:
                        links.append(uri)
    return links

# --- JSON Helpers ---
def fallback_json_parser(text):
    try:
        json_match = re.search(r"\{.*\}", text, re.DOTALL)
        if json_match:
            return json.loads(json_match.group())
        return json.loads(text)
    except Exception:
        return None

def validate_json(data):
    try:
        validate(data, resume_schema)
        return True, None
    except ValidationError as ve:
        return False, str(ve)

def cross_verify_and_enhance_json(original_json, resume_text, links):
    # Fast path: skip second LLM pass for speed
    return original_json


# --- API Endpoint ---
@app.post("/parse-resume/")
async def parse_resume(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    try:
        # Save PDF to a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            content = await file.read()
            tmp.write(content)
            tmp_path = tmp.name

        # Compute file hash for caching
        file_hash = hashlib.sha256(content).hexdigest()
        if file_hash in parse_cache:
            return parse_cache[file_hash]

        # Extract content
        resume_text = extract_text_from_pdf(tmp_path)
        resume_links = extract_links_from_pdf(tmp_path)

        if not resume_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from the PDF.")

        # Prepare Gemini prompt
        prompt = f"""
You are a resume parser. Your job is to convert the given plain text and links into a structured JSON format suitable for a student portfolio website. Use the following fixed schema. Only update the values based on the provided resume data. Keep placeholders like "/placeholder.svg" where necessary.

### 🔍 Skill Inference Logic:
- Based on the *frequency*, *recency*, and *impact* of technologies used in **projects**, **experience**, and **achievements**, assign a numeric `level` to each skill from 0 to 100.
- Example:
    - 90–100: Expert level; core tech in recent projects or job roles.
    - 70–89: Strong proficiency; used regularly in work or multiple projects.
    - 50–69: Intermediate knowledge; used occasionally or in older projects.
    - 30–49: Basic familiarity; mentioned once or less impactful usage.
    - Below 30: Avoid unless strongly implied.
- Ensure `category` is accurate (e.g., "Frontend", "Backend", "Cloud", "DevOps", etc.)

---

Schema:
{{
  "personal_info": {{
    "name": "",
    "role": "",
    "tagline": "",
    "photo_url": "",
    "location": "",
    "email": "",
    "phone": "",
    "linkedin": "",
    "github": "",
    "twitter": ""
  }},
  "about": "",
  "skills": [
    {{ "name": "", "level": 0, "category": "" }}
  ],
  "projects": [
    {{
      "title": "",
      "description": "",
      "technologies": [""],
      "link": "",
      "image": ""
    }}
  ],
  "certifications": [
    {{
      "name": "",
      "issuer": "",
      "date": "",
      "image": ""
    }}
  ],
  "education": [
    {{
      "degree": "",
      "institution": "",
      "year": "",
      "location": ""
    }}
  ],
  "experience": [
    {{
      "position": "",
      "company": "",
      "duration": "",
      "description": ""
    }}
  ],
  "achievements": [""]
}}

Now parse the following resume details accordingly:

Text:
{resume_text}

Links:
{chr(10).join(resume_links)}

Return JSON only.
"""

        # Get Gemini response
        response = model.generate_content(prompt, generation_config={"response_mime_type": "application/json", "temperature": 0.2})
        raw_text = response.text.strip()
        resume_json = fallback_json_parser(raw_text)

        if resume_json is None:
            raise HTTPException(status_code=500, detail="Gemini did not return valid JSON.")

        is_valid, err = validate_json(resume_json)

        if not is_valid:
            return JSONResponse(status_code=200, content={"warning": f"Schema Warning: {err}", "json": resume_json})
        parse_cache[file_hash] = resume_json
        return resume_json

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Error: {str(e)}")