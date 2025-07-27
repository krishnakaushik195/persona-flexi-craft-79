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
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { Button } from "@/components/ui/button";
import { Edit, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const { portfolioData, loading } = usePortfolioData();
  const { toast } = useToast();

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
    // Here you would normally save to a backend or local storage
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
              personalInfo={portfolioData.personal_info}
              onSave={(data) => handleSaveData("Profile", data)}
            />
          );
        case "about":
          return (
            <EditableAboutSection 
              about={portfolioData.about}
              achievements={portfolioData.achievements}
              onSave={(data) => handleSaveData("About", data)}
            />
          );
        case "projects":
          return (
            <EditableProjectsSection 
              projects={portfolioData.projects}
              onSave={(data) => handleSaveData("Projects", data)}
            />
          );
        case "experience":
          return (
            <EditableExperienceSection 
              experience={portfolioData.experience}
              onSave={(data) => handleSaveData("Experience", data)}
            />
          );
        case "skills":
        case "certifications":
        case "education":
          return (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4">Edit {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h3>
              <p className="text-muted-foreground">Editing for this section coming soon...</p>
            </div>
          );
        default:
          return (
            <EditableProfileSection 
              personalInfo={portfolioData.personal_info}
              onSave={(data) => handleSaveData("Profile", data)}
            />
          );
      }
    }

    // View mode - original sections
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
                <ProfileSidebar personalInfo={portfolioData.personal_info} />
              </div>
              
              {/* Main Content */}
              <div className="lg:col-span-9 h-full overflow-hidden">
                <div className="bg-secondary/20 rounded-2xl h-full p-4 overflow-y-auto">
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