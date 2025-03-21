import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormStore } from "@/hooks/useFormStore";
import { PlusCircle } from "lucide-react";
import { FormElement } from '@/hooks/useFormStore';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

interface AddComponentDialogProps {
  children?: React.ReactNode;
}

const AddComponentDialog: React.FC<AddComponentDialogProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [label, setLabel] = React.useState('');
  const [type, setType] = React.useState<FormElement['type']>('text');
  const { addElement } = useFormStore();

  const handleAddComponent = () => {
    if (!label) {
      toast.error("Please enter a label for the component.");
      return;
    }

    const newElement: FormElement = {
      id: uuidv4(),
      type: type,
      label: label,
      required: false,
    };

    addElement(newElement);
    setOpen(false);
    setLabel('');
    toast.success(`${label} component added successfully!`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Component
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Component</DialogTitle>
          <DialogDescription>
            Add a new component to the form.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="label" className="text-right">
              Label
            </Label>
            <Input
              type="text"
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <select
              id="type"
              className="col-span-3 rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={type}
              onChange={(e) => setType(e.target.value as FormElement['type'])}
            >
              <option value="text">Text Input</option>
              <option value="email">Email Input</option>
              <option value="password">Password Input</option>
              <option value="number">Number Input</option>
              <option value="date">Date Input</option>
              <option value="textarea">Textarea</option>
              <option value="select">Select</option>
              <option value="checkbox">Checkbox</option>
              <option value="radio">Radio</option>
              <option value="heading">Heading</option>
              <option value="paragraph">Paragraph</option>
              <option value="custom">Custom Code</option>
              <option value="button">Button</option>
              <option value="accordion">Accordion</option>
              <option value="alert">Alert</option>
              <option value="alert-dialog">Alert Dialog</option>
              <option value="aspect-ratio">Aspect Ratio</option>
              <option value="avatar">Avatar</option>
              <option value="badge">Badge</option>
              <option value="breadcrumb">Breadcrumb</option>
              <option value="calendar">Calendar</option>
              <option value="card">Card</option>
              <option value="carousel">Carousel</option>
              <option value="chart">Chart</option>
              <option value="collapsible">Collapsible</option>
              <option value="combobox">Combobox</option>
              <option value="command">Command</option>
              <option value="context-menu">Context Menu</option>
              <option value="data-table">Data Table</option>
              <option value="date-picker">Date Picker</option>
              <option value="dialog">Dialog</option>
              <option value="drawer">Drawer</option>
              <option value="dropdown-menu">Dropdown Menu</option>
              <option value="form">Form</option>
              <option value="hover-card">Hover Card</option>
              <option value="input-otp">Input OTP</option>
              <option value="menubar">Menubar</option>
              <option value="navigation-menu">Navigation Menu</option>
              <option value="pagination">Pagination</option>
              <option value="popover">Popover</option>
              <option value="progress">Progress</option>
              <option value="radio-group">Radio Group</option>
              <option value="resizable">Resizable</option>
              <option value="scroll-area">Scroll Area</option>
              <option value="separator">Separator</option>
              <option value="sheet">Sheet</option>
              <option value="sidebar">Sidebar</option>
              <option value="skeleton">Skeleton</option>
              <option value="slider">Slider</option>
              <option value="sonner">Sonner</option>
              <option value="switch">Switch</option>
              <option value="table">Table</option>
              <option value="tabs">Tabs</option>
              <option value="toast">Toast</option>
              <option value="toggle">Toggle</option>
              <option value="toggle-group">Toggle Group</option>
              <option value="tooltip">Tooltip</option>
            </select>
          </div>
        </div>
        <Button onClick={handleAddComponent}>Add Component</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddComponentDialog;
