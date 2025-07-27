import { useState } from "react";
import { ProfileSidebar } from "./ProfileSidebar";
import { UploadButton } from "./UploadButton";
import { AIAssistant } from "./AIAssistant";
import { Navigation } from "./Navigation";
import { HomeSection } from "./sections/HomeSection";
import { AboutSection } from "./sections/AboutSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";
import { CertificationsSection } from "./sections/CertificationsSection";
import { EducationSection } from "./sections/EducationSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { ContactSection } from "./sections/ContactSection";
import { usePortfolioData } from "@/hooks/usePortfolioData";

export const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const { portfolioData, loading } = usePortfolioData();

  if (loading || !portfolioData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <div className="w-full">
            <HomeSection 
              name={portfolioData.personal_info.name}
              role={portfolioData.personal_info.role}
            />
            {/* AI Assistant takes full space in Home Section */}
            <AIAssistant portfolioData={portfolioData} />
          </div>
        );
      case "about":
        return (
          <AboutSection 
            about={portfolioData.about}
            achievements={portfolioData.achievements}
          />
        );
      case "projects":
        return <ProjectsSection projects={portfolioData.projects} />;
      case "skills":
        return <SkillsSection skills={portfolioData.skills} />;
      case "certifications":
        return <CertificationsSection certifications={portfolioData.certifications} />;
      case "education":
        return <EducationSection education={portfolioData.education} />;
      case "experience":
        return <ExperienceSection experience={portfolioData.experience} />;
      case "contact":
        return <ContactSection personalInfo={portfolioData.personal_info} />;
      default:
        return (
          <div className="w-full">
            <HomeSection 
              name={portfolioData.personal_info.name}
              role={portfolioData.personal_info.role}
            />
            {/* AI Assistant takes full space in Home Section */}
            <AIAssistant portfolioData={portfolioData} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl space-y-4">
        {/* Upload Resume Button - Outside the main box */}
        <div className="flex justify-end">
          <UploadButton />
        </div>
        
        {/* Main Fixed Container */}
        <div className="bg-portfolio-card rounded-3xl p-6 shadow-2xl h-[85vh] max-h-[800px] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            {/* Left Sidebar */}
            <div className="lg:col-span-3 overflow-y-auto scrollbar-hide">
              <ProfileSidebar personalInfo={portfolioData.personal_info} />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-9 flex flex-col h-full overflow-hidden">
              {/* Compact Navigation */}
              <div className="flex-shrink-0 mb-4">
                <Navigation 
                  activeSection={activeSection}
                  onSectionChange={setActiveSection}
                />
              </div>
              
              {/* Content Sections with Hidden Scrollbar */}
              <div className="flex-1 bg-secondary/20 rounded-2xl p-4 overflow-y-auto scrollbar-hide">
                <div className="animate-fade-in">
                  {renderSection()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};