
import React from 'react';
import { FormElement } from '@/hooks/useFormStore';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormElementRendererProps {
  element: FormElement;
}

const FormElementRenderer = ({ element }: FormElementRendererProps) => {
  const { id, type, label, placeholder, required, options, defaultValue, code } = element;
  
  const renderLabel = () => {
    if (type === 'heading' || type === 'paragraph') return null;
    return (
      <Label htmlFor={id} className="mb-2 block">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
    );
  };
  
  // Handle custom component rendering
  if (type === 'custom' && code) {
    try {
      // Simple protection for code evaluation
      const safeCode = code.replace(/document|window|location|localStorage|sessionStorage|navigator/g, "");
      
      // This is a very simple implementation - in a real app you would need more safety measures
      // Use a sandbox or iframe for proper security
      return (
        <div className="custom-component mb-4 border p-4 rounded-md bg-gray-50">
          <div className="text-xs text-muted-foreground mb-2">Custom component: {label}</div>
          <div dangerouslySetInnerHTML={{ __html: safeCode }} />
        </div>
      );
    } catch (error) {
      console.error("Error rendering custom component:", error);
      return <div className="error">Error rendering custom component</div>;
    }
  }
  
  switch (type) {
    case 'text':
    case 'email':
    case 'password':
    case 'number':
    case 'date':
      return (
        <div className="mb-4">
          {renderLabel()}
          <Input
            id={id}
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue as string}
            required={required}
          />
        </div>
      );
      
    case 'textarea':
      return (
        <div className="mb-4">
          {renderLabel()}
          <Textarea
            id={id}
            placeholder={placeholder}
            defaultValue={defaultValue as string}
            required={required}
          />
        </div>
      );
      
    case 'select':
      return (
        <div className="mb-4">
          {renderLabel()}
          <Select defaultValue={defaultValue as string}>
            <SelectTrigger id={id}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
      
    case 'checkbox':
      return (
        <div className="mb-4 flex items-center space-x-2">
          <Checkbox id={id} defaultChecked={defaultValue as boolean} />
          <Label htmlFor={id}>{label}</Label>
        </div>
      );
      
    case 'radio':
      return (
        <div className="mb-4">
          <Label className="mb-2 block">{label}</Label>
          <RadioGroup defaultValue={defaultValue as string}>
            {options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${id}-${option.value}`} />
                <Label htmlFor={`${id}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      );
      
    case 'heading':
      return <h2 className="text-xl font-bold mb-4">{label}</h2>;
      
    case 'paragraph':
      return <p className="mb-4">{label}</p>;
      
    // Handle all shadcn/ui components
    case 'accordion':
    case 'alert':
    case 'alert-dialog':
    case 'aspect-ratio':
    case 'avatar':
    case 'badge':
    case 'breadcrumb':
    case 'button':
    case 'calendar':
    case 'card':
    case 'carousel':
    case 'chart':
    case 'collapsible':
    case 'combobox':
    case 'command':
    case 'context-menu':
    case 'data-table':
    case 'date-picker':
    case 'dialog':
    case 'drawer':
    case 'dropdown-menu':
    case 'form':
    case 'hover-card':
    case 'input-otp':
    case 'menubar':
    case 'navigation-menu':
    case 'pagination':
    case 'popover':
    case 'progress':
    case 'radio-group':
    case 'resizable':
    case 'scroll-area':
    case 'separator':
    case 'sheet':
    case 'sidebar':
    case 'skeleton':
    case 'slider':
    case 'sonner':
    case 'switch':
    case 'table':
    case 'tabs':
    case 'toast':
    case 'toggle':
    case 'toggle-group':
    case 'tooltip':
      return (
        <div className="mb-4 p-3 border rounded-md bg-gray-50">
          <div className="text-xs text-muted-foreground mb-2">shadcn/ui component: {label}</div>
          <div className="flex items-center justify-center p-6 border border-dashed rounded-md bg-white">
            {label} component placeholder
          </div>
        </div>
      );
      
    default:
      return null;
  }
};

export default FormElementRenderer;
