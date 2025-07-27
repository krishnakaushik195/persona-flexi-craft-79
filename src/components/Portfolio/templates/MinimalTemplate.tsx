import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Calendar, MapPin as Location } from "lucide-react";
import { PortfolioData } from "@/types/portfolio";

interface MinimalTemplateProps {
  data: PortfolioData;
}

export const MinimalTemplate = ({ data }: MinimalTemplateProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Avatar className="w-32 h-32">
              <AvatarImage src={data.personal_info?.photo_url || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">
                {data.personal_info?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-light mb-2">{data.personal_info?.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">{data.personal_info?.role}</p>
              <p className="text-muted-foreground max-w-2xl">{data.personal_info?.tagline}</p>
              <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
                {data.personal_info?.email && (
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Mail className="h-4 w-4" />
                    {data.personal_info.email}
                  </Button>
                )}
                {data.personal_info?.location && (
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Location className="h-4 w-4" />
                    {data.personal_info.location}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* About */}
        {data.about && (
          <section className="mb-16">
            <h2 className="text-2xl font-light mb-6 pb-2 border-b border-border/40">About</h2>
            <p className="text-muted-foreground leading-relaxed">{data.about}</p>
          </section>
        )}

        {/* Experience */}
        <section className="mb-16">
          <h2 className="text-2xl font-light mb-6 pb-2 border-b border-border/40">Experience</h2>
          <div className="space-y-8">
            {data.experience?.map((exp, index) => (
              <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary before:rounded-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-medium">{exp.position}</h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                  </div>
                  <span className="text-sm text-muted-foreground mt-1 md:mt-0">{exp.duration}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-16">
          <h2 className="text-2xl font-light mb-6 pb-2 border-b border-border/40">Projects</h2>
          <div className="grid gap-6">
            {data.projects?.map((project, index) => (
              <Card key={index} className="border-border/40 hover:border-border transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-32 md:h-24 bg-muted rounded flex-shrink-0">
                      <img 
                        src={project.image || "/placeholder.svg"} 
                        alt={project.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-medium">{project.title}</h3>
                        {project.link && (
                          <Button variant="ghost" size="sm" className="gap-2 -mt-2">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies?.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-16">
          <h2 className="text-2xl font-light mb-6 pb-2 border-b border-border/40">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.skills?.reduce((acc: any[], skill, index) => {
              const categoryIndex = acc.findIndex(cat => cat.category === skill.category);
              if (categoryIndex === -1) {
                acc.push({ category: skill.category, skills: [skill] });
              } else {
                acc[categoryIndex].skills.push(skill);
              }
              return acc;
            }, []).map((category, index) => (
              <div key={index}>
                <h3 className="font-medium mb-3 text-muted-foreground">{category.category}</h3>
                <div className="space-y-3">
                  {category.skills.map((skill: any, skillIndex: number) => (
                    <div key={skillIndex} className="flex justify-between items-center">
                      <span className="text-sm">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-700"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-8">{skill.level}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-light mb-6 pb-2 border-b border-border/40">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{edu.degree}</h3>
                    <p className="text-muted-foreground text-sm">{edu.institution}</p>
                    {edu.location && <p className="text-muted-foreground text-xs">{edu.location}</p>}
                  </div>
                  <span className="text-sm text-muted-foreground">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-light mb-6 pb-2 border-b border-border/40">Contact</h2>
          <div className="flex flex-wrap gap-4">
            {data.personal_info?.email && (
              <Button variant="outline" className="gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Button>
            )}
            {data.personal_info?.linkedin && (
              <Button variant="outline" className="gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
            )}
            {data.personal_info?.github && (
              <Button variant="outline" className="gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};