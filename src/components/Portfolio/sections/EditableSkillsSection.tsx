import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Trash2, Plus } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface EditableSkillsSectionProps {
  skills: Skill[];
  onSave: (data: Skill[]) => void;
}

export const EditableSkillsSection = ({ skills, onSave }: EditableSkillsSectionProps) => {
  const [editedSkills, setEditedSkills] = useState([...skills]);
  
  const categories = ["Frontend", "Backend", "Database", "DevOps", "Cloud", "Mobile", "Other"];

  const addSkill = () => {
    setEditedSkills([...editedSkills, {
      name: "",
      level: 50,
      category: "Frontend"
    }]);
  };

  const removeSkill = (index: number) => {
    setEditedSkills(editedSkills.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, field: keyof Skill, value: string | number) => {
    const updated = [...editedSkills];
    updated[index] = { ...updated[index], [field]: value };
    setEditedSkills(updated);
  };

  const handleSave = () => {
    onSave(editedSkills.filter(skill => skill.name.trim() !== ""));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-foreground">Skills</h2>
        <Button onClick={addSkill} variant="outline">
          <Plus size={16} />
          Add Skill
        </Button>
      </div>
      
      <div className="space-y-6">
        {editedSkills.map((skill, index) => (
          <Card key={index} className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Skill Name (e.g., React, Python)"
                    value={skill.name}
                    onChange={(e) => updateSkill(index, "name", e.target.value)}
                  />
                  <Select 
                    value={skill.category} 
                    onValueChange={(value) => updateSkill(index, "category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Skill Level</span>
                    <span className="text-sm text-primary font-semibold">{skill.level}%</span>
                  </div>
                  <Slider
                    value={[skill.level]}
                    onValueChange={(value) => updateSkill(index, "level", value[0])}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>
              <Button
                onClick={() => removeSkill(index)}
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