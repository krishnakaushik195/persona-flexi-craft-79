import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Linkedin, Github, ExternalLink, Star, Zap, Sparkles } from "lucide-react";
import { PortfolioData } from "@/types/portfolio";

interface CreativeTemplateProps {
  data: PortfolioData;
}

export const CreativeTemplate = ({ data }: CreativeTemplateProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-blue-950/20">
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="relative inline-block mb-8">
              <Avatar className="w-48 h-48 mx-auto border-4 border-white shadow-2xl">
                <AvatarImage src={data.personal_info?.photo_url || "/placeholder.svg"} />
                <AvatarFallback className="text-4xl bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                  {data.personal_info?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -top-4 -right-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce">
                  <Star className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
              {data.personal_info?.name}
            </h1>
            
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span className="text-xl font-semibold">{data.personal_info?.role}</span>
            </div>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {data.personal_info?.tagline}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg gap-2">
                <Sparkles className="h-5 w-5" />
                Let's Collaborate
              </Button>
              <Button variant="outline" size="lg" className="gap-2 backdrop-blur-sm">
                <ExternalLink className="h-5 w-5" />
                View Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Showcase */}
      <section className="py-16 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Skills & Magic
            </h2>
            <p className="text-xl text-muted-foreground">The tools that bring ideas to life</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.skills?.map((skill, index) => (
              <Card key={index} className="p-6 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-2 border-transparent hover:border-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-lg">{skill.name}</span>
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {skill.level}%
                  </Badge>
                </div>
                <div className="relative">
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full transition-all duration-1000 ease-out animate-pulse"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <div className="absolute -top-1 right-0 w-4 h-4 bg-yellow-400 rounded-full animate-bounce" 
                       style={{ left: `${Math.max(0, skill.level - 5)}%` }} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Projects */}
      <section className="py-16 px-6 bg-white/30 dark:bg-black/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Creative Projects
            </h2>
            <p className="text-xl text-muted-foreground">Where imagination meets innovation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects?.map((project, index) => (
              <Card key={index} className="group overflow-hidden bg-white/90 dark:bg-black/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1">
                <div className="relative overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 relative">
                    <img 
                      src={project.image || "/placeholder.svg"} 
                      alt={project.title}
                      className="w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <ExternalLink className="h-4 w-4 text-purple-600" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 border-purple-300">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {project.link && (
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white gap-2">
                      <Sparkles className="h-4 w-4" />
                      Explore Magic
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Journey & Experience
            </h2>
            <p className="text-xl text-muted-foreground">The path to excellence</p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-400 via-pink-400 to-blue-400 rounded-full"></div>
            
            <div className="space-y-12">
              {data.experience?.map((exp, index) => (
                <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="flex-1">
                    <Card className="p-6 bg-white/90 dark:bg-black/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-purple-600">{exp.position}</h3>
                          <p className="text-lg font-semibold text-muted-foreground">{exp.company}</p>
                        </div>
                        <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                          {exp.duration}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                    </Card>
                  </div>
                  
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6">Ready to Create Magic?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's turn your wildest ideas into stunning reality!
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            {data.personal_info?.email && (
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 gap-2 shadow-lg">
                <Mail className="h-5 w-5" />
                Start the Conversation
              </Button>
            )}
            {data.personal_info?.linkedin && (
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600 gap-2">
                <Linkedin className="h-5 w-5" />
                Connect
              </Button>
            )}
            {data.personal_info?.github && (
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600 gap-2">
                <Github className="h-5 w-5" />
                Follow Journey
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};