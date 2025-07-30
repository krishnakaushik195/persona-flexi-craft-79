import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Key, Settings } from "lucide-react";
import { PortfolioData } from "@/hooks/usePortfolioData";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  portfolioData?: PortfolioData;
}

export const AIAssistant = ({ portfolioData }: AIAssistantProps) => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const saveApiKey = async (key: string) => {
    if (!key.trim()) return;
    
    setIsLoading(true);
    try {
      // Test the API key first
      await testGeminiAPI(key);
      
      // If test succeeds, save the key
      localStorage.setItem('gemini_api_key', key);
      setApiKey(key);
      setShowSettings(false);
      
      // Add a success message
      const successMessage: Message = {
        role: 'assistant',
        content: 'API key configured successfully! You can now ask me anything about the portfolio.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, successMessage]);
    } catch (error) {
      // Show error message if API test fails
      const errorMessage: Message = {
        role: 'assistant',
        content: `Failed to configure API key: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

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
        // Handle different error types
        if (response.status === 503) {
          throw new Error('Gemini service is currently overloaded. Please try again in a few minutes.');
        } else if (response.status === 401 || response.status === 403) {
          throw new Error('Invalid API key. Please check your Gemini API key.');
        } else {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Invalid API key or network error');
    }
  };

  const callGeminiAPI = async (userMessage: string) => {
    if (!apiKey) {
      throw new Error('Gemini API key not configured');
    }

    const contextPrompt = `You are an AI assistant helping visitors learn about this person's portfolio. Here is their complete portfolio data:

${JSON.stringify(portfolioData, null, 2)}

Based on this information, please answer questions about their background, skills, experience, projects, education, and achievements. Be conversational and helpful. If asked about something not in the data, politely mention that you don't have that specific information.

User question: ${userMessage}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: contextPrompt
          }]
        }]
      })
    });

    if (!response.ok) {
      if (response.status === 503) {
        throw new Error('Gemini service is currently overloaded. Please try again in a few minutes.');
      }
      throw new Error('Failed to get response from Gemini');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    if (!apiKey) {
      setShowSettings(true);
      return;
    }

    const userMessage: Message = {
      role: 'user',
      content: question,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setQuestion("");
    setIsLoading(true);

    try {
      const response = await callGeminiAPI(question);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-portfolio-card rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/20 rounded-xl">
            <Bot size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">AI Assistant</h3>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setShowSettings(!showSettings)}
          className="rounded-xl"
        >
          <Settings size={16} />
        </Button>
      </div>

      {showSettings && (
        <div className="bg-secondary/30 rounded-xl p-4 space-y-3">
          <div className="flex items-center space-x-2">
            <Key size={16} className="text-primary" />
            <span className="text-sm font-medium">Gemini API Key</span>
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter your Gemini API key..."
              className="bg-background"
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  await saveApiKey((e.target as HTMLInputElement).value);
                }
              }}
              disabled={isLoading}
            />
            <div className="flex space-x-2">
              <Button
                onClick={async (e) => {
                  const input = e.currentTarget.parentElement?.previousElementSibling as HTMLInputElement;
                  await saveApiKey(input.value);
                }}
                size="sm"
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? 'Testing...' : 'Save'}
              </Button>
              {apiKey && (
                <Button
                  onClick={() => {
                    localStorage.removeItem('gemini_api_key');
                    setApiKey('');
                    setMessages([]);
                    setShowSettings(false);
                  }}
                  variant="destructive"
                  size="sm"
                  className="flex-1"
                >
                  Clear API Key
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
        </div>
      )}
      
      {!apiKey && !showSettings && (
        <div className="bg-secondary/30 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="p-1 bg-primary/20 rounded-lg">
              <Bot size={14} className="text-primary" />
            </div>
            <p className="text-sm text-portfolio-text-muted">
              Hi! I'm your AI assistant. Please configure your Gemini API key to start chatting!
            </p>
          </div>
        </div>
      )}

      {apiKey && messages.length === 0 && (
        <div className="bg-secondary/30 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="p-1 bg-primary/20 rounded-lg">
              <Bot size={14} className="text-primary" />
            </div>
            <p className="text-sm text-portfolio-text-muted">
              Hi! I'm your AI assistant. Ask me anything about {portfolioData?.personal_info?.name || "this person"}'s background, skills, or experience!
            </p>
          </div>
        </div>
      )}

      {messages.length > 0 && (
        <ScrollArea className="h-64 bg-secondary/30 rounded-xl p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="p-1 bg-primary/20 rounded-lg">
                  {message.role === 'user' ? (
                    <User size={14} className="text-primary" />
                  ) : (
                    <Bot size={14} className="text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-primary/20 rounded-lg">
                  <Bot size={14} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    Thinking...
                  </p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      )}

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={apiKey ? "Ask about this portfolio..." : "Configure API key first"}
          className="flex-1 bg-secondary/50 border-secondary text-foreground placeholder:text-portfolio-text-muted rounded-xl"
          disabled={isLoading || !apiKey}
        />
        <Button 
          type="submit" 
          size="icon"
          variant="portfolio"
          disabled={isLoading || !question.trim() || !apiKey}
          className="rounded-xl"
        >
          <Send size={16} />
        </Button>
      </form>
    </div>
  );
};