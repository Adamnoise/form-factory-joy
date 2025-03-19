
import React from 'react';
import { useFormStore } from '@/hooks/useFormStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

const PropertiesPanel = () => {
  const { elements, currentId, updateElement } = useFormStore();
  
  const currentElement = elements.find(element => element.id === currentId);
  
  if (!currentElement) {
    return (
      <div className="h-full border-l bg-background p-4">
        <h2 className="text-lg font-medium mb-4">Properties</h2>
        <div className="flex flex-col items-center justify-center h-[80%] text-center text-muted-foreground">
          <p>Select an element to edit its properties</p>
        </div>
      </div>
    );
  }

  const handleChange = (key: string, value: any) => {
    updateElement(currentElement.id, { [key]: value });
  };

  return (
    <div className="h-full border-l bg-background">
      <h2 className="text-lg font-medium p-4 border-b">Properties</h2>
      
      <ScrollArea className="h-[calc(100%-4rem)] p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              value={currentElement.label}
              onChange={(e) => handleChange('label', e.target.value)}
            />
          </div>
          
          {(currentElement.type === 'text' || currentElement.type === 'textarea' || currentElement.type === 'select') && (
            <div className="space-y-2">
              <Label htmlFor="placeholder">Placeholder</Label>
              <Input
                id="placeholder"
                value={currentElement.placeholder || ''}
                onChange={(e) => handleChange('placeholder', e.target.value)}
                placeholder="Enter placeholder text"
              />
            </div>
          )}
          
          {(currentElement.type === 'text' || currentElement.type === 'textarea' || currentElement.type === 'select' || 
            currentElement.type === 'checkbox' || currentElement.type === 'radio') && (
            <div className="flex items-center justify-between">
              <Label htmlFor="required">Required</Label>
              <Switch
                id="required"
                checked={currentElement.required || false}
                onCheckedChange={(checked) => handleChange('required', checked)}
              />
            </div>
          )}
          
          {currentElement.type === 'paragraph' && (
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={currentElement.defaultValue as string || ''}
                onChange={(e) => handleChange('defaultValue', e.target.value)}
                placeholder="Enter paragraph content"
                rows={5}
              />
            </div>
          )}
          
          {(currentElement.type === 'select' || currentElement.type === 'radio') && (
            <div className="space-y-2">
              <Label>Options</Label>
              <div className="space-y-2">
                {(currentElement.options || []).map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={option.label}
                      onChange={(e) => {
                        const newOptions = [...(currentElement.options || [])];
                        newOptions[index] = { ...newOptions[index], label: e.target.value };
                        handleChange('options', newOptions);
                      }}
                      placeholder="Option label"
                    />
                    <Input
                      value={option.value}
                      onChange={(e) => {
                        const newOptions = [...(currentElement.options || [])];
                        newOptions[index] = { ...newOptions[index], value: e.target.value };
                        handleChange('options', newOptions);
                      }}
                      placeholder="Option value"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="text-sm text-blue-500 hover:text-blue-700"
                  onClick={() => {
                    const newOptions = [...(currentElement.options || []), { label: '', value: '' }];
                    handleChange('options', newOptions);
                  }}
                >
                  + Add option
                </button>
              </div>
            </div>
          )}
          
          {(currentElement.type === 'text' || currentElement.type === 'textarea') && (
            <div className="space-y-4">
              <h3 className="font-medium">Validations</h3>
              
              <div className="space-y-2">
                <Label htmlFor="min-length">Min Length</Label>
                <Input
                  id="min-length"
                  type="number"
                  value={currentElement.validations?.minLength || ''}
                  onChange={(e) => handleChange('validations', {
                    ...currentElement.validations,
                    minLength: e.target.value ? parseInt(e.target.value) : undefined
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max-length">Max Length</Label>
                <Input
                  id="max-length"
                  type="number"
                  value={currentElement.validations?.maxLength || ''}
                  onChange={(e) => handleChange('validations', {
                    ...currentElement.validations,
                    maxLength: e.target.value ? parseInt(e.target.value) : undefined
                  })}
                />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PropertiesPanel;
