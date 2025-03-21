
import React from 'react';
import { Search, Plus, Layout, RefreshCw, Star, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const ElementSidebar = () => {
  const elements = [
    { id: 'divider', name: 'Divider', icon: '───' },
    { id: 'divider-basic', name: 'Divider Basic', icon: '···' },
    { id: 'placeholder', name: 'Placeholder', icon: '□' },
    { id: 'spacer', name: 'Spacer', icon: '↕' },
    { id: 'accordion', name: 'Accordion', icon: '≡' },
    { id: 'article', name: 'Article box', icon: '⧉' },
    { id: 'banner', name: 'Banner box', icon: '▭', isNew: true },
    { id: 'before-after', name: 'Before After', icon: '◨|◧' },
    { id: 'blockquote', name: 'Blockquote', icon: '❝❞' },
    { id: 'blog', name: 'Blog', icon: '≡≡' },
    { id: 'blog-news', name: 'Blog News', icon: '⛾' },
    { id: 'blog-slider', name: 'Blog Slider', icon: '⧠⧠' },
  ];

  // Create a draggable element for the form-element
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'form-element',
    data: {
      type: 'element',
    },
  });

  const style = transform ? {
    transform: CSS.Transform.toString(transform),
  } : undefined;

  return (
    <div className="w-[280px] bg-[#F5F5F5] h-full flex flex-col">
      {/* Header with gradient */}
      <div className="h-[60px] bg-gradient-to-r from-[#A8E6CF] to-[#FFD54F] px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="rounded-full bg-white/20 hover:bg-white/30">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-white/20 hover:bg-white/30">
            <Layout className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-white/20 hover:bg-white/30">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="rounded-full bg-[#FFD54F] hover:bg-[#FFC107] px-3">
            <Settings className="h-4 w-4 mr-1" />
            SETTINGS
          </Button>
        </div>
      </div>

      {/* Add element section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium text-gray-800">Add Element</span>
          <div className="flex items-center">
            <span className="text-sm mr-2">All</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search"
            className="pl-10 bg-white border-gray-200"
          />
        </div>
      </div>

      {/* Favourite elements section */}
      <Collapsible className="w-full" defaultOpen={true}>
        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 text-sm hover:bg-gray-100">
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-gray-500" />
            <span className="font-medium text-gray-800">Favourite elements</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4 text-center text-gray-500 italic">
            [THIS IS SIDEBAR]
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator className="my-1 bg-gray-200" />

      {/* Elements grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {elements.map((element) => (
            <Card 
              key={element.id}
              ref={setNodeRef}
              {...attributes}
              {...listeners}
              style={style}
              className="p-3 flex flex-col items-center justify-center h-[100px] hover:bg-[#E0F7FA] transition-colors cursor-grab border-dashed border-gray-300 relative"
              data-element-type={element.id}
            >
              <div className="text-2xl text-gray-400 mb-2">{element.icon}</div>
              <div className="text-xs text-center flex items-center">
                <span className="text-gray-600">{element.name}</span>
                {element.isNew && (
                  <Badge className="ml-1 bg-[#FF4081] text-[10px] h-4">New</Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElementSidebar;
