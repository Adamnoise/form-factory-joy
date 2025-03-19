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

const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [activeTab, setActiveTab] = useState('all');
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
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* App Header */}
      <header className="border-b bg-background z-10">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold">Form Builder</h1>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-md">My Form</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" title="Copy">
              <Copy className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" title="Download">
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
            <FileUp className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" className="gap-2">
            <FileDown className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

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
                    <FormCanvas />
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
