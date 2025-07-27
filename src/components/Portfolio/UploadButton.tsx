import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const UploadButton = () => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate('/upload')}
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
    >
      <Upload className="h-4 w-4" />
      Upload Resume
    </Button>
  );
};