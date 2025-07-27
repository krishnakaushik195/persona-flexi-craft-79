import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Palette, Sparkles, Minimize } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (template: string) => void;
}

const templates = [
  {
    id: "modern",
    name: "Modern Pro",
    description: "Clean, professional design with gradient accents",
    icon: Palette,
    preview: "/placeholder.svg",
    color: "from-blue-500 to-purple-500",
    features: ["Gradient hero", "Skill bars", "Project cards"]
  },
  {
    id: "minimal",
    name: "Minimal Clean",
    description: "Simple, elegant layout focusing on content",
    icon: Minimize,
    preview: "/placeholder.svg", 
    color: "from-gray-500 to-slate-500",
    features: ["Clean typography", "Timeline view", "Subtle animations"]
  },
  {
    id: "creative",
    name: "Creative Funk",
    description: "Bold, colorful design with creative animations",
    icon: Sparkles,
    preview: "/placeholder.svg",
    color: "from-pink-500 to-yellow-500",
    features: ["Animated elements", "Creative layouts", "Bold colors"]
  }
];

export const TemplateSelector = ({ selectedTemplate, onTemplateSelect }: TemplateSelectorProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Choose Your Style</h2>
        <p className="text-muted-foreground">Select a template that matches your personality</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => {
          const IconComponent = template.icon;
          return (
            <Card 
              key={template.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                selectedTemplate === template.id 
                  ? 'ring-2 ring-primary shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => onTemplateSelect(template.id)}
            >
              <CardContent className="p-6">
                <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted/20 rounded-lg mb-4 relative overflow-hidden group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IconComponent className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                  <div className="absolute top-2 right-2">
                    {selectedTemplate === template.id && (
                      <Badge className="bg-primary">Selected</Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{template.name}</h3>
                    <IconComponent className="h-5 w-5 text-muted-foreground" />
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {template.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    className="w-full gap-2"
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                  >
                    <Eye className="h-4 w-4" />
                    {selectedTemplate === template.id ? "Selected" : "Preview"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Don't worry - you can change your template anytime after upload!
        </p>
      </div>
    </div>
  );
};