import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, FabricImage } from "fabric";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { 
  RotateCw, 
  Crop, 
  Palette, 
  Download, 
  Undo2, 
  ZoomIn, 
  ZoomOut,
  Move,
  Square,
  CircleDot
} from "lucide-react";
import { toast } from "sonner";

interface ImageEditorProps {
  imageUrl: string;
  onSave: (editedImageUrl: string) => void;
  onCancel: () => void;
}

export const ImageEditor = ({ imageUrl, onSave, onCancel }: ImageEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeTool, setActiveTool] = useState<"select" | "crop" | "draw" | "rectangle" | "circle">("select");
  const [brightness, setBrightness] = useState([0]);
  const [contrast, setContrast] = useState([0]);
  const [saturation, setSaturation] = useState([0]);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [originalImage, setOriginalImage] = useState<FabricImage | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 600,
      height: 400,
      backgroundColor: "#ffffff",
    });

    // Load the image
    FabricImage.fromURL(imageUrl).then((img) => {
      // Scale image to fit canvas
      const canvasWidth = canvas.getWidth();
      const canvasHeight = canvas.getHeight();
      const imageWidth = img.width || 1;
      const imageHeight = img.height || 1;
      
      const scale = Math.min(canvasWidth / imageWidth, canvasHeight / imageHeight, 1);
      img.scale(scale);
      
      img.set({
        left: (canvasWidth - imageWidth * scale) / 2,
        top: (canvasHeight - imageHeight * scale) / 2,
        selectable: activeTool === "select"
      });

      canvas.add(img);
      canvas.setActiveObject(img);
      setOriginalImage(img);
      canvas.renderAll();
    });

    setFabricCanvas(canvas);
    toast("Image loaded! Start editing.");

    return () => {
      canvas.dispose();
    };
  }, [imageUrl]);

  useEffect(() => {
    if (!fabricCanvas || !originalImage) return;

    fabricCanvas.isDrawingMode = activeTool === "draw";
    
    if (activeTool === "draw" && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = "#000000";
      fabricCanvas.freeDrawingBrush.width = 2;
    }

    // Update object selectability
    fabricCanvas.getObjects().forEach(obj => {
      obj.set('selectable', activeTool === "select");
    });
    
    fabricCanvas.renderAll();
  }, [activeTool, fabricCanvas, originalImage]);

  // Apply filters when values change
  useEffect(() => {
    if (!originalImage || !fabricCanvas) return;

    // Apply basic transformations
    const element = originalImage.getElement() as HTMLImageElement;
    if (element) {
      let filterString = '';
      
      if (brightness[0] !== 0) {
        filterString += `brightness(${1 + brightness[0] / 100}) `;
      }
      
      if (contrast[0] !== 0) {
        filterString += `contrast(${1 + contrast[0] / 100}) `;
      }
      
      if (saturation[0] !== 0) {
        filterString += `saturate(${1 + saturation[0] / 100}) `;
      }

      element.style.filter = filterString.trim();
    }
    
    fabricCanvas.renderAll();
  }, [brightness, contrast, saturation, originalImage, fabricCanvas]);

  const handleToolClick = (tool: typeof activeTool) => {
    setActiveTool(tool);

    if (!fabricCanvas) return;

    if (tool === "rectangle") {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: "transparent",
        stroke: "#000000",
        strokeWidth: 2,
        width: 100,
        height: 100,
      });
      fabricCanvas.add(rect);
    } else if (tool === "circle") {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: "transparent",
        stroke: "#000000",
        strokeWidth: 2,
        radius: 50,
      });
      fabricCanvas.add(circle);
    }
  };

  const handleRotate = () => {
    if (!originalImage || !fabricCanvas) return;
    
    const newRotation = rotation + 90;
    setRotation(newRotation);
    originalImage.rotate(newRotation);
    fabricCanvas.renderAll();
  };

  const handleZoomIn = () => {
    if (!fabricCanvas) return;
    const newZoom = Math.min(zoom * 1.2, 3);
    setZoom(newZoom);
    fabricCanvas.setZoom(newZoom);
    fabricCanvas.renderAll();
  };

  const handleZoomOut = () => {
    if (!fabricCanvas) return;
    const newZoom = Math.max(zoom / 1.2, 0.1);
    setZoom(newZoom);
    fabricCanvas.setZoom(newZoom);
    fabricCanvas.renderAll();
  };

  const handleUndo = () => {
    if (!fabricCanvas) return;
    
    const objects = fabricCanvas.getObjects();
    if (objects.length > 1) { // Keep at least the original image
      fabricCanvas.remove(objects[objects.length - 1]);
      fabricCanvas.renderAll();
    }
  };

  const handleSave = () => {
    if (!fabricCanvas) return;

    const dataURL = fabricCanvas.toDataURL({
      format: 'png',
      quality: 1.0,
      multiplier: 1
    });

    onSave(dataURL);
    toast("Image saved successfully!");
  };

  const resetFilters = () => {
    setBrightness([0]);
    setContrast([0]);
    setSaturation([0]);
    setRotation(0);
    setZoom(1);
    
    if (originalImage && fabricCanvas) {
      const element = originalImage.getElement() as HTMLImageElement;
      if (element) {
        element.style.filter = '';
      }
      originalImage.rotate(0);
      fabricCanvas.setZoom(1);
      fabricCanvas.renderAll();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Image Editor
            <div className="flex gap-2">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tools */}
          <div className="flex flex-wrap gap-2 p-4 bg-muted rounded-lg">
            <Button
              variant={activeTool === "select" ? "default" : "outline"}
              size="sm"
              onClick={() => handleToolClick("select")}
            >
              <Move className="h-4 w-4 mr-2" />
              Select
            </Button>
            <Button
              variant={activeTool === "draw" ? "default" : "outline"}
              size="sm"
              onClick={() => handleToolClick("draw")}
            >
              <Palette className="h-4 w-4 mr-2" />
              Draw
            </Button>
            <Button
              variant={activeTool === "rectangle" ? "default" : "outline"}
              size="sm"
              onClick={() => handleToolClick("rectangle")}
            >
              <Square className="h-4 w-4 mr-2" />
              Rectangle
            </Button>
            <Button
              variant={activeTool === "circle" ? "default" : "outline"}
              size="sm"
              onClick={() => handleToolClick("circle")}
            >
              <CircleDot className="h-4 w-4 mr-2" />
              Circle
            </Button>
            
            <div className="border-l mx-2" />
            
            <Button variant="outline" size="sm" onClick={handleRotate}>
              <RotateCw className="h-4 w-4 mr-2" />
              Rotate
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4 mr-2" />
              Zoom In
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4 mr-2" />
              Zoom Out
            </Button>
            <Button variant="outline" size="sm" onClick={handleUndo}>
              <Undo2 className="h-4 w-4 mr-2" />
              Undo
            </Button>
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Reset
            </Button>
          </div>

          <div className="flex gap-6">
            {/* Canvas */}
            <div className="flex-1">
              <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden bg-checkered">
                <canvas ref={canvasRef} className="max-w-full" />
              </div>
            </div>

            {/* Adjustments Panel */}
            <div className="w-80 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Adjustments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Brightness: {brightness[0]}
                    </label>
                    <Slider
                      value={brightness}
                      onValueChange={setBrightness}
                      min={-100}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Contrast: {contrast[0]}
                    </label>
                    <Slider
                      value={contrast}
                      onValueChange={setContrast}
                      min={-100}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Saturation: {saturation[0]}
                    </label>
                    <Slider
                      value={saturation}
                      onValueChange={setSaturation}
                      min={-100}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Zoom: {Math.round(zoom * 100)}%
                    </label>
                    <div className="text-xs text-muted-foreground">
                      Use zoom buttons or mouse wheel
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};