import { Button } from "@/components/ui/button";
import { 
  Home, 
  User, 
  Briefcase, 
  Zap, 
  Award, 
  GraduationCap,
  Building2, 
  Mail 
} from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "experience", label: "Experience", icon: Building2 },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Zap },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <nav className="flex flex-wrap gap-2 justify-center items-center px-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        
        return (
          <Button
            key={item.id}
            variant={isActive ? "portfolio" : "portfolio-outline"}
            onClick={() => onSectionChange(item.id)}
            size="sm"
            className="flex items-center justify-center gap-1.5 px-3 py-2 min-w-fit"
          >
            <Icon size={14} />
            <span className="hidden sm:inline text-xs whitespace-nowrap">{item.label}</span>
          </Button>
        );
      })}
    </nav>
  );
};