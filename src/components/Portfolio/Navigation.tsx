import { Button } from "@/components/ui/button";
import { 
  Home, 
  User, 
  Briefcase, 
  Zap, 
  Award, 
  GraduationCap,
  Building2, 
  Mail,
  Bot 
} from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isEditMode?: boolean;
  variant?: "default" | "pills" | "creative";
}

export const Navigation = ({ activeSection, onSectionChange, isEditMode, variant = "default" }: NavigationProps) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "experience", label: "Experience", icon: Building2 },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Zap },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "contact", label: "Contact", icon: Mail },
    ...(isEditMode ? [{ id: "ai-settings", label: "AI Settings", icon: Bot }] : []),
  ];

  const getNavigationClasses = () => {
    switch (variant) {
      case "pills":
        return "flex space-x-1 bg-purple-900/30 rounded-full p-1";
      case "creative":
        return "flex space-x-1";
      default:
        return "flex flex-wrap gap-2 justify-center items-center px-4";
    }
  };

  const getButtonClasses = (isActive: boolean) => {
    switch (variant) {
      case "pills":
        return `flex items-center space-x-2 transition-all duration-200 rounded-full px-4 py-2 ${
          isActive 
            ? "bg-purple-600 text-white" 
            : "text-purple-200 hover:bg-purple-800/50"
        }`;
      case "creative":
        return `flex items-center space-x-2 transition-all duration-200 rounded-full px-4 py-2 ${
          isActive 
            ? "bg-orange-500/80 text-white" 
            : "text-orange-200 hover:bg-orange-600/30"
        }`;
      default:
        return "flex items-center justify-center gap-1.5 px-3 py-2 min-w-fit";
    }
  };

  return (
    <nav className={getNavigationClasses()}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        
        return (
          variant === "pills" || variant === "creative" ? (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={getButtonClasses(isActive)}
            >
              <Icon size={14} />
              <span className="hidden sm:inline text-xs whitespace-nowrap">{item.label}</span>
            </button>
          ) : (
            <Button
              key={item.id}
              variant={isActive ? "portfolio" : "portfolio-outline"}
              onClick={() => onSectionChange(item.id)}
              size="sm"
              className={getButtonClasses(isActive)}
            >
              <Icon size={14} />
              <span className="hidden sm:inline text-xs whitespace-nowrap">{item.label}</span>
            </Button>
          )
        );
      })}
    </nav>
  );
};