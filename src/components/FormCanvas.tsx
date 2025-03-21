
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useFormStore } from "@/hooks/useFormStore";
import FormElementRenderer from "./FormElementRenderer";
import { cn } from "@/lib/utils";

interface FormCanvasProps {
  preview?: boolean;
  gridEnabled?: boolean;
  gridColumns?: number;
  gridRows?: number;
}

const FormCanvas = ({ 
  preview = false,
  gridEnabled = false,
  gridColumns = 2,
  gridRows = 2
}: FormCanvasProps) => {
  const { elements, currentId, setCurrentElement } = useFormStore();
  const { setNodeRef: setDroppableRef } = useDroppable({ id: "form-canvas" });

  // Generate CSS Grid template based on settings
  const getGridTemplateStyle = () => {
    if (!gridEnabled) return {};
    
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
      gridTemplateRows: `repeat(${gridRows}, minmax(100px, auto))`,
      gap: '1rem'
    };
  };

  // Apply element's grid position if available
  const getElementGridStyle = (element: any) => {
    if (!gridEnabled) return {};
    
    const position = element.position || {};
    const style: React.CSSProperties = {};
    
    if (position.gridColumn) {
      style.gridColumn = position.gridColumn;
    }
    
    if (position.gridRow) {
      style.gridRow = position.gridRow;
    }
    
    return style;
  };

  if (elements.length === 0) {
    return (
      <div 
        ref={!preview ? setDroppableRef : undefined}
        className="h-full flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50"
        style={getGridTemplateStyle()}
      >
        <p className="text-gray-500 text-center">
          Drag and drop components from the sidebar to start building your form
        </p>
      </div>
    );
  }

  return (
    <div 
      ref={!preview ? setDroppableRef : undefined}
      className="min-h-[300px] bg-white rounded-lg shadow-sm"
      style={getGridTemplateStyle()}
    >
      {elements.map((element) => (
        <SortableElement
          key={element.id}
          id={element.id}
          preview={preview}
          isSelected={currentId === element.id}
          onSelect={() => !preview && setCurrentElement(element.id)}
          gridEnabled={gridEnabled}
          gridStyle={getElementGridStyle(element)}
        >
          <FormElementRenderer element={element} />
        </SortableElement>
      ))}
    </div>
  );
};

interface SortableElementProps {
  id: string;
  children: React.ReactNode;
  isSelected: boolean;
  preview: boolean;
  onSelect: () => void;
  gridEnabled?: boolean;
  gridStyle?: React.CSSProperties;
}

const SortableElement = ({
  id,
  children,
  isSelected,
  preview,
  onSelect,
  gridEnabled,
  gridStyle = {},
}: SortableElementProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...gridStyle
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(preview ? {} : listeners)}
      className={cn(
        "relative p-2 rounded border-2 cursor-pointer",
        isSelected && !preview
          ? "border-blue-500 shadow-sm"
          : "border-transparent hover:border-gray-200",
        isDragging && "opacity-50",
        gridEnabled ? "m-0" : "mb-4"
      )}
      onClick={onSelect}
    >
      {children}
      
      {/* Apply element styles if available */}
      {isSelected && !preview && gridEnabled && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-1 rounded-bl">
          {gridStyle.gridColumn && `Col: ${gridStyle.gridColumn}`}
          {gridStyle.gridRow && gridStyle.gridColumn && ' | '}
          {gridStyle.gridRow && `Row: ${gridStyle.gridRow}`}
        </div>
      )}
    </div>
  );
};

export default FormCanvas;
