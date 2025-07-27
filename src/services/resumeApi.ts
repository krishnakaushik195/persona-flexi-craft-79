import { PortfolioData } from '@/hooks/usePortfolioData';

const API_BASE_URL = 'http://localhost:8000'; // Your FastAPI backend

export interface ResumeUploadResponse extends PortfolioData {
  warning?: string;
}

export const uploadResume = async (file: File): Promise<ResumeUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/parse-resume/`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to parse resume');
  }

  return response.json();
};