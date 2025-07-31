import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Key, Bot, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AISettings = () => {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputKey, setInputKey] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const testGeminiAPI = async (key: string) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "Hi, just testing the API connection. Please respond with a simple greeting."
            }]
          }]
        })
      });

      if (!response.ok) {
        if (response.status === 503) {
          throw new Error('Gemini service is currently overloaded. Please try again in a few minutes.');
        } else if (response.status === 401 || response.status === 403) {
          throw new Error('Invalid API key. Please check your Gemini API key.');
        } else if (response.status === 400) {
          throw new Error('Bad request. Please check your API key format.');
        } else {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts) {
        throw new Error('Unexpected API response format');
      }
      
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      throw error;
    }
  };

  const saveApiKey = async () => {
    if (!inputKey.trim()) return;
    
    setIsLoading(true);
    try {
      await testGeminiAPI(inputKey);
      
      localStorage.setItem('gemini_api_key', inputKey);
      setApiKey(inputKey);
      setInputKey("");
      
      toast({
        title: "API Key Configured",
        description: "Gemini API key has been successfully configured and tested.",
      });
    } catch (error) {
      toast({
        title: "API Key Error",
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setInputKey('');
    
    toast({
      title: "API Key Cleared",
      description: "Gemini API key has been removed.",
    });
  };

  return (
    <Card className="bg-portfolio-card border-secondary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 bg-primary/20 rounded-xl">
            <Bot size={20} className="text-primary" />
          </div>
          AI Assistant Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Key size={16} className="text-primary" />
            <span className="text-sm font-medium">Gemini API Key</span>
            {apiKey && (
              <div className="flex items-center space-x-1 text-xs text-green-600">
                <Check size={12} />
                <span>Configured</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter your Gemini API key..."
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="bg-background/50"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  saveApiKey();
                }
              }}
              disabled={isLoading}
            />
            <div className="flex space-x-2">
              <Button
                onClick={saveApiKey}
                size="sm"
                disabled={isLoading || !inputKey.trim()}
                className="flex-1"
              >
                {isLoading ? 'Testing...' : 'Save & Test'}
              </Button>
              {apiKey && (
                <Button
                  onClick={clearApiKey}
                  variant="destructive"
                  size="sm"
                  className="flex-1"
                >
                  <X size={14} className="mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Get your API key from{" "}
            <a 
              href="https://makersuite.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google AI Studio
            </a>
          </p>
          
          <div className="bg-secondary/30 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">
              Configure the AI Assistant to answer questions about your portfolio. 
              The API key will be saved for visitors to interact with your portfolio.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};