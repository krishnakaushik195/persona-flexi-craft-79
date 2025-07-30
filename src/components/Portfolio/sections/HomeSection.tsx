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
    <div className="w-full h-full flex flex-col justify-center items-center space-y-6 p-8">
      {/* User Information */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">{name}</h1>
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
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button className="flex items-center gap-2" size="lg">
            <MessageCircle size={18} />
            Chat with {name}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[800px] h-[500px] p-0" 
          side="bottom"
          align="center"
          sideOffset={10}
          collisionPadding={20}
        >
          <div className="h-full">
            <AIAssistant portfolioData={portfolioData} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};