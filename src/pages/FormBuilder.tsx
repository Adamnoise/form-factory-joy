
import React, { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { useFormStore } from '@/hooks/useFormStore';
import { 
  Undo2, Redo2, Eye, Code, Save, FileDown, FileUp, Copy, Settings, Sun 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  ResizablePanelGroup, 
  ResizablePanel, 
  ResizableHandle 
} from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';
import FormCanvas from '@/components/FormCanvas';
import ComponentSidebar from '@/components/ComponentSidebar';
import PropertiesPanel from '@/components/PropertiesPanel';
import FormToolbar from '@/components/FormToolbar';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('edit'); // edit, preview, code
  const [gridSettings, setGridSettings] = useState({
    enabled: false,
    columns: 2,
    rows: 2
  });
  const { elements, addElement, reorderElements } = useFormStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = elements.findIndex((element) => element.id === active.id);
      const newIndex = elements.findIndex((element) => element.id === over.id);
      
      reorderElements(oldIndex, newIndex);
    }
  };

  const handleElementDrop = (type: string, label: string) => {
    addElement({
      id: uuidv4(),
      type: type as any,
      label: label
    });
    
    toast.success(`Added ${label} to your form`);
  };

  const handleFormTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTitle(e.target.value);
  };

  const handleSaveForm = () => {
    toast.success("Form saved successfully");
  };

  const handleExportForm = () => {
    const formData = {
      title: formTitle,
      elements: elements
    };
    
    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formTitle.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Form exported successfully");
  };

  const toggleGridSettings = () => {
    setGridSettings(prev => ({
      ...prev, 
      enabled: !prev.enabled
    }));
  };

  const updateGridColumns = (value: number) => {
    setGridSettings(prev => ({
      ...prev,
      columns: value
    }));
  };

  const updateGridRows = (value: number) => {
    setGridSettings(prev => ({
      ...prev,
      rows: value
    }));
  };

  const renderLayoutSettings = () => (
    <div className="border-b bg-background p-2 flex items-center space-x-4">
      <Label className="font-medium text-sm">Layout:</Label>
      <div className="grid grid-cols-3 gap-2">
        <Button 
          variant={!gridSettings.enabled ? 'default' : 'outline'} 
          size="sm" 
          onClick={() => setGridSettings({...gridSettings, enabled: false})}
        >
          Free
        </Button>
        <Button 
          variant={gridSettings.enabled ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setGridSettings({...gridSettings, enabled: true})}
        >
          Grid
        </Button>
      </div>

      {gridSettings.enabled && (
        <>
          <div className="flex items-center space-x-2">
            <Label className="text-sm">Columns:</Label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4].map(num => (
                <Button 
                  key={num}
                  size="sm"
                  variant={gridSettings.columns === num ? 'default' : 'outline'}
                  className="h-7 w-7 p-0"
                  onClick={() => updateGridColumns(num)}
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Label className="text-sm">Rows:</Label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4].map(num => (
                <Button 
                  key={num}
                  size="sm"
                  variant={gridSettings.rows === num ? 'default' : 'outline'}
                  className="h-7 w-7 p-0"
                  onClick={() => updateGridRows(num)}
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="ml-auto flex space-x-2">
        <Button 
          variant={viewMode === 'preview' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setViewMode('preview')}
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
        <Button 
          variant={viewMode === 'code' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setViewMode('code')}
        >
          <Code className="h-4 w-4 mr-2" />
          Code
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* App Header */}
      <header className="border-b bg-background z-10">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold">Form Builder</h1>
            <Separator orientation="vertical" className="h-6" />
            <Input
              value={formTitle}
              onChange={handleFormTitleChange}
              className="w-64 h-8"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" title="Copy">
              <Copy className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" title="Download" onClick={handleExportForm}>
              <FileDown className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" title="Import">
              <FileUp className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" title="Settings">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" title="Toggle Theme">
              <Sun className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Form Title Area */}
      <div className="border-b bg-background p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">{formTitle}</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button variant="outline" className="gap-2">
            <Code className="h-4 w-4" />
            Code
          </Button>
          <Button className="gap-2" onClick={handleSaveForm}>
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      {/* Layout Settings */}
      {renderLayoutSettings()}

      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Sidebar - Component Library */}
          <ResizablePanel defaultSize={20} minSize={15}>
            <ComponentSidebar onElementDrop={handleElementDrop} activeTab={activeTab} setActiveTab={setActiveTab} />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Main Form Canvas */}
          <ResizablePanel defaultSize={60} minSize={30}>
            <div className="flex flex-col h-full">
              <FormToolbar />
              <div className="flex-1 overflow-auto p-4">
                <DndContext 
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext items={elements.map(e => e.id)}>
                    <FormCanvas 
                      preview={viewMode === 'preview'} 
                      gridEnabled={gridSettings.enabled}
                      gridColumns={gridSettings.columns}
                      gridRows={gridSettings.rows}
                    />
                  </SortableContext>
                </DndContext>
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Right Sidebar - Properties */}
          <ResizablePanel defaultSize={20} minSize={15}>
            <PropertiesPanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default FormBuilder;
