import { ProfileSidebar } from "../ProfileSidebar";
import { Navigation } from "../Navigation";
import { UploadButton } from "../UploadButton";

interface ClassicTemplateProps {
  children: React.ReactNode;
  personalInfo: any;
  activeSection: string;
  onSectionChange: (section: string) => void;
  isEditMode: boolean;
}

export const ClassicTemplate = ({ 
  children, 
  personalInfo, 
  activeSection, 
  onSectionChange, 
  isEditMode 
}: ClassicTemplateProps) => {
  return (
    <div className="bg-portfolio-card rounded-3xl w-[1370px] h-[600px] flex flex-col transform hover:scale-[1.02] transition-all duration-300" 
         style={{ 
           boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(34, 197, 94, 0.1)',
           backdropFilter: 'blur(10px)'
         }}>
      
      {/* Navigation Header */}
      <div className="p-6 pb-3">
        <div className="bg-secondary/20 rounded-2xl p-3 flex justify-between items-center">
          <Navigation 
            activeSection={activeSection}
            onSectionChange={onSectionChange}
            isEditMode={isEditMode}
          />
          
          {isEditMode && (
            <div className="flex gap-2">
              <UploadButton />
            </div>
          )}
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 px-6 pb-6 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          {/* Sidebar */}
          <div className="lg:col-span-3 h-full overflow-y-auto">
            <ProfileSidebar personalInfo={personalInfo} />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-9 h-full overflow-hidden">
            <div className="bg-secondary/20 rounded-2xl h-full p-2 overflow-y-auto">
              <div className="animate-fade-in h-full">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};