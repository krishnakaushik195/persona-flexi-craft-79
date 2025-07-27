import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResumeUpload } from "@/components/Upload/ResumeUpload";
import { TemplateSelector } from "@/components/Portfolio/TemplateSelector";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PortfolioData } from "@/types/portfolio";

const Upload = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'template' | 'upload'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);

  const handleUploadSuccess = (data: PortfolioData) => {
    // Add template selection to the data
    const dataWithTemplate = { ...data, template: selectedTemplate };
    setPortfolioData(dataWithTemplate);
    
    // Store in localStorage with template
    localStorage.setItem('portfolioData', JSON.stringify(dataWithTemplate));
    
    // Navigate to portfolio
    navigate("/portfolio");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => {
              if (step === 'upload') {
                setStep('template');
              } else {
                navigate("/");
              }
            }}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {step === 'upload' ? 'Back to Templates' : 'Back'}
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold">
              {step === 'template' ? 'Choose Your Template' : 'Upload Your Resume'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {step === 'template' 
                ? 'Select the perfect style for your portfolio' 
                : 'Upload your resume to create a beautiful portfolio'
              }
            </p>
          </div>
        </div>

        {step === 'template' ? (
          <>
            <TemplateSelector 
              selectedTemplate={selectedTemplate}
              onTemplateSelect={setSelectedTemplate}
            />
            <div className="flex justify-center mt-8">
              <Button 
                onClick={() => setStep('upload')}
                className="gap-2"
                size="lg"
              >
                Continue with {selectedTemplate === 'modern' ? 'Modern Pro' : selectedTemplate === 'minimal' ? 'Minimal Clean' : 'Creative Funk'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <ResumeUpload onUploadSuccess={handleUploadSuccess} />
        )}
      </div>
    </div>
  );
};

export default Upload;