import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Navigation } from "../Navigation";
import { UploadButton } from "../UploadButton";

interface CreativeTemplateProps {
  children: React.ReactNode;
  personalInfo: any;
  activeSection: string;
  onSectionChange: (section: string) => void;
  isEditMode: boolean;
}

export const CreativeTemplate = ({ 
  children, 
  personalInfo, 
  activeSection, 
  onSectionChange, 
  isEditMode 
}: CreativeTemplateProps) => {
  return (
    <div className="w-[1370px] h-[600px] relative overflow-hidden">
      
      {/* Background Art */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-red-900/30 to-pink-900/30 rounded-3xl">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-red-500/20 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      {/* Main Container */}
      <div className="relative z-10 h-full flex flex-col p-8">
        
        {/* Artistic Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="w-20 h-20 ring-4 ring-orange-500/50">
                  <AvatarImage src={personalInfo.photo_url} alt={personalInfo.name} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-600 to-pink-600 text-white text-xl">
                    {personalInfo.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  {personalInfo.name}
                </h1>
                <p className="text-orange-200 text-lg">{personalInfo.role}</p>
                <p className="text-orange-300/70">{personalInfo.tagline}</p>
              </div>
            </div>
            
            {isEditMode && <UploadButton />}
          </div>
          
          {/* Creative Navigation */}
          <div className="flex justify-center">
            <div className="bg-black/20 backdrop-blur-sm rounded-full p-2">
              <Navigation 
                activeSection={activeSection}
                onSectionChange={onSectionChange}
                isEditMode={isEditMode}
                variant="creative"
              />
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        <Card className="flex-1 bg-black/20 backdrop-blur-sm border-orange-500/20 overflow-hidden">
          <div className="p-6 h-full overflow-y-auto">
            <div className="animate-fade-in">
              {children}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};