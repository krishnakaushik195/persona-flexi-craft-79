import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image: string;
}

interface EditableProjectsSectionProps {
  projects: Project[];
  onSave: (data: Project[]) => void;
}

export const EditableProjectsSection = ({ projects, onSave }: EditableProjectsSectionProps) => {
  const [editedProjects, setEditedProjects] = useState([...projects]);

  const addProject = () => {
    setEditedProjects([...editedProjects, {
      title: "",
      description: "",
      technologies: [],
      link: "",
      image: "/placeholder.svg"
    }]);
  };

  const removeProject = (index: number) => {
    setEditedProjects(editedProjects.filter((_, i) => i !== index));
  };

  const updateProject = (index: number, field: keyof Project, value: string | string[]) => {
    const updated = [...editedProjects];
    updated[index] = { ...updated[index], [field]: value };
    setEditedProjects(updated);
  };

  const updateTechnologies = (index: number, techString: string) => {
    const technologies = techString.split(',').map(t => t.trim()).filter(t => t !== '');
    updateProject(index, 'technologies', technologies);
  };

  const handleSave = () => {
    onSave(editedProjects.filter(proj => proj.title.trim() !== ""));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-foreground">Projects</h2>
        <Button onClick={addProject} variant="outline">
          <Plus size={16} />
          Add Project
        </Button>
      </div>
      
      <div className="space-y-6">
        {editedProjects.map((project, index) => (
          <Card key={index} className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-4">
                <Input
                  placeholder="Project Title"
                  value={project.title}
                  onChange={(e) => updateProject(index, "title", e.target.value)}
                />
                <Textarea
                  placeholder="Project description..."
                  value={project.description}
                  onChange={(e) => updateProject(index, "description", e.target.value)}
                  className="min-h-[80px]"
                />
                <Input
                  placeholder="Technologies (comma separated)"
                  value={project.technologies.join(', ')}
                  onChange={(e) => updateTechnologies(index, e.target.value)}
                />
                <Input
                  placeholder="Project Link/URL"
                  value={project.link}
                  onChange={(e) => updateProject(index, "link", e.target.value)}
                />
                <Input
                  placeholder="Image URL"
                  value={project.image}
                  onChange={(e) => updateProject(index, "image", e.target.value)}
                />
              </div>
              <Button
                onClick={() => removeProject(index)}
                size="sm"
                variant="outline"
                className="ml-4 text-destructive"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Changes
      </Button>
    </div>
  );
};