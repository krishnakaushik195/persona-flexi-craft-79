import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResumeUpload } from '@/components/Upload/ResumeUpload';
import { usePortfolioData, PortfolioData } from '@/hooks/usePortfolioData';
import { FileText, User, Eye, Upload as UploadIcon, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Upload = () => {
  const navigate = useNavigate();
  const { portfolioData, hasData, clearPortfolioData, loading } = usePortfolioData();

  const handleUploadSuccess = (data: PortfolioData) => {
    navigate('/portfolio');
  };

  const handleViewPortfolio = () => {
    navigate('/portfolio');
  };

  const handleClearData = () => {
    clearPortfolioData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Portfolio Manager</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload your resume to automatically generate a beautiful portfolio, or view your existing data.
            </p>
          </div>

          {/* Existing Data Section */}
          {hasData && portfolioData && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5" />
                  Current Portfolio Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{portfolioData.personal_info.name}</h3>
                    <p className="text-muted-foreground">{portfolioData.personal_info.role}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{portfolioData.projects.length} Projects</Badge>
                    <Badge variant="secondary">{portfolioData.skills.length} Skills</Badge>
                    <Badge variant="secondary">{portfolioData.experience.length} Experiences</Badge>
                  </div>
                </div>
                
                <Alert>
                  <FileText className="h-4 w-4" />
                  <AlertDescription>
                    You have existing portfolio data. Upload a new resume to update it, or view your current portfolio.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-3 flex-wrap">
                  <Button onClick={handleViewPortfolio} className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    View Portfolio
                  </Button>
                  <Button variant="outline" onClick={handleClearData} className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Clear Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upload Section */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                {hasData ? 'Update Your Portfolio' : 'Create Your Portfolio'}
              </h2>
              <p className="text-muted-foreground">
                {hasData 
                  ? 'Upload a new resume to update your portfolio with fresh data'
                  : 'Upload your resume and let AI create a stunning portfolio for you'
                }
              </p>
            </div>

            <ResumeUpload onUploadSuccess={handleUploadSuccess} />
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card>
              <CardContent className="p-6 text-center space-y-3">
                <UploadIcon className="h-8 w-8 mx-auto text-primary" />
                <h3 className="font-semibold">Smart Parsing</h3>
                <p className="text-sm text-muted-foreground">
                  AI extracts skills, experience, and projects from your resume
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center space-y-3">
                <User className="h-8 w-8 mx-auto text-primary" />
                <h3 className="font-semibold">Beautiful Design</h3>
                <p className="text-sm text-muted-foreground">
                  Generates a modern, responsive portfolio automatically
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center space-y-3">
                <Eye className="h-8 w-8 mx-auto text-primary" />
                <h3 className="font-semibold">Instant Preview</h3>
                <p className="text-sm text-muted-foreground">
                  View and customize your portfolio immediately after upload
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
