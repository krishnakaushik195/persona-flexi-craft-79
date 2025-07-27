import { useState } from "react";
import { ProfileSidebar } from "./ProfileSidebar";
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
          <HomeSection 
            name={portfolioData.personal_info.name}
            role={portfolioData.personal_info.role}
          />
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
          <HomeSection 
            name={portfolioData.personal_info.name}
            role={portfolioData.personal_info.role}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-7xl">
        {/* Main Centered Container */}
        <div className="bg-portfolio-card rounded-3xl p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
            {/* Left Sidebar */}
            <div className="lg:col-span-3 space-y-6">
              <ProfileSidebar personalInfo={portfolioData.personal_info} />
              
              {/* AI Assistant - Compact Version in Sidebar */}
              <div className="lg:block hidden">
                <AIAssistant portfolioData={portfolioData} />
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-9 space-y-6">
              {/* Header with Navigation */}
              <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  {portfolioData.personal_info.name}
                </h1>
                <p className="text-xl text-portfolio-text-muted">
                  {portfolioData.personal_info.role}
                </p>
              </div>
              
              <Navigation 
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
              
              {/* AI Assistant - Mobile Version */}
              <div className="lg:hidden block">
                <AIAssistant portfolioData={portfolioData} />
              </div>
              
              {/* Content Sections */}
              <div className="bg-secondary/20 rounded-2xl p-6 min-h-[500px]">
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