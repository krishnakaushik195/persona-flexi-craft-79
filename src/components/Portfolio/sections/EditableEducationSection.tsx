import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";

interface Education {
  degree: string;
  institution: string;
  year: string;
  location: string;
}

interface EditableEducationSectionProps {
  education: Education[];
  onSave: (data: Education[]) => void;
}

export const EditableEducationSection = ({ education, onSave }: EditableEducationSectionProps) => {
  const [editedEducation, setEditedEducation] = useState([...education]);

  const addEducation = () => {
    setEditedEducation([...editedEducation, {
      degree: "",
      institution: "",
      year: "",
      location: ""
    }]);
  };

  const removeEducation = (index: number) => {
    setEditedEducation(editedEducation.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...editedEducation];
    updated[index] = { ...updated[index], [field]: value };
    setEditedEducation(updated);
  };

  const handleSave = () => {
    onSave(editedEducation.filter(edu => edu.degree.trim() !== "" || edu.institution.trim() !== ""));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-foreground">Education</h2>
        <Button onClick={addEducation} variant="outline">
          <Plus size={16} />
          Add Education
        </Button>
      </div>
      
      <div className="space-y-6">
        {editedEducation.map((edu, index) => (
          <Card key={index} className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Degree/Program Name"
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                  />
                  <Input
                    placeholder="Institution/University"
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Year (e.g., 2020 or 2018-2022)"
                    value={edu.year}
                    onChange={(e) => updateEducation(index, "year", e.target.value)}
                  />
                  <Input
                    placeholder="Location"
                    value={edu.location}
                    onChange={(e) => updateEducation(index, "location", e.target.value)}
                  />
                </div>
              </div>
              <Button
                onClick={() => removeEducation(index)}
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