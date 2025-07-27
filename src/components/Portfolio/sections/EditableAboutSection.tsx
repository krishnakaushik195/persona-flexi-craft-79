import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";

interface EditableAboutSectionProps {
  about: string;
  achievements: string[];
  onSave: (data: { about: string; achievements: string[] }) => void;
}

export const EditableAboutSection = ({ about, achievements, onSave }: EditableAboutSectionProps) => {
  const [editedAbout, setEditedAbout] = useState(about);
  const [editedAchievements, setEditedAchievements] = useState([...achievements]);

  const addAchievement = () => {
    setEditedAchievements([...editedAchievements, ""]);
  };

  const removeAchievement = (index: number) => {
    setEditedAchievements(editedAchievements.filter((_, i) => i !== index));
  };

  const updateAchievement = (index: number, value: string) => {
    const updated = [...editedAchievements];
    updated[index] = value;
    setEditedAchievements(updated);
  };

  const handleSave = () => {
    onSave({
      about: editedAbout,
      achievements: editedAchievements.filter(a => a.trim() !== "")
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-6">About Me</h2>
        <Textarea
          value={editedAbout}
          onChange={(e) => setEditedAbout(e.target.value)}
          className="min-h-[100px]"
          placeholder="Tell about yourself..."
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-foreground">Key Achievements</h3>
          <Button onClick={addAchievement} size="sm" variant="outline">
            <Plus size={16} />
            Add Achievement
          </Button>
        </div>
        <div className="space-y-3">
          {editedAchievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Input
                value={achievement}
                onChange={(e) => updateAchievement(index, e.target.value)}
                placeholder="Enter achievement..."
                className="flex-1"
              />
              <Button
                onClick={() => removeAchievement(index)}
                size="sm"
                variant="outline"
                className="text-destructive"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Changes
      </Button>
    </div>
  );
};