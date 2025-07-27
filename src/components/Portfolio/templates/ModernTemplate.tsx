import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, ExternalLink } from "lucide-react";
import { PortfolioData } from "@/types/portfolio";

interface ModernTemplateProps {
  data: PortfolioData;
}

export const ModernTemplate = ({ data }: ModernTemplateProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                {data.personal_info?.name}
              </h1>
              <p className="text-2xl lg:text-3xl font-medium text-muted-foreground mb-4">
                {data.personal_info?.role}
              </p>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                {data.personal_info?.tagline}
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {data.personal_info?.email && (
                  <Button variant="outline" size="lg" className="gap-2">
                    <Mail className="h-4 w-4" />
                    Contact Me
                  </Button>
                )}
                {data.personal_info?.linkedin && (
                  <Button size="lg" className="gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Button>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-4">
                <Avatar className="w-full h-full">
                  <AvatarImage src={data.personal_info?.photo_url || "/placeholder.svg"} />
                  <AvatarFallback className="text-4xl">
                    {data.personal_info?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.skills?.map((skill, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold">{skill.name}</span>
                  <Badge variant="secondary">{skill.level}%</Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-primary/60 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects?.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all group">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <img 
                    src={project.image || "/placeholder.svg"} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                  {project.link && (
                    <Button className="w-full gap-2">
                      <ExternalLink className="h-4 w-4" />
                      View Project
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Experience</h2>
          <div className="space-y-8">
            {data.experience?.map((exp, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold">{exp.position}</h3>
                    <p className="text-xl text-primary font-medium">{exp.company}</p>
                  </div>
                  <Badge variant="secondary" className="text-sm mt-2 md:mt-0">
                    {exp.duration}
                  </Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Let's Connect</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Ready to bring your next project to life? Let's talk!
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {data.personal_info?.email && (
              <Button size="lg" className="gap-2">
                <Mail className="h-5 w-5" />
                {data.personal_info.email}
              </Button>
            )}
            {data.personal_info?.phone && (
              <Button variant="outline" size="lg" className="gap-2">
                <Phone className="h-5 w-5" />
                {data.personal_info.phone}
              </Button>
            )}
            {data.personal_info?.linkedin && (
              <Button variant="outline" size="lg" className="gap-2">
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </Button>
            )}
            {data.personal_info?.github && (
              <Button variant="outline" size="lg" className="gap-2">
                <Github className="h-5 w-5" />
                GitHub
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};