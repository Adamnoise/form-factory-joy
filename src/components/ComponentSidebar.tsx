
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Heading1, Heading2, Heading3, PanelRight, AlignLeft, Minus,
  SeparatorHorizontal, Star, StarOff, Component, Search, Plus
} from 'lucide-react';
import { useFormStore } from '@/hooks/useFormStore';
import AddComponentDialog from './AddComponentDialog';

interface ComponentSidebarProps {
  onElementDrop: (type: string, label: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface ComponentProps {
  id: string;
  type: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const ComponentSidebar = ({ onElementDrop, activeTab, setActiveTab }: ComponentSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toggleFavorite, isFavorite, addCustomComponent } = useFormStore();

  const shadcnComponents: ComponentProps[] = [
    { id: 'accordion', type: 'accordion', label: 'Accordion', description: 'Vertically collapsible content', icon: <Component className="h-5 w-5" /> },
    { id: 'alert', type: 'alert', label: 'Alert', description: 'Displays important message', icon: <Component className="h-5 w-5" /> },
    { id: 'alert-dialog', type: 'alert-dialog', label: 'Alert Dialog', description: 'Interruptive modal dialogs', icon: <Component className="h-5 w-5" /> },
    { id: 'aspect-ratio', type: 'aspect-ratio', label: 'Aspect Ratio', description: 'Maintains consistent ratio', icon: <Component className="h-5 w-5" /> },
    { id: 'avatar', type: 'avatar', label: 'Avatar', description: 'Image element with fallback', icon: <Component className="h-5 w-5" /> },
    { id: 'badge', type: 'badge', label: 'Badge', description: 'Small status descriptor', icon: <Component className="h-5 w-5" /> },
    { id: 'breadcrumb', type: 'breadcrumb', label: 'Breadcrumb', description: 'Navigation hierarchy', icon: <Component className="h-5 w-5" /> },
    { id: 'button', type: 'button', label: 'Button', description: 'Interactive button element', icon: <Component className="h-5 w-5" /> },
    { id: 'calendar', type: 'calendar', label: 'Calendar', description: 'Date display and selection', icon: <Component className="h-5 w-5" /> },
    { id: 'card', type: 'card', label: 'Card', description: 'Container with header & footer', icon: <Component className="h-5 w-5" /> },
    { id: 'carousel', type: 'carousel', label: 'Carousel', description: 'Cycling through elements', icon: <Component className="h-5 w-5" /> },
    { id: 'chart', type: 'chart', label: 'Chart', description: 'Data visualization element', icon: <Component className="h-5 w-5" /> },
    { id: 'checkbox', type: 'checkbox', label: 'Checkbox', description: 'Selectable input control', icon: <Component className="h-5 w-5" /> },
    { id: 'collapsible', type: 'collapsible', label: 'Collapsible', description: 'Sections that expand/collapse', icon: <Component className="h-5 w-5" /> },
    { id: 'combobox', type: 'combobox', label: 'Combobox', description: 'Input with suggestions', icon: <Component className="h-5 w-5" /> },
    { id: 'command', type: 'command', label: 'Command', description: 'Command palette interface', icon: <Component className="h-5 w-5" /> },
    { id: 'context-menu', type: 'context-menu', label: 'Context Menu', description: 'Right-click menu options', icon: <Component className="h-5 w-5" /> },
    { id: 'data-table', type: 'data-table', label: 'Data Table', description: 'Tabular data display', icon: <Component className="h-5 w-5" /> },
    { id: 'date-picker', type: 'date-picker', label: 'Date Picker', description: 'Date selection interface', icon: <Component className="h-5 w-5" /> },
    { id: 'dialog', type: 'dialog', label: 'Dialog', description: 'Modal window overlay', icon: <Component className="h-5 w-5" /> },
    { id: 'drawer', type: 'drawer', label: 'Drawer', description: 'Side panel overlay', icon: <Component className="h-5 w-5" /> },
    { id: 'dropdown-menu', type: 'dropdown-menu', label: 'Dropdown Menu', description: 'Menu with nested items', icon: <Component className="h-5 w-5" /> },
    { id: 'form', type: 'form', label: 'Form', description: 'Input collection container', icon: <Component className="h-5 w-5" /> },
    { id: 'hover-card', type: 'hover-card', label: 'Hover Card', description: 'Preview card on hover', icon: <Component className="h-5 w-5" /> },
    { id: 'input', type: 'input', label: 'Input', description: 'Text input field', icon: <Component className="h-5 w-5" /> },
    { id: 'input-otp', type: 'input-otp', label: 'Input OTP', description: 'One-time password input', icon: <Component className="h-5 w-5" /> },
    { id: 'label', type: 'label', label: 'Label', description: 'Form field label', icon: <Component className="h-5 w-5" /> },
    { id: 'menubar', type: 'menubar', label: 'Menubar', description: 'Menu with submenus', icon: <Component className="h-5 w-5" /> },
    { id: 'navigation-menu', type: 'navigation-menu', label: 'Navigation Menu', description: 'Site navigation component', icon: <Component className="h-5 w-5" /> },
    { id: 'pagination', type: 'pagination', label: 'Pagination', description: 'Page navigation controls', icon: <Component className="h-5 w-5" /> },
    { id: 'popover', type: 'popover', label: 'Popover', description: 'Floating content panel', icon: <Component className="h-5 w-5" /> },
    { id: 'progress', type: 'progress', label: 'Progress', description: 'Progress indicator', icon: <Component className="h-5 w-5" /> },
    { id: 'radio-group', type: 'radio-group', label: 'Radio Group', description: 'Exclusive selection controls', icon: <Component className="h-5 w-5" /> },
    { id: 'resizable', type: 'resizable', label: 'Resizable', description: 'Resize container panels', icon: <Component className="h-5 w-5" /> },
    { id: 'scroll-area', type: 'scroll-area', label: 'Scroll Area', description: 'Custom scrollbar container', icon: <Component className="h-5 w-5" /> },
    { id: 'select', type: 'select', label: 'Select', description: 'Dropdown selection control', icon: <Component className="h-5 w-5" /> },
    { id: 'separator', type: 'separator', label: 'Separator', description: 'Visual divider element', icon: <Component className="h-5 w-5" /> },
    { id: 'sheet', type: 'sheet', label: 'Sheet', description: 'Side panel component', icon: <Component className="h-5 w-5" /> },
    { id: 'sidebar', type: 'sidebar', label: 'Sidebar', description: 'Side navigation panel', icon: <Component className="h-5 w-5" /> },
    { id: 'skeleton', type: 'skeleton', label: 'Skeleton', description: 'Loading placeholder', icon: <Component className="h-5 w-5" /> },
    { id: 'slider', type: 'slider', label: 'Slider', description: 'Range selection control', icon: <Component className="h-5 w-5" /> },
    { id: 'sonner', type: 'sonner', label: 'Sonner', description: 'Toast notification system', icon: <Component className="h-5 w-5" /> },
    { id: 'switch', type: 'switch', label: 'Switch', description: 'Toggle control', icon: <Component className="h-5 w-5" /> },
    { id: 'table', type: 'table', label: 'Table', description: 'Tabular data layout', icon: <Component className="h-5 w-5" /> },
    { id: 'tabs', type: 'tabs', label: 'Tabs', description: 'Tabbed content interface', icon: <Component className="h-5 w-5" /> },
    { id: 'textarea', type: 'textarea', label: 'Textarea', description: 'Multi-line text input', icon: <Component className="h-5 w-5" /> },
    { id: 'toast', type: 'toast', label: 'Toast', description: 'Brief notification', icon: <Component className="h-5 w-5" /> },
    { id: 'toggle', type: 'toggle', label: 'Toggle', description: 'Two-state button', icon: <Component className="h-5 w-5" /> },
    { id: 'toggle-group', type: 'toggle-group', label: 'Toggle Group', description: 'Group of toggles', icon: <Component className="h-5 w-5" /> },
    { id: 'tooltip', type: 'tooltip', label: 'Tooltip', description: 'Contextual information', icon: <Component className="h-5 w-5" /> },
  ];

  const baseComponents: ComponentProps[] = [
    {
      id: 'heading1',
      type: 'heading',
      label: 'Title',
      description: 'Large heading for sections',
      icon: <Heading1 className="h-5 w-5" />
    },
    {
      id: 'heading2',
      type: 'heading',
      label: 'Subtitle',
      description: 'Secondary heading',
      icon: <Heading2 className="h-5 w-5" />
    },
    {
      id: 'heading3',
      type: 'heading',
      label: 'Heading',
      description: 'Section heading',
      icon: <Heading3 className="h-5 w-5" />
    },
    {
      id: 'paragraph',
      type: 'paragraph',
      label: 'Paragraph',
      description: 'Text paragraph',
      icon: <AlignLeft className="h-5 w-5" />
    },
    {
      id: 'divider',
      type: 'heading',
      label: 'Divider',
      description: 'Horizontal divider',
      icon: <Minus className="h-5 w-5" />
    },
    {
      id: 'separator',
      type: 'heading',
      label: 'Separator',
      description: 'Section separator',
      icon: <SeparatorHorizontal className="h-5 w-5" />
    },
    {
      id: 'text',
      type: 'text',
      label: 'Text Input',
      description: 'Basic text input',
      icon: <PanelRight className="h-5 w-5" />
    },
    {
      id: 'textarea',
      type: 'textarea',
      label: 'Text Area',
      description: 'Multiline text input',
      icon: <PanelRight className="h-5 w-5" />
    },
    {
      id: 'select',
      type: 'select',
      label: 'Select',
      description: 'Dropdown selection',
      icon: <PanelRight className="h-5 w-5" />
    },
    {
      id: 'checkbox',
      type: 'checkbox',
      label: 'Checkbox',
      description: 'Boolean checkbox',
      icon: <PanelRight className="h-5 w-5" />
    },
    {
      id: 'radio',
      type: 'radio',
      label: 'Radio Buttons',
      description: 'Radio button group',
      icon: <PanelRight className="h-5 w-5" />
    }
  ];

  // Combine all components
  const allComponents = [...baseComponents, ...shadcnComponents];
  
  // Get favorites
  const favoriteComponents = allComponents.filter(component => isFavorite(component.id));
  
  // Filter components based on search query
  const filteredComponents = searchQuery 
    ? allComponents.filter(component => 
        component.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allComponents;

  const handleComponentClick = (component: ComponentProps) => {
    onElementDrop(component.type, component.label);
  };

  const handleToggleFavorite = (e: React.MouseEvent, componentId: string) => {
    e.stopPropagation();
    toggleFavorite(componentId);
  };

  const handleAddCustomComponent = (component: any) => {
    addCustomComponent(component);
  };

  const ComponentItem = ({ component }: { component: ComponentProps }) => (
    <Card 
      className="p-3 cursor-grab hover:bg-accent flex items-start gap-3 mb-2 relative"
      onClick={() => handleComponentClick(component)}
    >
      <div className="rounded-md bg-muted p-2 flex items-center justify-center">
        {component.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium">{component.label}</h3>
        <p className="text-xs text-muted-foreground">{component.description}</p>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-2 right-2 h-6 w-6"
        onClick={(e) => handleToggleFavorite(e, component.id)}
      >
        {isFavorite(component.id) ? (
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ) : (
          <StarOff className="h-4 w-4" />
        )}
      </Button>
    </Card>
  );

  return (
    <div className="flex flex-col h-full border-r bg-background p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Components</h2>
        <AddComponentDialog onAddComponent={handleAddCustomComponent} />
      </div>
      
      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search components..." 
          className="w-full pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="favorite">Favorites</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="ui">UI</TabsTrigger>
        </TabsList>
        
        <ScrollArea className="flex-1">
          <TabsContent value="all" className="mt-0 space-y-1">
            {filteredComponents.map((component) => (
              <ComponentItem key={component.id} component={component} />
            ))}
          </TabsContent>
          
          <TabsContent value="favorite" className="mt-0 space-y-1">
            {favoriteComponents.length > 0 ? (
              favoriteComponents.map((component) => (
                <ComponentItem key={component.id} component={component} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Star className="h-8 w-8 mx-auto mb-2 opacity-20" />
                <p>No favorite components yet.</p>
                <p className="text-sm">Click the star icon on any component to add it to favorites.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="layout" className="mt-0 space-y-1">
            {baseComponents.slice(0, 6).map((component) => (
              <ComponentItem key={component.id} component={component} />
            ))}
          </TabsContent>
          
          <TabsContent value="input" className="mt-0 space-y-1">
            {baseComponents.slice(6, 11).map((component) => (
              <ComponentItem key={component.id} component={component} />
            ))}
          </TabsContent>
          
          <TabsContent value="ui" className="mt-0 space-y-1">
            {shadcnComponents.map((component) => (
              <ComponentItem key={component.id} component={component} />
            ))}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default ComponentSidebar;
