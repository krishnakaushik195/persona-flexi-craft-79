import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Bot, 
  Sparkles, 
  Upload, 
  Eye, 
  Zap, 
  FileText, 
  Palette, 
  MessageCircle,
  ArrowRight,
  Check,
  Star
} from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bot className="h-10 w-10 text-emerald-600" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-ping"></div>
          </div>
          <div>
            <span className="text-2xl font-bold text-gray-800">ResumeFlow</span>
            <div className="text-xs text-emerald-600 -mt-1">Transform • Build • Shine</div>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Button 
            onClick={handleSignIn} 
            variant="ghost" 
            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100"
          >
            Sign In
          </Button>
          <Button 
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 text-white border-0"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 px-6 py-20 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-left">
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-emerald-600 text-sm font-medium">Loved by 10,000+ professionals</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
                Your Resume
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500">
                  Deserves Better
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transform your static resume into a living, breathing portfolio that tells your story. 
                Complete with an AI assistant that never sleeps.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  onClick={handleGetStarted}
                  size="lg"
                  className="bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 text-white px-8 py-4 text-lg group"
                >
                  <Upload className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Upload & Transform
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-emerald-500/50 text-emerald-600 hover:bg-emerald-100 px-8 py-4 text-lg"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  See Examples
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>No coding required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>Ready in minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>AI-powered</span>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl p-8 backdrop-blur-sm border border-emerald-500/20">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl">
                    <FileText className="h-8 w-8 text-emerald-400" />
                    <div>
                      <div className="text-white font-medium">Resume.pdf</div>
                      <div className="text-gray-400 text-sm">Uploaded & Processing...</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center py-4">
                    <ArrowRight className="h-8 w-8 text-emerald-400 animate-pulse" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-lg border border-emerald-500/20">
                      <Palette className="h-6 w-6 text-emerald-400 mb-2" />
                      <div className="text-white text-sm font-medium">Beautiful Design</div>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-lg border border-emerald-500/20">
                      <MessageCircle className="h-6 w-6 text-emerald-400 mb-2" />
                      <div className="text-white text-sm font-medium">AI Assistant</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <section className="relative z-10 py-20 border-t border-emerald-500/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              From Resume to Portfolio in 
              <span className="text-emerald-400"> 3 Simple Steps</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Upload, title: "Upload", desc: "Drop your resume and watch the magic happen", step: "01" },
              { icon: Zap, title: "Transform", desc: "AI extracts and organizes your information", step: "02" },
              { icon: Sparkles, title: "Launch", desc: "Share your stunning portfolio with the world", step: "03" }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="p-8 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 group-hover:scale-105">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {item.step}
                  </div>
                  <item.icon className="h-12 w-12 text-emerald-400 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-white mb-3 text-center">{item.title}</h3>
                  <p className="text-gray-300 text-center">{item.desc}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-emerald-400/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24">
        <div className="mx-auto max-w-4xl text-center px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl p-12 border border-emerald-500/20 backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Stand Out?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands who've transformed their careers with professional portfolios
            </p>
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-12 py-6 text-xl group"
            >
              <Upload className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
              Transform Your Resume Now
            </Button>
            <div className="mt-4 text-sm text-gray-400">
              No credit card required • Free to start
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;