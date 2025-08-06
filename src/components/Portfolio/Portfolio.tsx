import { useState, useEffect } from "react";
import { ProfileSidebar } from "./ProfileSidebar";
import { UploadButton } from "./UploadButton";
import { AIAssistant } from "./AIAssistant";
import { AISettings } from "./AISettings";
import { ThemeEditor } from "./ThemeEditor";
import { Navigation } from "./Navigation";

import { ClassicTemplate } from "./templates/ClassicTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { HeroTemplate } from "./templates/HeroTemplate";
import { HomeSection } from "./sections/HomeSection";
import { AboutSection } from "./sections/AboutSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";
import { CertificationsSection } from "./sections/CertificationsSection";
import { EducationSection } from "./sections/EducationSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { ContactSection } from "./sections/ContactSection";
import { EditableAboutSection } from "./sections/EditableAboutSection";
import { EditableExperienceSection } from "./sections/EditableExperienceSection";
import { EditableProjectsSection } from "./sections/EditableProjectsSection";
import { EditableProfileSection } from "./sections/EditableProfileSection";
import { EditableSkillsSection } from "./sections/EditableSkillsSection";
import { EditableCertificationsSection } from "./sections/EditableCertificationsSection";
import { EditableEducationSection } from "./sections/EditableEducationSection";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { Button } from "@/components/ui/button";
import { Edit, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isEditMode, setIsEditMode] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('edit') === 'true';
  });
  const [localPortfolioData, setLocalPortfolioData] = useState(null);
  const [currentTemplate, setCurrentTemplate] = useState(() => {
    return localStorage.getItem('portfolio_template') || 'classic';
  });
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('portfolio_theme') || 'classic';
  });
  const { portfolioData, loading } = usePortfolioData();
  const { toast } = useToast();

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      setCurrentTheme(event.detail.id);
    };
    
    window.addEventListener('themeChanged', handleThemeChange as EventListener);
    return () => window.removeEventListener('themeChanged', handleThemeChange as EventListener);
  }, []);

  // Use local data if available, otherwise use fetched data
  const currentData = localPortfolioData || portfolioData;

  if (loading || !portfolioData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-emerald-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  const handleSaveData = (section: string, data: any) => {
    // Update the local portfolio data
    const updatedData = { ...currentData };
    
    switch (section) {
      case "Profile":
        updatedData.personal_info = data;
        break;
      case "About":
        updatedData.about = data.about;
        updatedData.achievements = data.achievements;
        break;
      case "Projects":
        updatedData.projects = data;
        break;
      case "Experience":
        updatedData.experience = data;
        break;
      case "Skills":
        updatedData.skills = data;
        break;
      case "Certifications":
        updatedData.certifications = data;
        break;
      case "Education":
        updatedData.education = data;
        break;
    }
    
    // Save to local state
    setLocalPortfolioData(updatedData);
    
    // Save to localStorage for persistence (using same key as usePortfolioData)
    localStorage.setItem('portfolio_data', JSON.stringify(updatedData));
    
    toast({
      title: "Changes Saved",
      description: `${section} data has been updated successfully.`,
    });
    setIsEditMode(false);
  };

  const handleTemplateChange = (template: string) => {
    setCurrentTemplate(template);
    localStorage.setItem('portfolio_template', template);
  };

  const renderTemplate = (children: React.ReactNode) => {
    const templateProps = {
      children,
      personalInfo: currentData.personal_info,
      activeSection,
      onSectionChange: setActiveSection,
      isEditMode
    };

    switch (currentTemplate) {
      case 'modern':
        return <ModernTemplate {...templateProps} />;
      case 'creative':
        return <CreativeTemplate {...templateProps} />;
      case 'hero':
        return <HeroTemplate {...templateProps} />;
      default:
        return <ClassicTemplate {...templateProps} />;
    }
  };

  const getBackgroundClass = () => {
    const themeData = localStorage.getItem('portfolio_theme_data');
    let themeGradient = "from-black via-gray-900 to-emerald-950";
    
    if (themeData) {
      try {
        const theme = JSON.parse(themeData);
        themeGradient = theme.gradient;
      } catch (e) {
        // Fallback to default
      }
    }

    switch (currentTemplate) {
      case 'modern':
        return `min-h-screen bg-gradient-to-br ${themeGradient} flex items-center justify-center p-8`;
      case 'creative':
        return `min-h-screen bg-gradient-to-br ${themeGradient} flex items-center justify-center p-8`;
      case 'hero':
        return "min-h-screen bg-background";
      default:
        return `min-h-screen bg-gradient-to-br ${themeGradient} flex items-center justify-center p-8`;
    }
  };

  const renderSection = () => {
    if (isEditMode) {
      switch (activeSection) {
        case "home":
        case "contact":
          return (
            <EditableProfileSection 
              personalInfo={currentData.personal_info}
              onSave={(data) => handleSaveData("Profile", data)}
            />
          );
        case "about":
          return (
            <EditableAboutSection 
              about={currentData.about}
              achievements={currentData.achievements}
              onSave={(data) => handleSaveData("About", data)}
            />
          );
        case "projects":
          return (
            <EditableProjectsSection 
              projects={currentData.projects}
              onSave={(data) => handleSaveData("Projects", data)}
            />
          );
        case "experience":
          return (
            <EditableExperienceSection 
              experience={currentData.experience}
              onSave={(data) => handleSaveData("Experience", data)}
            />
          );
        case "skills":
          return (
            <EditableSkillsSection 
              skills={currentData.skills}
              onSave={(data) => handleSaveData("Skills", data)}
            />
          );
        case "certifications":
          return (
            <EditableCertificationsSection 
              certifications={currentData.certifications}
              onSave={(data) => handleSaveData("Certifications", data)}
            />
          );
        case "education":
          return (
            <EditableEducationSection 
              education={currentData.education}
              onSave={(data) => handleSaveData("Education", data)}
            />
          );
        case "theme-editor":
          return <ThemeEditor />;
        case "ai-settings":
          return <AISettings />;
        default:
          return (
            <EditableProfileSection 
              personalInfo={currentData.personal_info}
              onSave={(data) => handleSaveData("Profile", data)}
            />
          );
      }
    }

    // View mode - original sections
    switch (activeSection) {
      case "home":
        return (
          <HomeSection 
            name={currentData.personal_info.name}
            role={currentData.personal_info.role}
            personalInfo={currentData.personal_info}
            portfolioData={currentData}
          />
        );
      case "about":
        return (
          <AboutSection 
            about={currentData.about}
            achievements={currentData.achievements}
          />
        );
      case "projects":
        return <ProjectsSection projects={currentData.projects} />;
      case "skills":
        return <SkillsSection skills={currentData.skills} />;
      case "certifications":
        return <CertificationsSection certifications={currentData.certifications} />;
      case "education":
        return <EducationSection education={currentData.education} />;
      case "experience":
        return <ExperienceSection experience={currentData.experience} />;
      case "contact":
        return <ContactSection personalInfo={currentData.personal_info} />;
      default:
        return (
          <HomeSection 
            name={currentData.personal_info.name}
            role={currentData.personal_info.role}
            personalInfo={currentData.personal_info}
            portfolioData={currentData}
          />
        );
    }
  };

  return (
    <div className={getBackgroundClass()}>
      {currentTemplate === 'hero' ? (
        <div className="w-full space-y-6">
          {/* Control Bar for Hero Template */}
          <div className="absolute top-4 left-4 right-4 z-50 flex justify-end items-center">
            <Button 
              onClick={() => setIsEditMode(!isEditMode)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Edit size={16} />
              {isEditMode ? "Exit Edit" : "Edit Mode"}
            </Button>
          </div>
          
          {/* Hero Template Container */}
          {renderTemplate(renderSection())}
        </div>
      ) : (
        <div className="w-full max-w-7xl space-y-6">
          {/* Control Bar for Other Templates */}
          <div className="flex justify-end items-center">
            <Button 
              onClick={() => setIsEditMode(!isEditMode)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Edit size={16} />
              {isEditMode ? "Exit Edit" : "Edit Mode"}
            </Button>
          </div>
          
          {/* Template Container */}
          {renderTemplate(renderSection())}
        </div>
      )}
    </div>
  );
};