import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  photo_url: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  twitter: string;
}

interface EditableProfileSectionProps {
  personalInfo: PersonalInfo;
  onSave: (data: PersonalInfo) => void;
}

export const EditableProfileSection = ({ personalInfo, onSave }: EditableProfileSectionProps) => {
  const [editedInfo, setEditedInfo] = useState({ ...personalInfo });

  const updateField = (field: keyof PersonalInfo, value: string) => {
    setEditedInfo({ ...editedInfo, [field]: value });
  };

  const handleSave = () => {
    onSave(editedInfo);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-foreground">Edit Profile</h2>
      
      <Card className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Full Name"
            value={editedInfo.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
          <Input
            placeholder="Professional Role"
            value={editedInfo.role}
            onChange={(e) => updateField("role", e.target.value)}
          />
        </div>
        
        <Input
          placeholder="Professional Tagline"
          value={editedInfo.tagline}
          onChange={(e) => updateField("tagline", e.target.value)}
        />
        
        <Input
          placeholder="Photo URL"
          value={editedInfo.photo_url}
          onChange={(e) => updateField("photo_url", e.target.value)}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Location"
            value={editedInfo.location}
            onChange={(e) => updateField("location", e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            value={editedInfo.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>
        
        <Input
          placeholder="Phone Number"
          value={editedInfo.phone}
          onChange={(e) => updateField("phone", e.target.value)}
        />
        
        <div className="space-y-4">
          <h4 className="font-semibold">Social Links</h4>
          <Input
            placeholder="LinkedIn URL"
            value={editedInfo.linkedin}
            onChange={(e) => updateField("linkedin", e.target.value)}
          />
          <Input
            placeholder="GitHub URL"
            value={editedInfo.github}
            onChange={(e) => updateField("github", e.target.value)}
          />
          <Input
            placeholder="Twitter URL"
            value={editedInfo.twitter}
            onChange={(e) => updateField("twitter", e.target.value)}
          />
        </div>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Save Profile Changes
      </Button>
    </div>
  );
};