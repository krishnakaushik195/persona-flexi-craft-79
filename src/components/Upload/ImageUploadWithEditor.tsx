import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, SkipForward, Edit, Upload } from 'lucide-react';
import { ImageEditor } from '@/components/ImageEditor/ImageEditor';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadWithEditorProps {
  onSkip: () => void;
  onSave: (imageUrl: string) => void;
  title?: string;
  description?: string;
}

export const ImageUploadWithEditor = ({ 
  onSkip, 
  onSave, 
  title = "Add Profile Picture (Optional)",
  description = "Upload and edit your profile picture"
}: ImageUploadWithEditorProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          const url = e.target?.result as string;
          setImagePreview(url);
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          const url = e.target?.result as string;
          setImagePreview(url);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleEditSave = (editedUrl: string) => {
    setEditedImageUrl(editedUrl);
    setShowEditor(false);
    toast({
      title: "Image edited successfully",
      description: "Your changes have been applied",
    });
  };

  const handleFinalSave = () => {
    const finalUrl = editedImageUrl || imagePreview;
    if (finalUrl) {
      onSave(finalUrl);
    }
  };

  if (showEditor && imagePreview) {
    return (
      <ImageEditor
        imageUrl={imagePreview}
        onSave={handleEditSave}
        onCancel={() => setShowEditor(false)}
      />
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">{title}</CardTitle>
        <p className="text-center text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          {(editedImageUrl || imagePreview) ? (
            <div className="space-y-4">
              <img 
                src={editedImageUrl || imagePreview} 
                alt="Profile preview" 
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20"
              />
              <p className="text-sm text-muted-foreground">
                {editedImageUrl ? 'Edited image preview' : 'Image preview'}
              </p>
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEditor(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Image
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => imageInputRef.current?.click()}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Change Image
                </Button>
              </div>
            </div>
          ) : (
            <div 
              className="w-full border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 hover:border-primary/50 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => imageInputRef.current?.click()}
            >
              <div className="w-32 h-32 rounded-full mx-auto bg-muted flex items-center justify-center mb-4">
                <Camera className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="text-center space-y-2">
                <p className="font-medium">Drop your image here or click to browse</p>
                <p className="text-sm text-muted-foreground">
                  Supports JPG, PNG, GIF up to 10MB
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          
          {!imagePreview && (
            <Button 
              onClick={() => imageInputRef.current?.click()}
              variant="outline" 
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          )}
        </div>

        <div className="flex gap-3">
          <Button onClick={onSkip} variant="outline" className="flex-1">
            <SkipForward className="h-4 w-4 mr-2" />
            Skip for Now
          </Button>
          <Button 
            onClick={handleFinalSave} 
            className="flex-1"
            disabled={!imagePreview}
          >
            Continue to Portfolio
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};