import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Navigation } from "../Navigation";
import { UploadButton } from "../UploadButton";
import { Github, Linkedin, Twitter, Instagram, Mail, ExternalLink } from "lucide-react";

interface HeroTemplateProps {
  children: React.ReactNode;
  personalInfo: any;
  activeSection: string;
  onSectionChange: (section: string) => void;
  isEditMode: boolean;
}

export const HeroTemplate = ({ 
  children, 
  personalInfo, 
  activeSection, 
  onSectionChange, 
  isEditMode 
}: HeroTemplateProps) => {
  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    instagram: Instagram,
    email: Mail,
    website: ExternalLink
  };

  return (
    <div className="w-full min-h-[600px] bg-background relative overflow-hidden">
      
      {/* Network Graphics Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1400 600">
          <defs>
            <pattern id="network" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#network)"/>
          {/* Connection Lines */}
          <g stroke="currentColor" strokeWidth="1" opacity="0.2">
            <line x1="100" y1="150" x2="300" y2="200"/>
            <line x1="300" y1="200" x2="500" y2="180"/>
            <line x1="500" y1="180" x2="700" y2="220"/>
            <line x1="200" y1="300" x2="400" y2="350"/>
            <line x1="400" y1="350" x2="600" y2="320"/>
            <line x1="800" y1="150" x2="1000" y2="180"/>
            <line x1="1000" y1="180" x2="1200" y2="200"/>
            <line x1="150" y1="450" x2="350" y2="480"/>
            <line x1="350" y1="480" x2="550" y2="460"/>
          </g>
        </svg>
      </div>

      {/* Header Navigation */}
      <header className="relative z-10 w-full py-4 px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">J</span>
            </div>
            <span className="font-bold text-xl">Jigar</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Navigation 
              activeSection={activeSection}
              onSectionChange={onSectionChange}
              isEditMode={isEditMode}
              variant="horizontal"
            />
            {isEditMode && <UploadButton />}
          </div>
        </div>
      </header>

      {/* Main Content */}
      {activeSection === 'home' ? (
        <div className="relative z-10 flex-1 px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[400px]">
              
              {/* Left Content */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl font-bold">
                    Hi There,
                  </h1>
                  <h2 className="text-5xl lg:text-6xl font-bold">
                    I'm {personalInfo.name.split(' ')[0]}{' '}
                    <span className="text-orange-500">{personalInfo.name.split(' ')[1] || 'Sable'}</span>
                  </h2>
                  <p className="text-xl lg:text-2xl text-muted-foreground">
                    I Am Into {personalInfo.role || 'Web Development'}
                  </p>
                </div>
                
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full"
                  onClick={() => onSectionChange('about')}
                >
                  About Me ➜
                </Button>
                
                {/* Social Icons */}
                <div className="flex gap-4 pt-4">
                  {personalInfo.social && Object.entries(personalInfo.social).map(([platform, url]) => {
                    const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                    if (!IconComponent || !url) return null;
                    
                    return (
                      <a
                        key={platform}
                        href={url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        <IconComponent size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
              
              {/* Right Content - Avatar */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="w-80 h-80 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Avatar className="w-64 h-64">
                      <AvatarImage src={personalInfo.photo_url} alt={personalInfo.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-900 text-6xl">
                        {personalInfo.name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  {/* Waving hand animation could be added here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex-1 px-8 py-6 overflow-hidden">
          <div className="max-w-7xl mx-auto h-full">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl border p-6 h-full overflow-y-auto">
              <div className="animate-fade-in">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};