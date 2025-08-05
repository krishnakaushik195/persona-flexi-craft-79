import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Layout, Palette, Sparkles } from "lucide-react";

interface TemplateSelectorProps {
  currentTemplate: string;
  onTemplateChange: (template: string) => void;
}

const templates = [
  {
    id: "classic",
    name: "Classic",
    description: "Traditional portfolio layout with sidebar",
    icon: Layout,
    preview: "bg-gradient-to-br from-black via-gray-900 to-emerald-950"
  },
  {
    id: "modern",
    name: "Modern",
    description: "Minimal and clean design with cards",
    icon: Sparkles,
    preview: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold and artistic portfolio design",
    icon: Palette,
    preview: "bg-gradient-to-br from-orange-900 via-red-900 to-pink-900"
  }
];

export const TemplateSelector = ({ currentTemplate, onTemplateChange }: TemplateSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Layout size={16} />
        Template
      </Button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 z-50 w-80 bg-card border rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Choose Template</h3>
          <div className="space-y-3">
            {templates.map((template) => {
              const Icon = template.icon;
              return (
                <Card
                  key={template.id}
                  className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                    currentTemplate === template.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => {
                    onTemplateChange(template.id);
                    setIsOpen(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-8 rounded ${template.preview} flex items-center justify-center`}>
                      <Icon size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};