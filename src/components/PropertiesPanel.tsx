
import React, { useState } from 'react';
import { useFormStore, FormElement } from '@/hooks/useFormStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify, Palette, Layers, Move } from 'lucide-react';

const PropertiesPanel = () => {
  const { elements, currentId, updateElement } = useFormStore();
  const [activeTab, setActiveTab] = useState('basic');
  
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

  const handleStyleChange = (key: string, value: any) => {
    const updatedStyles = { ...(currentElement.styles || {}), [key]: value };
    updateElement(currentElement.id, { styles: updatedStyles });
  };

  const handlePositionChange = (key: string, value: any) => {
    const updatedPosition = { ...(currentElement.position || {}), [key]: value };
    updateElement(currentElement.id, { position: updatedPosition });
  };

  const handleValidationChange = (key: string, value: any) => {
    const updatedValidations = { ...(currentElement.validations || {}), [key]: value };
    updateElement(currentElement.id, { validations: updatedValidations });
  };

  const isFormInput = (type: string): boolean => {
    return [
      'text', 'number', 'textarea', 'select', 'checkbox', 'radio', 'date', 'email', 'password'
    ].includes(type);
  };

  const renderBasicSettings = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          value={currentElement.label}
          onChange={(e) => handleChange('label', e.target.value)}
        />
      </div>
      
      {isFormInput(currentElement.type) && (
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
      
      {isFormInput(currentElement.type) && (
        <div className="flex items-center justify-between">
          <Label htmlFor="required">Required field</Label>
          <Switch
            id="required"
            checked={currentElement.required || false}
            onCheckedChange={(checked) => handleChange('required', checked)}
          />
        </div>
      )}
      
      {(currentElement.type === 'text' || currentElement.type === 'textarea' || currentElement.type === 'email' || currentElement.type === 'password') && (
        <div className="space-y-2">
          <Label htmlFor="defaultValue">Default value</Label>
          {currentElement.type === 'textarea' ? (
            <Textarea
              id="defaultValue"
              value={currentElement.defaultValue as string || ''}
              onChange={(e) => handleChange('defaultValue', e.target.value)}
              placeholder="Enter default text"
            />
          ) : (
            <Input
              id="defaultValue"
              value={currentElement.defaultValue as string || ''}
              onChange={(e) => handleChange('defaultValue', e.target.value)}
              type={currentElement.type === 'number' ? 'number' : 'text'}
            />
          )}
        </div>
      )}
      
      {currentElement.type === 'checkbox' && (
        <div className="space-y-2">
          <Label htmlFor="defaultChecked">Default state</Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="defaultChecked"
              checked={currentElement.defaultValue as boolean || false}
              onCheckedChange={(checked) => handleChange('defaultValue', checked)}
            />
            <Label htmlFor="defaultChecked" className="text-sm">
              Checked by default
            </Label>
          </div>
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
      
      {(currentElement.type === 'heading' || currentElement.type === 'paragraph') && (
        <div className="space-y-2">
          <Label htmlFor="textAlign">Text Alignment</Label>
          <div className="flex space-x-2">
            <Button
              type="button"
              variant={currentElement.textAlign === "left" ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => handleChange("textAlign", "left")}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant={currentElement.textAlign === "center" ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => handleChange("textAlign", "center")}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant={currentElement.textAlign === "right" ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => handleChange("textAlign", "right")}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant={currentElement.textAlign === "justify" ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => handleChange("textAlign", "justify")}
            >
              <AlignJustify className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="customClass">Custom CSS Class</Label>
        <Input
          id="customClass"
          value={currentElement.customClass || ''}
          onChange={(e) => handleChange('customClass', e.target.value)}
          placeholder="E.g. my-custom-class"
        />
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="hidden">Hidden</Label>
        <Switch
          id="hidden"
          checked={!!currentElement.hidden}
          onCheckedChange={(checked) => handleChange('hidden', checked)}
        />
      </div>
    </div>
  );

  const renderStyleSettings = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="width">Width</Label>
        <Select value={currentElement.width || "full"} onValueChange={(value) => handleChange("width", value)}>
          <SelectTrigger id="width">
            <SelectValue placeholder="Select width" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full">Full width</SelectItem>
            <SelectItem value="medium">Medium (75%)</SelectItem>
            <SelectItem value="small">Small (50%)</SelectItem>
            <SelectItem value="tiny">Tiny (25%)</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>

        {currentElement.width === "custom" && (
          <div className="mt-2">
            <Label htmlFor="customWidth">Custom Width</Label>
            <div className="flex items-center gap-2">
              <Input
                id="customWidth"
                type="number"
                value={currentElement.customWidth || ''}
                onChange={(e) => handleChange("customWidth", e.target.value)}
                className="flex-1"
              />
              <Select
                value={currentElement.customWidthUnit || "px"}
                onValueChange={(value) => handleChange("customWidthUnit", value)}
              >
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="px">px</SelectItem>
                  <SelectItem value="%">%</SelectItem>
                  <SelectItem value="rem">rem</SelectItem>
                  <SelectItem value="em">em</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="size">Size</Label>
        <Select value={currentElement.size || "default"} onValueChange={(value) => handleChange("size", value)}>
          <SelectTrigger id="size">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="xs">Extra Small</SelectItem>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="large">Large</SelectItem>
            <SelectItem value="xl">Extra Large</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isFormInput(currentElement.type) && (
        <div className="space-y-2">
          <Label htmlFor="labelPosition">Label position</Label>
          <Select
            value={currentElement.labelPosition || "top"}
            onValueChange={(value) => handleChange("labelPosition", value)}
          >
            <SelectTrigger id="labelPosition">
              <SelectValue placeholder="Select label position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top">Top</SelectItem>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="right">Right</SelectItem>
              <SelectItem value="bottom">Bottom</SelectItem>
              <SelectItem value="hidden">Hidden</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <Separator />

      <div className="space-y-2">
        <Label>Colors</Label>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="textColor" className="text-xs">
              Text Color
            </Label>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded border"
                style={{ backgroundColor: currentElement.styles?.textColor || "#000000" }}
              />
              <Input
                id="textColor"
                type="text"
                value={currentElement.styles?.textColor || "#000000"}
                onChange={(e) => handleStyleChange("textColor", e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="backgroundColor" className="text-xs">
              Background Color
            </Label>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded border"
                style={{ backgroundColor: currentElement.styles?.backgroundColor || "transparent" }}
              />
              <Input
                id="backgroundColor"
                type="text"
                value={currentElement.styles?.backgroundColor || "transparent"}
                onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Border</Label>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="borderWidth" className="text-xs">
              Border Width
            </Label>
            <Input
              id="borderWidth"
              type="number"
              value={currentElement.styles?.borderWidth || "0"}
              onChange={(e) => handleStyleChange("borderWidth", e.target.value)}
              min="0"
              max="10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="borderStyle" className="text-xs">
              Border Style
            </Label>
            <Select
              value={currentElement.styles?.borderStyle || "solid"}
              onValueChange={(value) => handleStyleChange("borderStyle", value)}
            >
              <SelectTrigger id="borderStyle">
                <SelectValue placeholder="Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">Solid</SelectItem>
                <SelectItem value="dashed">Dashed</SelectItem>
                <SelectItem value="dotted">Dotted</SelectItem>
                <SelectItem value="double">Double</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="borderColor" className="text-xs">
              Border Color
            </Label>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded border"
                style={{ backgroundColor: currentElement.styles?.borderColor || "#000000" }}
              />
              <Input
                id="borderColor"
                type="text"
                value={currentElement.styles?.borderColor || "#000000"}
                onChange={(e) => handleStyleChange("borderColor", e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="borderRadius" className="text-xs">
              Border Radius
            </Label>
            <Input
              id="borderRadius"
              type="number"
              value={currentElement.styles?.borderRadius || "0"}
              onChange={(e) => handleStyleChange("borderRadius", e.target.value)}
              min="0"
              max="50"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Spacing</Label>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="paddingY" className="text-xs">
              Padding Y
            </Label>
            <Input
              id="paddingY"
              type="number"
              value={currentElement.styles?.paddingY || "0"}
              onChange={(e) => handleStyleChange("paddingY", e.target.value)}
              min="0"
              max="50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paddingX" className="text-xs">
              Padding X
            </Label>
            <Input
              id="paddingX"
              type="number"
              value={currentElement.styles?.paddingX || "0"}
              onChange={(e) => handleStyleChange("paddingX", e.target.value)}
              min="0"
              max="50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="marginY" className="text-xs">
              Margin Y
            </Label>
            <Input
              id="marginY"
              type="number"
              value={currentElement.styles?.marginY || "0"}
              onChange={(e) => handleStyleChange("marginY", e.target.value)}
              min="0"
              max="50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="marginX" className="text-xs">
              Margin X
            </Label>
            <Input
              id="marginX"
              type="number"
              value={currentElement.styles?.marginX || "0"}
              onChange={(e) => handleStyleChange("marginX", e.target.value)}
              min="0"
              max="50"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Typography</Label>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fontWeight" className="text-xs">
              Font Weight
            </Label>
            <Select
              value={currentElement.styles?.fontWeight || "normal"}
              onValueChange={(value) => handleStyleChange("fontWeight", value)}
            >
              <SelectTrigger id="fontWeight">
                <SelectValue placeholder="Weight" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="semibold">Semibold</SelectItem>
                <SelectItem value="bold">Bold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fontSize" className="text-xs">
              Font Size
            </Label>
            <Input
              id="fontSize"
              type="number"
              value={currentElement.styles?.fontSize || ""}
              onChange={(e) => handleStyleChange("fontSize", e.target.value)}
              min="8"
              max="72"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lineHeight" className="text-xs">
              Line Height
            </Label>
            <Input
              id="lineHeight"
              type="number"
              value={currentElement.styles?.lineHeight || ""}
              onChange={(e) => handleStyleChange("lineHeight", e.target.value)}
              min="1"
              max="3"
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="letterSpacing" className="text-xs">
              Letter Spacing
            </Label>
            <Input
              id="letterSpacing"
              type="number"
              value={currentElement.styles?.letterSpacing || ""}
              onChange={(e) => handleStyleChange("letterSpacing", e.target.value)}
              min="-2"
              max="10"
              step="0.1"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Effects</Label>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="opacity" className="text-xs">
              Opacity
            </Label>
            <div className="pt-2">
              <Slider
                id="opacity"
                defaultValue={[
                  currentElement.styles?.opacity ? Number.parseFloat(currentElement.styles.opacity) * 100 : 100,
                ]}
                max={100}
                step={1}
                onValueChange={(value) => handleStyleChange("opacity", (value[0] / 100).toString())}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shadow" className="text-xs">
              Shadow
            </Label>
            <Select
              value={currentElement.styles?.shadow || "none"}
              onValueChange={(value) => handleStyleChange("shadow", value)}
            >
              <SelectTrigger id="shadow">
                <SelectValue placeholder="Shadow" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="md">Medium</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
                <SelectItem value="xl">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPositionSettings = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Position Type</Label>
        <RadioGroup
          value={currentElement.position?.type || "static"}
          onValueChange={(value) => handlePositionChange("type", value)}
          className="grid grid-cols-2 gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="static" id="position-static" />
            <Label htmlFor="position-static">Static</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="relative" id="position-relative" />
            <Label htmlFor="position-relative">Relative</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="absolute" id="position-absolute" />
            <Label htmlFor="position-absolute">Absolute</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fixed" id="position-fixed" />
            <Label htmlFor="position-fixed">Fixed</Label>
          </div>
        </RadioGroup>
      </div>

      {currentElement.position?.type && currentElement.position.type !== "static" && (
        <>
          <div className="space-y-2">
            <Label>Coordinates</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="positionTop" className="text-xs">
                  Top
                </Label>
                <Input
                  id="positionTop"
                  type="text"
                  value={currentElement.position?.top || ""}
                  onChange={(e) => handlePositionChange("top", e.target.value)}
                  placeholder="auto"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="positionRight" className="text-xs">
                  Right
                </Label>
                <Input
                  id="positionRight"
                  type="text"
                  value={currentElement.position?.right || ""}
                  onChange={(e) => handlePositionChange("right", e.target.value)}
                  placeholder="auto"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="positionBottom" className="text-xs">
                  Bottom
                </Label>
                <Input
                  id="positionBottom"
                  type="text"
                  value={currentElement.position?.bottom || ""}
                  onChange={(e) => handlePositionChange("bottom", e.target.value)}
                  placeholder="auto"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="positionLeft" className="text-xs">
                  Left
                </Label>
                <Input
                  id="positionLeft"
                  type="text"
                  value={currentElement.position?.left || ""}
                  onChange={(e) => handlePositionChange("left", e.target.value)}
                  placeholder="auto"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Z-Index</Label>
            <Input
              id="zIndex"
              type="number"
              value={currentElement.position?.zIndex || ""}
              onChange={(e) => handlePositionChange("zIndex", e.target.value)}
              placeholder="auto"
            />
            <p className="text-xs text-muted-foreground">Controls stacking order of elements</p>
          </div>
        </>
      )}

      <Separator />

      <div className="space-y-2">
        <Label>Alignment</Label>
        <div className="grid grid-cols-3 gap-2">
          <Button
            type="button"
            variant={currentElement.position?.align === "left" ? "default" : "outline"}
            size="sm"
            onClick={() => handlePositionChange("align", "left")}
          >
            <AlignLeft className="h-4 w-4 mr-2" />
            Left
          </Button>
          <Button
            type="button"
            variant={currentElement.position?.align === "center" ? "default" : "outline"}
            size="sm"
            onClick={() => handlePositionChange("align", "center")}
          >
            <AlignCenter className="h-4 w-4 mr-2" />
            Center
          </Button>
          <Button
            type="button"
            variant={currentElement.position?.align === "right" ? "default" : "outline"}
            size="sm"
            onClick={() => handlePositionChange("align", "right")}
          >
            <AlignRight className="h-4 w-4 mr-2" />
            Right
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Grid Position</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="gridColumn" className="text-xs">
              Grid Column
            </Label>
            <Input
              id="gridColumn"
              type="text"
              value={currentElement.position?.gridColumn || ""}
              onChange={(e) => handlePositionChange("gridColumn", e.target.value)}
              placeholder="auto / span 1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gridRow" className="text-xs">
              Grid Row
            </Label>
            <Input
              id="gridRow"
              type="text"
              value={currentElement.position?.gridRow || ""}
              onChange={(e) => handlePositionChange("gridRow", e.target.value)}
              placeholder="auto / span 1"
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">For advanced grid layouts</p>
      </div>

      <div className="space-y-2">
        <Label>Responsive Visibility</Label>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="hideMobile" className="text-sm">
              Hide on Mobile
            </Label>
            <Switch
              id="hideMobile"
              checked={!!currentElement.position?.hideMobile}
              onCheckedChange={(checked) => handlePositionChange("hideMobile", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="hideTablet" className="text-sm">
              Hide on Tablet
            </Label>
            <Switch
              id="hideTablet"
              checked={!!currentElement.position?.hideTablet}
              onCheckedChange={(checked) => handlePositionChange("hideTablet", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="hideDesktop" className="text-sm">
              Hide on Desktop
            </Label>
            <Switch
              id="hideDesktop"
              checked={!!currentElement.position?.hideDesktop}
              onCheckedChange={(checked) => handlePositionChange("hideDesktop", checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderValidationSettings = () => (
    <div className="space-y-4">
      {(currentElement.type === 'text' || currentElement.type === 'textarea' || currentElement.type === 'email') && (
        <>
          <div className="space-y-2">
            <Label htmlFor="minLength">Minimum length</Label>
            <Input
              id="minLength"
              type="number"
              value={currentElement.validations?.minLength || ""}
              onChange={(e) => handleValidationChange("minLength", e.target.value ? Number(e.target.value) : undefined)}
              min={0}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxLength">Maximum length</Label>
            <Input
              id="maxLength"
              type="number"
              value={currentElement.validations?.maxLength || ""}
              onChange={(e) => handleValidationChange("maxLength", e.target.value ? Number(e.target.value) : undefined)}
              min={0}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pattern">Pattern (regex)</Label>
            <Input
              id="pattern"
              value={currentElement.validations?.pattern || ""}
              onChange={(e) => handleValidationChange("pattern", e.target.value)}
              placeholder="e.g. [A-Za-z]+"
            />
            <p className="text-xs text-muted-foreground">Regular expression pattern for validation</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="patternPresets">Common Patterns</Label>
            <Select
              onValueChange={(value) => {
                if (value !== "custom") {
                  handleValidationChange("pattern", value);
                }
              }}
            >
              <SelectTrigger id="patternPresets">
                <SelectValue placeholder="Select a pattern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="custom">Custom</SelectItem>
                <SelectItem value="[A-Za-z]+">Letters only</SelectItem>
                <SelectItem value="[0-9]+">Numbers only</SelectItem>
                <SelectItem value="[A-Za-z0-9]+">Alphanumeric</SelectItem>
                <SelectItem value="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}">Email</SelectItem>
                <SelectItem value="https?://.+">URL</SelectItem>
                <SelectItem value="\d{3}-\d{3}-\d{4}">Phone (xxx-xxx-xxxx)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {currentElement.type === 'number' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="min">Minimum value</Label>
            <Input
              id="min"
              type="number"
              value={currentElement.validations?.min || ""}
              onChange={(e) => handleValidationChange("min", e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max">Maximum value</Label>
            <Input
              id="max"
              type="number"
              value={currentElement.validations?.max || ""}
              onChange={(e) => handleValidationChange("max", e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="step">Step</Label>
            <Input
              id="step"
              type="number"
              value={currentElement.validations?.step || ""}
              onChange={(e) => handleValidationChange("step", e.target.value ? Number(e.target.value) : undefined)}
              min={0}
              step={0.01}
            />
            <p className="text-xs text-muted-foreground">Increment/decrement step value</p>
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="customValidation">Custom validation message</Label>
        <Textarea
          id="customValidation"
          value={currentElement.validations?.customValidation || ""}
          onChange={(e) => handleValidationChange("customValidation", e.target.value)}
          placeholder="Enter custom validation message"
          className="min-h-[80px]"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="validateOnBlur">Validate on blur</Label>
          <Switch
            id="validateOnBlur"
            checked={!!currentElement.validations?.validateOnBlur}
            onCheckedChange={(checked) => handleValidationChange("validateOnBlur", checked)}
          />
        </div>
        <p className="text-xs text-muted-foreground">Validate when user leaves the field</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="validateOnChange">Validate on change</Label>
          <Switch
            id="validateOnChange"
            checked={!!currentElement.validations?.validateOnChange}
            onCheckedChange={(checked) => handleValidationChange("validateOnChange", checked)}
          />
        </div>
        <p className="text-xs text-muted-foreground">Validate as user types</p>
      </div>
    </div>
  );

  return (
    <div className="h-full border-l bg-background flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-medium">Properties</h2>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="text-xs">Preview</Button>
          <Button size="sm" variant="ghost" className="text-xs">Code</Button>
        </div>
      </div>
      
      <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="px-4 pt-2 justify-start border-b rounded-none gap-2">
          <TabsTrigger value="basic" className="data-[state=active]:bg-muted">
            <AlignLeft className="h-4 w-4 mr-2" />
            Basic
          </TabsTrigger>
          <TabsTrigger value="style" className="data-[state=active]:bg-muted">
            <Palette className="h-4 w-4 mr-2" />
            Style
          </TabsTrigger>
          <TabsTrigger value="position" className="data-[state=active]:bg-muted">
            <Move className="h-4 w-4 mr-2" />
            Position
          </TabsTrigger>
          {isFormInput(currentElement.type) && (
            <TabsTrigger value="validation" className="data-[state=active]:bg-muted">
              <Layers className="h-4 w-4 mr-2" />
              Validation
            </TabsTrigger>
          )}
        </TabsList>
        
        <ScrollArea className="flex-1 p-4">
          <TabsContent value="basic" className="mt-0 pb-4">
            {renderBasicSettings()}
          </TabsContent>
          
          <TabsContent value="style" className="mt-0 pb-4">
            {renderStyleSettings()}
          </TabsContent>
          
          <TabsContent value="position" className="mt-0 pb-4">
            {renderPositionSettings()}
          </TabsContent>
          
          <TabsContent value="validation" className="mt-0 pb-4">
            {renderValidationSettings()}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default PropertiesPanel;
