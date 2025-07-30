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
  const { portfolioData, loading } = usePortfolioData();
  const { toast } = useToast();

  // Use local data if available, otherwise use fetched data
  const currentData = localPortfolioData || portfolioData;

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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-emerald-950 flex items-center justify-center p-8">
      <div className="w-full max-w-5xl space-y-6">
        {/* Edit Button */}
        <div className="flex justify-end">
          <Button 
            onClick={() => setIsEditMode(!isEditMode)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Edit size={16} />
            {isEditMode ? "Exit Edit" : "Edit Mode"}
          </Button>
        </div>
        
        {/* Main Container */}
        <div className="bg-portfolio-card rounded-3xl w-full h-[600px] flex flex-col transform hover:scale-[1.02] transition-all duration-300" 
             style={{ 
               boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(34, 197, 94, 0.1)',
               backdropFilter: 'blur(10px)'
             }}>
          
          {/* Navigation Header */}
          <div className="p-6 pb-3">
            <div className="bg-secondary/20 rounded-2xl p-3 flex justify-between items-center">
              <Navigation 
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
              
              {/* Upload Resume Button - Inside Edit Mode */}
              {isEditMode && (
                <UploadButton />
              )}
            </div>
          </div>
          
          {/* Content Area */}
          <div className="flex-1 px-6 pb-6 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
              {/* Sidebar */}
              <div className="lg:col-span-3 h-full overflow-y-auto">
                <ProfileSidebar personalInfo={currentData.personal_info} />
              </div>
              
              {/* Main Content */}
              <div className="lg:col-span-9 h-full overflow-hidden">
                <div className="bg-secondary/20 rounded-2xl h-full p-2 overflow-y-auto">
                  <div className="animate-fade-in h-full">
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