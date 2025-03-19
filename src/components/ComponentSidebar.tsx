
import React from 'react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Heading1, Heading2, Heading3, PanelRight, 
  AlignLeft, Minus, SeparatorHorizontal, Component 
} from 'lucide-react';

interface ComponentSidebarProps {
  onElementDrop: (type: string, label: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface ComponentProps {
  type: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const ComponentSidebar = ({ onElementDrop, activeTab, setActiveTab }: ComponentSidebarProps) => {
  const allComponents: ComponentProps[] = [
    {
      type: 'heading',
      label: 'Title',
      description: 'Large heading for sections',
      icon: <Heading1 className="h-5 w-5" />
    },
    {
      type: 'heading',
      label: 'Subtitle',
      description: 'Secondary heading',
      icon: <Heading2 className="h-5 w-5" />
    },
    {
      type: 'heading',
      label: 'Heading',
      description: 'Section heading',
      icon: <Heading3 className="h-5 w-5" />
    },
    {
      type: 'paragraph',
      label: 'Paragraph',
      description: 'Text paragraph',
      icon: <AlignLeft className="h-5 w-5" />
    },
    {
      type: 'heading',
      label: 'Divider',
      description: 'Horizontal divider',
      icon: <Minus className="h-5 w-5" />
    },
    {
      type: 'heading',
      label: 'Separator',
      description: 'Section separator',
      icon: <SeparatorHorizontal className="h-5 w-5" />
    },
    {
      type: 'text',
      label: 'Text Input',
      description: 'Basic text input',
      icon: <PanelRight className="h-5 w-5" />
    },
    {
      type: 'textarea',
      label: 'Text Area',
      description: 'Multiline text input',
      icon: <PanelRight className="h-5 w-5" />
    },
    {
      type: 'select',
      label: 'Select',
      description: 'Dropdown selection',
      icon: <PanelRight className="h-5 w-5" />
    },
    {
      type: 'checkbox',
      label: 'Checkbox',
      description: 'Boolean checkbox',
      icon: <PanelRight className="h-5 w-5" />
    },
    {
      type: 'radio',
      label: 'Radio Buttons',
      description: 'Radio button group',
      icon: <PanelRight className="h-5 w-5" />
    }
  ];

  const layoutComponents = allComponents.slice(0, 6);
  const inputComponents = allComponents.slice(6, 11);
  const uiComponents: ComponentProps[] = [];

  const handleComponentClick = (component: ComponentProps) => {
    onElementDrop(component.type, component.label);
  };

  const ComponentItem = ({ component }: { component: ComponentProps }) => (
    <Card 
      className="p-3 cursor-grab hover:bg-accent flex items-start gap-3 mb-2"
      onClick={() => handleComponentClick(component)}
    >
      <div className="rounded-md bg-muted p-2 flex items-center justify-center">
        {component.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium">{component.label}</h3>
        <p className="text-xs text-muted-foreground">{component.description}</p>
      </div>
    </Card>
  );

  return (
    <div className="flex flex-col h-full border-r bg-background p-4">
      <h2 className="text-lg font-medium mb-4">Components</h2>
      
      <div className="relative mb-4">
        <Input 
          placeholder="Search components..." 
          className="w-full"
        />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="ui">UI</TabsTrigger>
        </TabsList>
        
        <ScrollArea className="flex-1">
          <TabsContent value="all" className="mt-0 space-y-1">
            {allComponents.map((component, index) => (
              <ComponentItem key={index} component={component} />
            ))}
          </TabsContent>
          
          <TabsContent value="layout" className="mt-0 space-y-1">
            {layoutComponents.map((component, index) => (
              <ComponentItem key={index} component={component} />
            ))}
          </TabsContent>
          
          <TabsContent value="input" className="mt-0 space-y-1">
            {inputComponents.map((component, index) => (
              <ComponentItem key={index} component={component} />
            ))}
          </TabsContent>
          
          <TabsContent value="ui" className="mt-0 space-y-1">
            {uiComponents.map((component, index) => (
              <ComponentItem key={index} component={component} />
            ))}
          </TabsContent>
        </ScrollArea>
      </Tabs>
      
      <div className="mt-4 border-t pt-4">
        <Button className="w-full flex items-center gap-2" variant="outline">
          <Component className="h-4 w-4" />
          Custom Component
        </Button>
      </div>
    </div>
  );
};

export default ComponentSidebar;
