import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Camera, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { APIKeySettings } from "../APIKeySettings";

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
  const [imagePreview, setImagePreview] = useState<string | null>(personalInfo.photo_url);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const updateField = (field: keyof PersonalInfo, value: string) => {
    setEditedInfo({ ...editedInfo, [field]: value });
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setImagePreview(result);
          updateField("photo_url", result);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
      }
    }
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
        
        <div className="space-y-4">
          <h4 className="font-semibold">Profile Picture</h4>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-muted flex items-center justify-center">
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Profile preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 space-y-2">
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <Button 
                onClick={() => imageInputRef.current?.click()}
                variant="outline"
                size="sm"
              >
                <Camera className="h-4 w-4 mr-2" />
                {imagePreview ? 'Change Photo' : 'Upload Photo'}
              </Button>
              <Input
                placeholder="Or paste image URL"
                value={editedInfo.photo_url}
                onChange={(e) => {
                  updateField("photo_url", e.target.value);
                  setImagePreview(e.target.value);
                }}
                className="text-sm"
              />
            </div>
          </div>
        </div>
        
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

      <APIKeySettings />

      <Button onClick={handleSave} className="w-full">
        Save Profile Changes
      </Button>
    </div>
  );
};