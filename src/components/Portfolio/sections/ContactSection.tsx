import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";

interface PersonalInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

interface ContactSectionProps {
  personalInfo: PersonalInfo;
}

export const ContactSection = ({ personalInfo }: ContactSectionProps) => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-foreground">Contact</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-portfolio-card rounded-2xl p-6 space-y-6">
          <h3 className="text-xl font-semibold text-foreground">Get in Touch</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/20 rounded-xl">
                <Mail size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium">Email</p>
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="text-portfolio-text-muted hover:text-primary transition-colors"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/20 rounded-xl">
                <Phone size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium">Phone</p>
                <a 
                  href={`tel:${personalInfo.phone}`}
                  className="text-portfolio-text-muted hover:text-primary transition-colors"
                >
                  {personalInfo.phone}
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/20 rounded-xl">
                <MapPin size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium">Location</p>
                <p className="text-portfolio-text-muted">{personalInfo.location}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-portfolio-card rounded-2xl p-6 space-y-6">
          <h3 className="text-xl font-semibold text-foreground">Connect</h3>
          
          <div className="space-y-4">
            <Button variant="portfolio-outline" className="w-full justify-start" asChild>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
                LinkedIn Profile
              </a>
            </Button>
            
            <Button variant="portfolio-outline" className="w-full justify-start" asChild>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                <Github size={20} />
                GitHub Profile
              </a>
            </Button>
            
            <Button variant="portfolio" className="w-full" asChild>
              <a href={`mailto:${personalInfo.email}`}>
                <Mail size={20} />
                Send Email
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};