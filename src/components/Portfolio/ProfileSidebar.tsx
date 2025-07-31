import { Button } from "@/components/ui/button";
import { Linkedin, Github, Twitter, Download, User } from "lucide-react";

interface PersonalInfo {
  name: string;
  tagline: string;
  photo_url: string;
  linkedin: string;
  github: string;
  twitter: string;
}

interface ProfileSidebarProps {
  personalInfo: PersonalInfo;
}

export const ProfileSidebar = ({ personalInfo }: ProfileSidebarProps) => {
  return (
    <div className="bg-portfolio-sidebar p-8 rounded-3xl h-fit sticky top-8">
      <div className="text-center space-y-6">
        {/* Profile Photo */}
        <div className="relative mx-auto w-32 h-32">
          <div className="w-full h-full rounded-full bg-secondary/20 border-4 border-primary/30 flex items-center justify-center overflow-hidden">
            {personalInfo.photo_url ? (
              <img 
                src={personalInfo.photo_url} 
                alt={personalInfo.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={48} className="text-muted-foreground" />
            )}
          </div>
          
        </div>

        {/* Name & Tagline */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">{personalInfo.name}</h1>
          <p className="text-portfolio-text-muted text-sm leading-relaxed">
            {personalInfo.tagline}
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4">
          <a 
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-secondary/50 hover:bg-primary/20 transition-colors duration-300 group"
          >
            <Linkedin size={20} className="text-portfolio-text-muted group-hover:text-primary transition-colors" />
          </a>
          <a 
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-secondary/50 hover:bg-primary/20 transition-colors duration-300 group"
          >
            <Github size={20} className="text-portfolio-text-muted group-hover:text-primary transition-colors" />
          </a>
          <a 
            href={personalInfo.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-secondary/50 hover:bg-primary/20 transition-colors duration-300 group"
          >
            <Twitter size={20} className="text-portfolio-text-muted group-hover:text-primary transition-colors" />
          </a>
        </div>

        {/* Download CV Button */}
        <Button variant="portfolio" className="w-full py-3">
          <Download size={18} />
          Download CV
        </Button>
      </div>
    </div>
  );
};