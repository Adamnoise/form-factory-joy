
import React, { useState, useCallback } from 'react';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Button } from '@/components/ui/button';
import { Plus, Save, Download, Upload } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useFormStore } from '@/hooks/useFormStore';
import { FormElement } from '@/types/formTypes';
import FormCanvas from '@/components/FormCanvas';
import ElementSidebar from '@/components/ElementSidebar';
import PropertiesPanel from '@/components/PropertiesPanel';
import AddComponentDialog from '@/components/AddComponentDialog';
import FormToolbar from '@/components/FormToolbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from "sonner";

const FormBuilder = () => {
  const [open, setOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [gridEnabled, setGridEnabled] = useState(false);
  const isMobile = useIsMobile();
  const { elements, addElement, updateElement, setElements } = useFormStore();

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) return;

      if (active.id === "form-element" && over.id === "form-canvas") {
        setOpen(true);
        return;
      }

      if (active.id !== over.id) {
        // Find the indexes in the current elements array and create a new array with the items reordered
        const activeIndex = elements.findIndex((item) => item.id === active.id);
        const overIndex = elements.findIndex((item) => item.id === over.id);
        const newElements = arrayMove(elements, activeIndex, overIndex);
        
        // Now pass the complete new array to setElements instead of a callback function
        setElements(newElements);
      }
    },
    [elements, setElements, setOpen]
  );

  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(sensor);

  const togglePreviewMode = () => {
    setPreviewMode((prev) => !prev);
  };

  const handleAddElement = (element: any) => {
    addElement(element);
    setOpen(false);
  };

  const handleUpdateElement = (id: string, data: any) => {
    updateElement(id, data);
  };

  const handleExportCode = () => {
    const jsonCode = JSON.stringify(elements, null, 2);
    const blob = new Blob([jsonCode], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    toast("Form saved", {
      description: "Your form has been saved successfully."
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);
          setElements(jsonData);
          toast("Form loaded", {
            description: "Your form has been loaded successfully."
          });
        } catch (error) {
          toast("Error", {
            description: "Failed to load form data."
          });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <FormToolbar 
        onPreviewToggle={togglePreviewMode}
        isPreviewMode={previewMode}
        gridEnabled={gridEnabled}
        setGridEnabled={setGridEnabled}
        onExportCode={handleExportCode}
        onSave={handleSave}
      />

      <div className="flex flex-grow">
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
        >
          <ElementSidebar />

          <div className="flex-1 p-4">
            <FormCanvas 
              preview={previewMode} 
              gridEnabled={gridEnabled}
              gridColumns={3}
              gridRows={3}
            />
          </div>
        </DndContext>

        {!isMobile && (
          <PropertiesPanel onElementUpdate={handleUpdateElement} />
        )}
      </div>

      <div className="flex justify-between items-center px-4 py-3 border-t bg-background/80 backdrop-blur-sm">
        <Accordion type="single" collapsible>
          <AccordionItem value="help">
            <AccordionTrigger>Need Help?</AccordionTrigger>
            <AccordionContent>
              This is a basic form builder. Drag elements from the sidebar to the canvas.
              Use the properties panel to adjust element settings.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex items-center space-x-2">
          <label htmlFor="upload-form" className="cursor-pointer">
            <Button variant="outline" size="sm" asChild>
              <><Upload className="h-4 w-4 mr-2" /> Upload Form</>
            </Button>
            <input type="file" id="upload-form" accept=".json" onChange={handleFileChange} className="hidden" />
          </label>
          <Button variant="outline" size="sm" onClick={handleExportCode} className="gap-1">
            <Download className="h-4 w-4" />
            Export Form
          </Button>
          <Button size="sm" onClick={() => setOpen(true)} className="gap-1">
            <Plus className="h-4 w-4" />
            Add Component
          </Button>
        </div>
      </div>

      <AddComponentDialog 
        open={open} 
        onOpenChange={setOpen} 
        onAddElement={handleAddElement} 
      />
    </div>
  );
};

export default FormBuilder;
