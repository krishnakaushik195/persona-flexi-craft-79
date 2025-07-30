import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Sparkles, Upload, Users, Eye, Zap } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate("/upload");
    } else {
      navigate("/login");
    }
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <Bot className="h-8 w-8 text-purple-400" />
          <span className="text-2xl font-bold text-white">Portfolio Builder</span>
          <span className="text-sm text-purple-300">Transform Your Resume</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
          <Button onClick={handleSignIn} variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Sparkles className="h-6 w-6 text-purple-400" />
            <span className="text-purple-300 font-medium">Resume to Portfolio Transformation</span>
            <Sparkles className="h-6 w-6 text-purple-400" />
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Transform Your Resume Into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              A Professional Portfolio
            </span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            Upload your resume and watch it transform into a stunning, interactive portfolio. 
            Complete with an AI assistant that knows your background and can chat with visitors about your skills.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-6">
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
            >
              <Upload className="h-5 w-5 mr-2" />
              Get Started Free
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 text-lg"
            >
              <Eye className="h-5 w-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
            <div>
              <div className="text-4xl font-bold text-white">10K+</div>
              <div className="text-gray-300">Portfolios Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white">99%</div>
              <div className="text-gray-300">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white">24/7</div>
              <div className="text-gray-300">AI Assistant</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Why Choose Our Portfolio Builder?
            </h2>
            <p className="mt-4 text-gray-300">
              Everything you need to transform your resume into a portfolio that stands out
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Smart Parsing</h3>
                <p className="text-gray-300">
                  Our AI instantly extracts and organizes your resume data into beautiful portfolio sections
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Beautiful Design</h3>
                <p className="text-gray-300">
                  Professional templates that adapt to your content and personal brand
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Bot className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">AI Assistant</h3>
                <p className="text-gray-300">
                  24/7 intelligent chatbot that answers questions about your background and skills
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-800/50 to-pink-800/50">
        <div className="mx-auto max-w-4xl text-center px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
            Ready to Build Your Perfect Portfolio?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Join thousands of professionals who've transformed their careers with AI-powered portfolios
          </p>
          <Button 
            onClick={handleGetStarted}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-4 text-xl"
          >
            <Upload className="h-6 w-6 mr-2" />
            Start Building Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;