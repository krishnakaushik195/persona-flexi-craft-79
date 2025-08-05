import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Navigation } from "../Navigation";
import { UploadButton } from "../UploadButton";

interface ModernTemplateProps {
  children: React.ReactNode;
  personalInfo: any;
  activeSection: string;
  onSectionChange: (section: string) => void;
  isEditMode: boolean;
}

export const ModernTemplate = ({ 
  children, 
  personalInfo, 
  activeSection, 
  onSectionChange, 
  isEditMode 
}: ModernTemplateProps) => {
  return (
    <div className="w-[1370px] h-[600px] flex flex-col gap-4">
      
      {/* Header Card */}
      <Card className="p-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Avatar className="w-16 h-16 ring-2 ring-purple-500/50">
              <AvatarImage src={personalInfo.photo_url} alt={personalInfo.name} />
              <AvatarFallback className="bg-purple-600 text-white">
                {personalInfo.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-white">{personalInfo.name}</h1>
              <p className="text-purple-300">{personalInfo.role}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary" className="bg-purple-600/30 text-purple-200">
                  {personalInfo.location}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Navigation 
              activeSection={activeSection}
              onSectionChange={onSectionChange}
              isEditMode={isEditMode}
              variant="pills"
            />
            {isEditMode && <UploadButton />}
          </div>
        </div>
      </Card>
      
      {/* Content Card */}
      <Card className="flex-1 p-6 bg-slate-900/40 border-slate-700/50 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="animate-fade-in">
            {children}
          </div>
        </div>
      </Card>
    </div>
  );
};