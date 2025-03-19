
import React from 'react';
import { FormElement } from '@/hooks/useFormStore';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface FormElementRendererProps {
  element: FormElement;
}

const FormElementRenderer = ({ element }: FormElementRendererProps) => {
  const { 
    id, 
    type, 
    label, 
    placeholder, 
    required, 
    options, 
    defaultValue, 
    code,
    styles,
    width,
    customWidth,
    customWidthUnit,
    size,
    textAlign,
    hidden
  } = element;
  
  // Generate styles from element properties
  const getElementStyles = () => {
    const baseStyles: React.CSSProperties = {};
    
    // Set width based on element properties
    if (width) {
      switch(width) {
        case 'full': baseStyles.width = '100%'; break;
        case 'medium': baseStyles.width = '75%'; break;
        case 'small': baseStyles.width = '50%'; break;
        case 'tiny': baseStyles.width = '25%'; break;
        case 'custom':
          if (customWidth && customWidthUnit) {
            baseStyles.width = `${customWidth}${customWidthUnit}`;
          }
          break;
      }
    }
    
    // Set text alignment
    if (textAlign) {
      baseStyles.textAlign = textAlign;
    }
    
    // Set size-based styles
    if (size) {
      switch(size) {
        case 'xs': baseStyles.fontSize = '0.75rem'; break;
        case 'small': baseStyles.fontSize = '0.875rem'; break;
        case 'large': baseStyles.fontSize = '1.125rem'; break;
        case 'xl': baseStyles.fontSize = '1.25rem'; break;
      }
    }
    
    // Add custom styles from the styles object
    if (styles) {
      if (styles.textColor) baseStyles.color = styles.textColor;
      if (styles.backgroundColor) baseStyles.backgroundColor = styles.backgroundColor;
      
      if (styles.borderWidth && styles.borderStyle && styles.borderColor) {
        baseStyles.border = `${styles.borderWidth}px ${styles.borderStyle} ${styles.borderColor}`;
      }
      
      if (styles.borderRadius) baseStyles.borderRadius = `${styles.borderRadius}px`;
      
      if (styles.paddingY || styles.paddingX) {
        baseStyles.padding = `${styles.paddingY || 0}px ${styles.paddingX || 0}px`;
      }
      
      if (styles.marginY || styles.marginX) {
        baseStyles.margin = `${styles.marginY || 0}px ${styles.marginX || 0}px`;
      }
      
      if (styles.fontWeight) baseStyles.fontWeight = styles.fontWeight;
      if (styles.fontSize) baseStyles.fontSize = `${styles.fontSize}px`;
      if (styles.lineHeight) baseStyles.lineHeight = styles.lineHeight;
      if (styles.letterSpacing) baseStyles.letterSpacing = `${styles.letterSpacing}px`;
      if (styles.opacity) baseStyles.opacity = styles.opacity;
      
      if (styles.shadow && styles.shadow !== 'none') {
        const shadowMap: {[key: string]: string} = {
          sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
          md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        };
        baseStyles.boxShadow = shadowMap[styles.shadow] || 'none';
      }
    }
    
    // Handle visibility
    if (hidden) {
      baseStyles.display = 'none';
    }
    
    return baseStyles;
  };
  
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
        <div 
          className={cn("custom-component mb-4 border p-4 rounded-md bg-gray-50", element.customClass)}
          style={getElementStyles()}
        >
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
        <div className={cn("mb-4", element.customClass)} style={getElementStyles()}>
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
        <div className={cn("mb-4", element.customClass)} style={getElementStyles()}>
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
        <div className={cn("mb-4", element.customClass)} style={getElementStyles()}>
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
        <div className={cn("mb-4 flex items-center space-x-2", element.customClass)} style={getElementStyles()}>
          <Checkbox id={id} defaultChecked={defaultValue as boolean} />
          <Label htmlFor={id}>{label}</Label>
        </div>
      );
      
    case 'radio':
      return (
        <div className={cn("mb-4", element.customClass)} style={getElementStyles()}>
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
      return (
        <h2 
          className={cn("text-xl font-bold mb-4", element.customClass)} 
          style={getElementStyles()}
        >
          {label}
        </h2>
      );
      
    case 'paragraph':
      return (
        <p 
          className={cn("mb-4", element.customClass)} 
          style={getElementStyles()}
        >
          {label}
        </p>
      );
      
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
        <div 
          className={cn("mb-4 p-3 border rounded-md bg-gray-50", element.customClass)} 
          style={getElementStyles()}
        >
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
