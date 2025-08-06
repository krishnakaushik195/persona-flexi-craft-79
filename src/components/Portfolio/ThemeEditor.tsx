import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Palette, RefreshCw, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const predefinedThemes = [
  {
    id: "classic",
    name: "Classic Green",
    gradient: "from-black via-gray-900 to-emerald-950",
    card: "bg-gray-900/40",
    secondary: "bg-emerald-500/20"
  },
  {
    id: "ocean",
    name: "Ocean Blue",
    gradient: "from-slate-900 via-blue-900 to-cyan-950",
    card: "bg-blue-900/40",
    secondary: "bg-blue-500/20"
  },
  {
    id: "sunset",
    name: "Sunset Orange",
    gradient: "from-amber-900 via-orange-900 to-red-950",
    card: "bg-orange-900/40",
    secondary: "bg-orange-500/20"
  },
  {
    id: "purple",
    name: "Purple Dream",
    gradient: "from-indigo-900 via-purple-900 to-pink-950",
    card: "bg-purple-900/40",
    secondary: "bg-purple-500/20"
  },
  {
    id: "forest",
    name: "Forest Green",
    gradient: "from-green-900 via-emerald-900 to-teal-950",
    card: "bg-green-900/40",
    secondary: "bg-green-500/20"
  },
  {
    id: "midnight",
    name: "Midnight Blue",
    gradient: "from-slate-950 via-blue-950 to-indigo-950",
    card: "bg-slate-900/40",
    secondary: "bg-slate-500/20"
  }
];

export const ThemeEditor = () => {
  const [selectedTheme, setSelectedTheme] = useState("classic");
  const { toast } = useToast();

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio_theme') || 'classic';
    setSelectedTheme(savedTheme);
  }, []);

  const applyTheme = (theme: any) => {
    setSelectedTheme(theme.id);
    localStorage.setItem('portfolio_theme', theme.id);
    localStorage.setItem('portfolio_theme_data', JSON.stringify(theme));
    
    // Trigger a custom event to update the portfolio background
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: theme }));
    
    toast({
      title: "Theme Applied",
      description: `${theme.name} theme has been applied successfully.`,
    });
  };

  const resetToDefault = () => {
    const defaultTheme = predefinedThemes[0];
    applyTheme(defaultTheme);
  };

  return (
    <Card className="bg-portfolio-card border-secondary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 bg-primary/20 rounded-xl">
            <Palette size={20} className="text-primary" />
          </div>
          Theme Customization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Choose a Theme</h3>
          <div className="grid grid-cols-2 gap-3">
            {predefinedThemes.map((theme) => (
              <div
                key={theme.id}
                className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                  selectedTheme === theme.id 
                    ? 'border-primary ring-2 ring-primary/20' 
                    : 'border-secondary/30 hover:border-secondary/60'
                }`}
                onClick={() => applyTheme(theme)}
              >
                <div className={`h-16 bg-gradient-to-br ${theme.gradient} relative`}>
                  <div className={`absolute inset-2 ${theme.card} rounded border border-white/10`}>
                    <div className={`absolute top-1 left-1 right-1 h-1 ${theme.secondary} rounded`}></div>
                    <div className={`absolute bottom-1 left-1 w-8 h-1 ${theme.secondary} rounded`}></div>
                  </div>
                </div>
                <div className="p-2 bg-background">
                  <p className="text-xs font-medium text-center">{theme.name}</p>
                </div>
                {selectedTheme === theme.id && (
                  <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-1">
                    <Save size={8} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-secondary/30">
          <Button
            onClick={resetToDefault}
            variant="outline"
            size="sm"
            className="w-full flex items-center gap-2"
          >
            <RefreshCw size={14} />
            Reset to Default
          </Button>
        </div>

        <div className="bg-secondary/30 rounded-lg p-3">
          <p className="text-xs text-muted-foreground">
            Themes change the background gradients and card colors across all templates. 
            Your selected theme will be saved and applied automatically.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};