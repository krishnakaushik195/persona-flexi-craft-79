import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MessageCircle } from "lucide-react";
import { AIAssistant } from "../AIAssistant";
import { PortfolioData } from "@/hooks/usePortfolioData";

interface HomeSectionProps {
  name: string;
  role: string;
  portfolioData?: PortfolioData;
}

export const HomeSection = ({ name, role, portfolioData }: HomeSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Get additional info from portfolio data
  const personalInfo = portfolioData?.personal_info;
  const location = personalInfo?.location;
  const tagline = personalInfo?.tagline;
  const yearsExperience = portfolioData?.experience?.[0]?.duration;

  return (
    <div className="w-full space-y-8">
      {/* User Information Section */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">{name}</h1>
          <p className="text-xl text-muted-foreground">{role}</p>
        </div>
        
        {/* LinkedIn-style separator info */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground flex-wrap">
          {tagline && (
            <>
              <span>{tagline}</span>
              <span>•</span>
            </>
          )}
          {location && (
            <>
              <span>{location}</span>
              <span>•</span>
            </>
          )}
          {yearsExperience && (
            <span>{yearsExperience} experience</span>
          )}
        </div>
      </div>

      {/* Chat Button */}
      <div className="flex justify-center">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="portfolio"
              size="lg"
              className="flex items-center gap-2"
            >
              <MessageCircle size={20} />
              Chat with {name.split(' ')[0]}
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-96 h-96 p-0" 
            align="center"
            side="top"
          >
            <AIAssistant portfolioData={portfolioData} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};