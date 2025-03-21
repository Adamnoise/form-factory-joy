import React from 'react';
import { useFormStore } from '@/hooks/useFormStore';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from "@/components/ui/slider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils';

const PropertiesPanel = () => {
  const { currentId, elements, updateElement } = useFormStore();

  const currentElement = elements.find((element) => element.id === currentId);

  if (!currentElement) {
    return <div className="p-4">Select an element to see its properties.</div>;
  }

  const handleChange = (prop: string, value: any) => {
    updateElement(currentId, { [prop]: value });
  };
  
  const handleStyleChange = (styleProp: string, value: string) => {
    updateElement(currentId, {
      styles: {
        ...currentElement.styles,
        [styleProp]: value,
      },
    });
  };
  
  const handlePositionChange = (positionProp: string, value: string) => {
    updateElement(currentId, {
      position: {
        ...currentElement.position,
        [positionProp]: value,
      },
    });
  };

  return (
    <div className="p-4 space-y-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="general">
          <AccordionTrigger>General</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={currentElement.label || ""}
                onChange={(e) => handleChange("label", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="helpText">Help Text</Label>
              <Input
                id="helpText"
                value={currentElement.helpText || ""}
                onChange={(e) => handleChange("helpText", e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="required"
                checked={currentElement.required || false}
                onCheckedChange={(checked) => handleChange("required", checked)}
              />
              <Label htmlFor="required">Required</Label>
            </div>
            
            {(currentElement.type === "text" ||
              currentElement.type === "textarea" ||
              currentElement.type === "email" ||
              currentElement.type === "password") && (
              <div className="space-y-2">
                <Label htmlFor="defaultValue">Default value</Label>
                {currentElement.type === "textarea" ? (
                  <Textarea
                    id="defaultValue"
                    value={(currentElement.defaultValue as string) || ""}
                    onChange={(e) => handleChange("defaultValue", e.target.value)}
                    placeholder="Enter default text"
                  />
                ) : (
                  <Input
                    id="defaultValue"
                    value={(currentElement.defaultValue as string) || ""}
                    onChange={(e) => handleChange("defaultValue", e.target.value)}
                    type={currentElement.type === "email" ? "email" : currentElement.type === "password" ? "password" : "text"}
                  />
                )}
              </div>
            )}
            
            {currentElement.type === "number" && (
              <div className="space-y-2">
                <Label htmlFor="defaultValue">Default value</Label>
                <Input
                  id="defaultValue"
                  value={(currentElement.defaultValue as string) || ""}
                  onChange={(e) => handleChange("defaultValue", e.target.value)}
                  type="number"
                />
              </div>
            )}

            {currentElement.type === "select" && (
              <div className="space-y-2">
                <Label htmlFor="options">Options</Label>
                {currentElement.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={option.label}
                      onChange={(e) => {
                        const newOptions = [...(currentElement.options || [])];
                        newOptions[index].label = e.target.value;
                        handleChange("options", newOptions);
                      }}
                      placeholder="Label"
                    />
                    <Input
                      value={option.value}
                      onChange={(e) => {
                        const newOptions = [...(currentElement.options || [])];
                        newOptions[index].value = e.target.value;
                        handleChange("options", newOptions);
                      }}
                      placeholder="Value"
                    />
                  </div>
                ))}
                <button
                  className="text-sm text-blue-500 hover:underline"
                  onClick={() => {
                    const newOptions = [...(currentElement.options || []), { label: "", value: "" }];
                    handleChange("options", newOptions);
                  }}
                >
                  Add Option
                </button>
              </div>
            )}

            {currentElement.type === "checkbox" && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="defaultChecked"
                  checked={currentElement.defaultChecked || false}
                  onCheckedChange={(checked) => handleChange("defaultChecked", checked)}
                />
                <Label htmlFor="defaultChecked">Default Checked</Label>
              </div>
            )}

            {currentElement.type === "radio" && (
              <div className="space-y-2">
                <Label>Options</Label>
                {currentElement.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={option.label}
                      onChange={(e) => {
                        const newOptions = [...(currentElement.options || [])];
                        newOptions[index].label = e.target.value;
                        handleChange("options", newOptions);
                      }}
                      placeholder="Label"
                    />
                    <Input
                      value={option.value}
                      onChange={(e) => {
                        const newOptions = [...(currentElement.options || [])];
                        newOptions[index].value = e.target.value;
                        handleChange("options", newOptions);
                      }}
                      placeholder="Value"
                    />
                  </div>
                ))}
                <button
                  className="text-sm text-blue-500 hover:underline"
                  onClick={() => {
                    const newOptions = [...(currentElement.options || []), { label: "", value: "" }];
                    handleChange("options", newOptions);
                  }}
                >
                  Add Option
                </button>
                <div className="space-y-2">
                  <Label htmlFor="defaultValue">Default Value</Label>
                  <Select
                    value={(currentElement.defaultValue as string) || ""}
                    onValueChange={(value) => handleChange("defaultValue", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentElement.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="styles">
          <AccordionTrigger>Styles</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Label htmlFor="textColor">Text Color</Label>
              <Input
                type="color"
                id="textColor"
                value={currentElement.styles?.textColor || ""}
                onChange={(e) => handleStyleChange("textColor", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Background Color</Label>
              <Input
                type="color"
                id="backgroundColor"
                value={currentElement.styles?.backgroundColor || ""}
                onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="borderWidth">Border Width</Label>
              <Input
                type="number"
                id="borderWidth"
                value={currentElement.styles?.borderWidth || ""}
                onChange={(e) => handleStyleChange("borderWidth", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="borderStyle">Border Style</Label>
              <Select
                value={currentElement.styles?.borderStyle || ""}
                onValueChange={(value) => handleStyleChange("borderStyle", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solid">Solid</SelectItem>
                  <SelectItem value="dashed">Dashed</SelectItem>
                  <SelectItem value="dotted">Dotted</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="borderColor">Border Color</Label>
              <Input
                type="color"
                id="borderColor"
                value={currentElement.styles?.borderColor || ""}
                onChange={(e) => handleStyleChange("borderColor", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="borderRadius">Border Radius</Label>
              <Input
                type="number"
                id="borderRadius"
                value={currentElement.styles?.borderRadius || ""}
                onChange={(e) => handleStyleChange("borderRadius", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paddingY">Padding Y</Label>
              <Input
                type="number"
                id="paddingY"
                value={currentElement.styles?.paddingY || ""}
                onChange={(e) => handleStyleChange("paddingY", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paddingX">Padding X</Label>
              <Input
                type="number"
                id="paddingX"
                value={currentElement.styles?.paddingX || ""}
                onChange={(e) => handleStyleChange("paddingX", e.target.value)}
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="marginY">Margin Y</Label>
              <Input
                type="number"
                id="marginY"
                value={currentElement.styles?.marginY || ""}
                onChange={(e) => handleStyleChange("marginY", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="marginX">Margin X</Label>
              <Input
                type="number"
                id="marginX"
                value={currentElement.styles?.marginX || ""}
                onChange={(e) => handleStyleChange("marginX", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fontWeight">Font Weight</Label>
              <Select
                value={currentElement.styles?.fontWeight || ""}
                onValueChange={(value) => handleStyleChange("fontWeight", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select font weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                  <SelectItem value="lighter">Lighter</SelectItem>
                  <SelectItem value="bolder">Bolder</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fontSize">Font Size</Label>
              <Input
                type="number"
                id="fontSize"
                value={currentElement.styles?.fontSize || ""}
                onChange={(e) => handleStyleChange("fontSize", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lineHeight">Line Height</Label>
              <Input
                type="number"
                id="lineHeight"
                value={currentElement.styles?.lineHeight || ""}
                onChange={(e) => handleStyleChange("lineHeight", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="letterSpacing">Letter Spacing</Label>
              <Input
                type="number"
                id="letterSpacing"
                value={currentElement.styles?.letterSpacing || ""}
                onChange={(e) => handleStyleChange("letterSpacing", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="opacity">Opacity</Label>
              <Input
                type="number"
                id="opacity"
                value={currentElement.styles?.opacity || ""}
                onChange={(e) => handleStyleChange("opacity", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shadow">Shadow</Label>
              <Select
                value={currentElement.styles?.shadow || "none"}
                onValueChange={(value) => handleStyleChange("shadow", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select shadow" />
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="position">
          <AccordionTrigger>Position</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Label htmlFor="positionType">Position Type</Label>
              <Select
                value={currentElement.position?.type || "static"}
                onValueChange={(value) => handlePositionChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select position type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="static">Static</SelectItem>
                  <SelectItem value="relative">Relative</SelectItem>
                  <SelectItem value="absolute">Absolute</SelectItem>
                  <SelectItem value="fixed">Fixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="top">Top</Label>
              <Input
                type="text"
                id="top"
                value={currentElement.position?.top || ""}
                onChange={(e) => handlePositionChange("top", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="right">Right</Label>
              <Input
                type="text"
                id="right"
                value={currentElement.position?.right || ""}
                onChange={(e) => handlePositionChange("right", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bottom">Bottom</Label>
              <Input
                type="text"
                id="bottom"
                value={currentElement.position?.bottom || ""}
                onChange={(e) => handlePositionChange("bottom", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="left">Left</Label>
              <Input
                type="text"
                id="left"
                value={currentElement.position?.left || ""}
                onChange={(e) => handlePositionChange("left", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zIndex">Z-Index</Label>
              <Input
                type="text"
                id="zIndex"
                value={currentElement.position?.zIndex || ""}
                onChange={(e) => handlePositionChange("zIndex", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="align">Align</Label>
              <Select
                value={currentElement.position?.align || ""}
                onValueChange={(value) => handlePositionChange("align", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select alignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gridColumn">Grid Column</Label>
              <Input
                type="text"
                id="gridColumn"
                value={currentElement.position?.gridColumn || ""}
                onChange={(e) => handlePositionChange("gridColumn", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gridRow">Grid Row</Label>
              <Input
                type="text"
                id="gridRow"
                value={currentElement.position?.gridRow || ""}
                onChange={(e) => handlePositionChange("gridRow", e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hideMobile"
                checked={currentElement.position?.hideMobile || false}
                onCheckedChange={(checked) => handlePositionChange("hideMobile", checked)}
              />
              <Label htmlFor="hideMobile">Hide on Mobile</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hideTablet"
                checked={currentElement.position?.hideTablet || false}
                onCheckedChange={(checked) => handlePositionChange("hideTablet", checked)}
              />
              <Label htmlFor="hideTablet">Hide on Tablet</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hideDesktop"
                checked={currentElement.position?.hideDesktop || false}
                onCheckedChange={(checked) => handlePositionChange("hideDesktop", checked)}
              />
              <Label htmlFor="hideDesktop">Hide on Desktop</Label>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="other">
          <AccordionTrigger>Other</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hidden"
                checked={currentElement.hidden || false}
                onCheckedChange={(checked) => handleChange("hidden", checked)}
              />
              <Label htmlFor="hidden">Hidden</Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PropertiesPanel;
