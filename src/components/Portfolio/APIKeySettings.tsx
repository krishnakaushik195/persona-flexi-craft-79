import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Key, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const APIKeySettings = () => {
  const [apiKey, setApiKey] = useState("");
  const [tempKey, setTempKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setTempKey(savedApiKey);
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
        throw new Error('API key validation failed');
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      throw new Error('Invalid API key or network error');
    }
  };

  const saveApiKey = async () => {
    if (!tempKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter an API key",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      // Test the API key first
      await testGeminiAPI(tempKey);
      
      // If test succeeds, save the key
      localStorage.setItem('gemini_api_key', tempKey);
      setApiKey(tempKey);
      
      toast({
        title: "Success",
        description: "API key configured successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to configure API key: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setTempKey('');
    
    toast({
      title: "Success",
      description: "API key cleared successfully",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Key size={20} className="text-primary" />
          <h3 className="text-lg font-semibold">AI Assistant Configuration</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Gemini API Key</label>
          <Input
            type="password"
            placeholder="Enter your Gemini API key..."
            value={tempKey}
            onChange={(e) => setTempKey(e.target.value)}
            className="bg-background"
            disabled={isLoading}
          />
        </div>
        
        <div className="flex space-x-2">
          <Button
            onClick={saveApiKey}
            disabled={isLoading || !tempKey.trim()}
            className="flex-1"
          >
            {isLoading ? 'Testing...' : 'Save & Test'}
          </Button>
          {apiKey && (
            <Button
              onClick={clearApiKey}
              variant="destructive"
              className="flex-1"
            >
              Clear API Key
            </Button>
          )}
        </div>
        
        {apiKey && (
          <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
            ✓ API key is configured and working
          </div>
        )}
        
        <div className="text-xs text-muted-foreground">
          <p className="mb-2">
            Get your free API key from Google AI Studio:
          </p>
          <a 
            href="https://makersuite.google.com/app/apikey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center gap-1"
          >
            Google AI Studio <ExternalLink size={12} />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};