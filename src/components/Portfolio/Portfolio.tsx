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
import { ContactSection } from "./sections/ContactSection";
import portfolioData from "@/data/portfolio.json";

export const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");

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
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <ProfileSidebar personalInfo={portfolioData.personal_info} />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-9 space-y-8">
            {/* AI Assistant */}
            <AIAssistant />
            
            {/* Navigation */}
            <Navigation 
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
            
            {/* Content Sections */}
            <div className="bg-portfolio-card rounded-3xl p-8">
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};