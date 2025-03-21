
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  LayoutGrid, Columns, RowsIcon, Undo2, Redo2, Eye, Save, Code
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useFormStore } from '@/hooks/useFormStore';

interface FormToolbarProps {
  onPreviewToggle: () => void;
  isPreviewMode: boolean;
  gridEnabled: boolean;
  setGridEnabled: (enabled: boolean) => void;
  onExportCode?: () => void;
  onSave?: () => void;
}

const FormToolbar = ({
  onPreviewToggle,
  isPreviewMode,
  gridEnabled,
  setGridEnabled,
  onExportCode,
  onSave
}: FormToolbarProps) => {
  const { undo, redo, canUndo, canRedo } = useFormStore();

  return (
    <div className="flex items-center justify-between px-4 h-14 border-b border-t bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Button 
          variant={!gridEnabled ? "default" : "outline"} 
          size="sm" 
          className="gap-1"
          onClick={() => setGridEnabled(false)}
        >
          <LayoutGrid className="h-4 w-4" />
          Free
        </Button>
        <Button 
          variant={gridEnabled ? "default" : "outline"} 
          size="sm" 
          className="gap-1"
          onClick={() => setGridEnabled(true)}
        >
          <LayoutGrid className="h-4 w-4" />
          Grid
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Columns className="h-4 w-4" />
          Columns
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <RowsIcon className="h-4 w-4" />
          Rows
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          title="Undo"
          onClick={undo}
          disabled={!canUndo}
        >
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          title="Redo"
          onClick={redo}
          disabled={!canRedo}
        >
          <Redo2 className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button 
          variant={isPreviewMode ? "default" : "outline"} 
          size="sm" 
          className="gap-1"
          onClick={onPreviewToggle}
        >
          <Eye className="h-4 w-4" />
          Preview
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1"
          onClick={onExportCode}
        >
          <Code className="h-4 w-4" />
          Code
        </Button>
        <Button 
          size="sm" 
          className="gap-1"
          onClick={onSave}
        >
          <Save className="h-4 w-4" />
          Save
        </Button>
      </div>
    </div>
  );
};

export default FormToolbar;
