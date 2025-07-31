import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MessageCircle, MapPin, Phone, Mail, Calendar } from "lucide-react";
import { AIAssistant } from "../AIAssistant";

interface HomeSectionProps {
  name: string;
  role: string;
  personalInfo: any;
  portfolioData: any;
}

export const HomeSection = ({ name, role, personalInfo, portfolioData }: HomeSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full min-h-[500px] h-full flex flex-col justify-center items-center space-y-6 p-8">
      {/* User Information */}
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-foreground">{name}</h1>
        <p className="text-xl text-muted-foreground">{role}</p>
        
        {/* LinkedIn-style info with separators */}
        <div className="flex flex-wrap justify-center items-center gap-2 text-sm text-muted-foreground">
          {personalInfo?.location && (
            <>
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{personalInfo.location}</span>
              </div>
              <span>|</span>
            </>
          )}
          {personalInfo?.phone && (
            <>
              <div className="flex items-center gap-1">
                <Phone size={14} />
                <span>{personalInfo.phone}</span>
              </div>
              <span>|</span>
            </>
          )}
          {personalInfo?.email && (
            <>
              <div className="flex items-center gap-1">
                <Mail size={14} />
                <span>{personalInfo.email}</span>
              </div>
              <span>|</span>
            </>
          )}
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>Available for opportunities</span>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <Button 
        className="flex items-center gap-2" 
        size="lg"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle size={18} />
        Chat with {name}
      </Button>

      {/* Full Screen Chat Overlay */}
      {isOpen && (
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm rounded-2xl z-50 p-2">
          <div className="h-full w-full relative">
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute top-4 right-4 z-10"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </Button>
            <AIAssistant portfolioData={portfolioData} />
          </div>
        </div>
      )}
    </div>
  );
};