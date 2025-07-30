import { useNavigate } from "react-router-dom";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Eye, Upload } from "lucide-react";

const Start = () => {
  const navigate = useNavigate();
  const { hasData, portfolioData, loading } = usePortfolioData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Portfolio Builder
          </h1>
          <p className="text-xl text-muted-foreground">
            Create stunning portfolios from your resume in minutes
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 max-w-md mx-auto">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group w-full" onClick={() => navigate("/login")}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Access your portfolio editor
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full" onClick={() => navigate("/login")}>
                Sign In
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group w-full" onClick={() => navigate("/upload")}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Upload Resume</CardTitle>
              <CardDescription>
                Create a new portfolio from your resume
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full" onClick={() => navigate("/upload")}>
                Upload Resume
              </Button>
            </CardContent>
          </Card>

          {hasData && (
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group w-full" onClick={() => navigate("/portfolio")}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>View Portfolio</CardTitle>
                <CardDescription>
                  See your existing portfolio for {portfolioData?.personal_info?.name || "your profile"}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button className="w-full" onClick={() => navigate("/portfolio")}>
                  View Portfolio
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {!hasData && (
          <div className="mt-12 text-center">
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="mx-auto mb-3 p-2 bg-primary/10 rounded-full w-fit">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Smart Parsing</h3>
                <p className="text-sm text-muted-foreground">AI extracts all relevant information from your resume</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 p-2 bg-primary/10 rounded-full w-fit">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Beautiful Design</h3>
                <p className="text-sm text-muted-foreground">Professional layouts that make you stand out</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 p-2 bg-primary/10 rounded-full w-fit">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Instant Preview</h3>
                <p className="text-sm text-muted-foreground">See your portfolio come to life immediately</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Start;