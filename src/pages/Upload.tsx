import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResumeUpload } from '@/components/Upload/ResumeUpload';
import { usePortfolioData, PortfolioData } from '@/hooks/usePortfolioData';
import { FileText, User, Eye, Upload as UploadIcon, Trash2, Plus, Settings } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TemplateSelector } from '@/components/Portfolio/TemplateSelector';
import { useState } from 'react';

const Upload = () => {
  const navigate = useNavigate();
  const { portfolioData, hasData, clearPortfolioData, loading } = usePortfolioData();
  const [showUploadForm, setShowUploadForm] = useState(!hasData);
  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    return localStorage.getItem('portfolio_template') || 'classic';
  });

  const handleUploadSuccess = (data: PortfolioData) => {
    // Save the selected template to localStorage
    localStorage.setItem('portfolio_template', selectedTemplate);
    navigate('/portfolio');
  };

  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template);
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
              {hasData 
                ? 'Welcome back! View your existing portfolio or manage your data below.'
                : 'Upload your resume to automatically generate a beautiful portfolio.'
              }
            </p>
          </div>

          {/* Quick Actions for Returning Users */}
          {hasData && (
            <div className="flex justify-center gap-4 flex-wrap">
              <Button onClick={handleViewPortfolio} size="lg" className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                View My Portfolio
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowUploadForm(!showUploadForm)}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Manage Portfolio
              </Button>
            </div>
          )}

          {/* Existing Portfolio Section - Primary for returning users */}
          {hasData && portfolioData && (
            <div className="space-y-6">
              <Card className="border-emerald-500/30 bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-950/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <User className="h-6 w-6 text-primary" />
                    <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">Your Portfolio</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-foreground">{portfolioData.personal_info.name}</h3>
                      <p className="text-lg text-muted-foreground">{portfolioData.personal_info.role}</p>
                      {portfolioData.personal_info.email && (
                        <p className="text-sm text-muted-foreground">{portfolioData.personal_info.email}</p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Badge className="text-sm py-1 px-3">{portfolioData.projects.length} Projects</Badge>
                      <Badge className="text-sm py-1 px-3">{portfolioData.skills.length} Skills</Badge>
                      <Badge className="text-sm py-1 px-3">{portfolioData.experience.length} Experiences</Badge>
                      <Badge className="text-sm py-1 px-3">{portfolioData.education.length} Education</Badge>
                    </div>
                  </div>

                  <div className="flex gap-4 flex-wrap">
                    <Button onClick={handleViewPortfolio} size="lg" className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      View Portfolio
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowUploadForm(!showUploadForm)}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      {showUploadForm ? 'Hide Upload' : 'Upload New Resume'}
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={handleClearData} 
                      className="flex items-center gap-2 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      Clear Data
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {showUploadForm && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Replace Portfolio Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <FileText className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Warning:</strong> Uploading a new resume will completely replace your existing portfolio data. This action cannot be undone.
                      </AlertDescription>
                    </Alert>
                    
                    {/* Template Selection for existing users */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Choose Template (Optional)</h4>
                      <div className="flex justify-center">
                        <TemplateSelector 
                          currentTemplate={selectedTemplate}
                          onTemplateChange={handleTemplateChange}
                        />
                      </div>
                    </div>
                    
                    <ResumeUpload onUploadSuccess={handleUploadSuccess} />
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* New User Upload Section */}
          {!hasData && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Create Your Portfolio</h2>
                <p className="text-muted-foreground">
                  Upload your resume and let AI create a stunning portfolio for you
                </p>
              </div>
              
              {/* Template Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Choose Your Template
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <TemplateSelector 
                      currentTemplate={selectedTemplate}
                      onTemplateChange={handleTemplateChange}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    Select a template that best fits your style. You can change this later.
                  </p>
                </CardContent>
              </Card>
              
              <ResumeUpload onUploadSuccess={handleUploadSuccess} />
            </div>
          )}

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
