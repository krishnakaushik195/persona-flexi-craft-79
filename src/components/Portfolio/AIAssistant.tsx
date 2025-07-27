import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot } from "lucide-react";

export const AIAssistant = () => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setIsLoading(true);
    // Simulate AI response
    setTimeout(() => {
      setIsLoading(false);
      setQuestion("");
    }, 1000);
  };

  return (
    <div className="bg-portfolio-card rounded-2xl p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/20 rounded-xl">
          <Bot size={20} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">AI Assistant</h3>
      </div>
      
      <div className="bg-secondary/30 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <div className="p-1 bg-primary/20 rounded-lg">
            <Bot size={14} className="text-primary" />
          </div>
          <p className="text-sm text-portfolio-text-muted">
            Hi! I'm your AI assistant. Ask me anything about Krishna's background, skills, or experience!
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about Krishna's experience, skills, projects..."
          className="flex-1 bg-secondary/50 border-secondary text-foreground placeholder:text-portfolio-text-muted rounded-xl"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          size="icon"
          variant="portfolio"
          disabled={isLoading || !question.trim()}
          className="rounded-xl"
        >
          <Send size={16} />
        </Button>
      </form>
    </div>
  );
};