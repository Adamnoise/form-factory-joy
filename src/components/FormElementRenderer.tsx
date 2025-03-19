
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
  const { id, type, label, placeholder, required, options, defaultValue } = element;
  
  const renderLabel = () => {
    if (type === 'heading' || type === 'paragraph') return null;
    return (
      <Label htmlFor={id} className="mb-2 block">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
    );
  };
  
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
      
    default:
      return null;
  }
};

export default FormElementRenderer;
