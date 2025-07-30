import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { uploadResume } from '@/services/resumeApi';
import { usePortfolioData, PortfolioData } from '@/hooks/usePortfolioData';
import { useToast } from '@/hooks/use-toast';

interface ResumeUploadProps {
  onUploadSuccess: (data: PortfolioData) => void;
}

export const ResumeUpload = ({ onUploadSuccess }: ResumeUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const { savePortfolioData } = usePortfolioData();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.includes('pdf')) {
      setError('Please upload a PDF file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB');
      return;
    }

    setError(null);
    setWarning(null);
    setUploading(true);
    setUploadProgress(10);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const result = await uploadResume(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Save to localStorage and state
      savePortfolioData(result);
      
      if (result.warning) {
        setWarning(result.warning);
      }

      toast({
        title: "Resume parsed successfully!",
        description: "Your portfolio has been updated with the parsed data.",
      });

      setTimeout(() => {
        onUploadSuccess(result);
      }, 1000);

    } catch (err) {
      setUploadProgress(0);
      const errorMessage = err instanceof Error ? err.message : 'Failed to parse resume';
      setError(errorMessage);
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Upload Your Resume</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={uploading}
          />
          
          <div className="space-y-4">
            {uploading ? (
              <>
                <Loader2 className="h-12 w-12 mx-auto text-primary animate-spin" />
                <p className="text-lg font-medium">Processing your resume...</p>
                <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
                <p className="text-sm text-muted-foreground">{uploadProgress}% complete</p>
              </>
            ) : (
              <>
                <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Drop your resume here or click to browse</p>
                  <p className="text-sm text-muted-foreground">PDF files only, max 10MB</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  className="mx-auto"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Select PDF File
                </Button>
              </>
            )}
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {warning && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{warning}</AlertDescription>
          </Alert>
        )}

        {uploadProgress === 100 && !error && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Resume parsed successfully! Redirecting to your portfolio...</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};