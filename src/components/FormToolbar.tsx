
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  LayoutGrid, Columns, RowsIcon, Undo2, Redo2, Eye, Save, Code
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const FormToolbar = () => {
  return (
    <div className="flex items-center justify-between px-4 h-14 border-b border-t bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-1">
          <LayoutGrid className="h-4 w-4" />
          Free
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
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
        <Button variant="ghost" size="icon" title="Undo">
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Redo">
          <Redo2 className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button variant="outline" size="sm" className="gap-1">
          <Eye className="h-4 w-4" />
          Preview
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Code className="h-4 w-4" />
          Code
        </Button>
        <Button size="sm" className="gap-1">
          <Save className="h-4 w-4" />
          Save
        </Button>
      </div>
    </div>
  );
};

export default FormToolbar;
