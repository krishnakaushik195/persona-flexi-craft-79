import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="space-y-8">
        <h2 className="text-5xl font-bold text-foreground text-center">Projects</h2>
        <div className="bg-portfolio-card rounded-2xl p-8 text-center">
          <p className="text-portfolio-text-muted text-lg">No projects available yet.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      <h2 className="text-5xl font-bold text-foreground text-center">Projects</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-portfolio-card rounded-2xl p-6 space-y-4">
            <div className="aspect-video bg-secondary/30 rounded-xl overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
              <p className="text-portfolio-text-muted">{project.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-3 pt-2">
                <Button variant="portfolio" size="sm" asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <Github size={14} />
                    View Code
                  </a>
                </Button>
                <Button variant="portfolio-outline" size="sm" asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};