
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

interface AddComponentDialogProps {
  onAddComponent: (component: { id: string; type: string; label: string; code: string }) => void;
}

const AddComponentDialog = ({ onAddComponent }: AddComponentDialogProps) => {
  const [componentName, setComponentName] = useState('');
  const [componentType, setComponentType] = useState('custom');
  const [componentCode, setComponentCode] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!componentName.trim()) {
      toast.error("Please enter a component name");
      return;
    }

    if (!componentCode.trim()) {
      toast.error("Please enter component code");
      return;
    }

    // Add the new component
    onAddComponent({
      id: uuidv4(),
      type: componentType,
      label: componentName,
      code: componentCode
    });

    // Reset form and close dialog
    setComponentName('');
    setComponentType('custom');
    setComponentCode('');
    setOpen(false);
    
    toast.success(`Component "${componentName}" added successfully`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="ml-2 gap-1">
          <Plus className="h-4 w-4" /> Add Component
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add New Component</DialogTitle>
          <DialogDescription>
            Enter details and code for your custom component
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                value={componentName}
                onChange={(e) => setComponentName(e.target.value)}
                className="col-span-3"
                placeholder="My Custom Component"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">Type</Label>
              <Input
                id="type"
                value={componentType}
                onChange={(e) => setComponentType(e.target.value)}
                className="col-span-3"
                placeholder="custom"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="code" className="text-right pt-2">Code</Label>
              <Textarea
                id="code"
                value={componentCode}
                onChange={(e) => setComponentCode(e.target.value)}
                className="col-span-3 min-h-[200px] font-mono text-sm"
                placeholder="Enter component code here..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Component</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddComponentDialog;
