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
  },
  {
    id: "hero",
    name: "Hero",
    description: "Fullscreen hero layout with horizontal nav",
    icon: Layout,
    preview: "bg-gradient-to-br from-blue-50 via-white to-yellow-100"
  }
];

export const TemplateSelector = ({ currentTemplate, onTemplateChange }: TemplateSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedTemplate = templates.find(t => t.id === currentTemplate);

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="flex items-center gap-2 bg-card/50 backdrop-blur-sm"
      >
        <Layout size={16} />
        <span className="hidden sm:inline">Template:</span>
        <span className="font-medium text-primary">{selectedTemplate?.name || 'Classic'}</span>
      </Button>
      
      {isOpen && (
        <>
          {/* Backdrop to close on click outside */}
          <div 
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Template Selection Popup */}
          <div className="absolute top-full mt-2 right-0 z-50 w-96 max-w-[90vw] bg-card/95 backdrop-blur-md border border-border/50 rounded-xl shadow-2xl p-6 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2 mb-6">
              <Layout size={20} className="text-primary" />
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Choose Your Template
              </h3>
            </div>
            
            <div className="space-y-3">
              {templates.map((template) => {
                const Icon = template.icon;
                const isSelected = currentTemplate === template.id;
                
                return (
                  <Card
                    key={template.id}
                    className={`group relative p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${
                      isSelected 
                        ? 'ring-2 ring-primary bg-primary/5 shadow-md' 
                        : 'hover:bg-accent/50'
                    }`}
                    onClick={() => {
                      onTemplateChange(template.id);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-10 rounded-lg ${template.preview} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-200`}>
                        <Icon size={18} className="text-white drop-shadow-sm" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground">{template.name}</h4>
                          {isSelected && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              Selected
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
            
            <div className="mt-6 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground text-center">
                Changes apply instantly • Works with all uploads
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};