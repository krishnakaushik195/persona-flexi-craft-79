import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";

interface Certification {
  name: string;
  issuer: string;
  date: string;
  image: string;
}

interface EditableCertificationsSectionProps {
  certifications: Certification[];
  onSave: (data: Certification[]) => void;
}

export const EditableCertificationsSection = ({ certifications, onSave }: EditableCertificationsSectionProps) => {
  const [editedCertifications, setEditedCertifications] = useState([...certifications]);

  const addCertification = () => {
    setEditedCertifications([...editedCertifications, {
      name: "",
      issuer: "",
      date: "",
      image: "/placeholder.svg"
    }]);
  };

  const removeCertification = (index: number) => {
    setEditedCertifications(editedCertifications.filter((_, i) => i !== index));
  };

  const updateCertification = (index: number, field: keyof Certification, value: string) => {
    const updated = [...editedCertifications];
    updated[index] = { ...updated[index], [field]: value };
    setEditedCertifications(updated);
  };

  const handleSave = () => {
    onSave(editedCertifications.filter(cert => cert.name.trim() !== "" || cert.issuer.trim() !== ""));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-foreground">Certifications</h2>
        <Button onClick={addCertification} variant="outline">
          <Plus size={16} />
          Add Certification
        </Button>
      </div>
      
      <div className="space-y-6">
        {editedCertifications.map((cert, index) => (
          <Card key={index} className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Certification Name"
                    value={cert.name}
                    onChange={(e) => updateCertification(index, "name", e.target.value)}
                  />
                  <Input
                    placeholder="Issuing Organization"
                    value={cert.issuer}
                    onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Date Obtained"
                    value={cert.date}
                    onChange={(e) => updateCertification(index, "date", e.target.value)}
                  />
                  <Input
                    placeholder="Image URL"
                    value={cert.image}
                    onChange={(e) => updateCertification(index, "image", e.target.value)}
                  />
                </div>
              </div>
              <Button
                onClick={() => removeCertification(index)}
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