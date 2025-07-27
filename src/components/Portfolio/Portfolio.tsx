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
            <AIAssistant portfolioData={portfolioData} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-5xl space-y-6">
        {/* Upload Resume Button */}
        <div className="flex justify-end">
          <UploadButton />
        </div>
        
        {/* Main Container */}
        <div className="bg-portfolio-card rounded-3xl w-full h-[600px] flex flex-col transform hover:scale-[1.02] transition-all duration-300" 
             style={{ 
               boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(34, 197, 94, 0.1)',
               backdropFilter: 'blur(10px)'
             }}>
          
          {/* Navigation Header */}
          <div className="p-6 pb-3">
            <div className="bg-secondary/20 rounded-2xl p-3">
              <Navigation 
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </div>
          </div>
          
          {/* Content Area */}
          <div className="flex-1 px-6 pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
              {/* Sidebar */}
              <div className="lg:col-span-3 h-full">
                <ProfileSidebar personalInfo={portfolioData.personal_info} />
              </div>
              
              {/* Main Content */}
              <div className="lg:col-span-9 h-full">
                <div className="bg-secondary/20 rounded-2xl h-full p-4">
                  <div className="animate-fade-in">
                    {renderSection()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};