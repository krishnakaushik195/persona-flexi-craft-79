import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";

interface Experience {
  position: string;
  company: string;
  duration: string;
  description: string;
}

interface EditableExperienceSectionProps {
  experience: Experience[];
  onSave: (data: Experience[]) => void;
}

export const EditableExperienceSection = ({ experience, onSave }: EditableExperienceSectionProps) => {
  const [editedExperience, setEditedExperience] = useState([...experience]);

  const addExperience = () => {
    setEditedExperience([...editedExperience, {
      position: "",
      company: "",
      duration: "",
      description: ""
    }]);
  };

  const removeExperience = (index: number) => {
    setEditedExperience(editedExperience.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updated = [...editedExperience];
    updated[index] = { ...updated[index], [field]: value };
    setEditedExperience(updated);
  };

  const handleSave = () => {
    onSave(editedExperience.filter(exp => exp.position.trim() !== "" || exp.company.trim() !== ""));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-foreground">Experience</h2>
        <Button onClick={addExperience} variant="outline">
          <Plus size={16} />
          Add Experience
        </Button>
      </div>
      
      <div className="space-y-6">
        {editedExperience.map((exp, index) => (
          <Card key={index} className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Position"
                    value={exp.position}
                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                  />
                  <Input
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                  />
                </div>
                <Input
                  placeholder="Duration (e.g., 2020 - Present)"
                  value={exp.duration}
                  onChange={(e) => updateExperience(index, "duration", e.target.value)}
                />
                <Textarea
                  placeholder="Job description and responsibilities..."
                  value={exp.description}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
              <Button
                onClick={() => removeExperience(index)}
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