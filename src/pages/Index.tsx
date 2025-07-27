import { usePortfolioData } from "@/hooks/usePortfolioData";
import { ModernTemplate } from "@/components/Portfolio/templates/ModernTemplate";
import { MinimalTemplate } from "@/components/Portfolio/templates/MinimalTemplate";
import { CreativeTemplate } from "@/components/Portfolio/templates/CreativeTemplate";
import { Portfolio } from "@/components/Portfolio/Portfolio";

const Index = () => {
  const { hasData, portfolioData, loading } = usePortfolioData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  if (!hasData || !portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">No Portfolio Data Found</h1>
          <p className="text-muted-foreground mb-6">
            It looks like you haven't uploaded a resume yet. Get started by uploading your resume to create a beautiful portfolio.
          </p>
          <a href="/" className="text-primary hover:underline">Go back to start</a>
        </div>
      </div>
    );
  }

  // Render the selected template or default to original Portfolio component
  const selectedTemplate = portfolioData.template || 'original';
  
  switch (selectedTemplate) {
    case 'modern':
      return <ModernTemplate data={portfolioData} />;
    case 'minimal':
      return <MinimalTemplate data={portfolioData} />;
    case 'creative':
      return <CreativeTemplate data={portfolioData} />;
    default:
      return <Portfolio />;
  }
};

export default Index;