
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useFormStore } from "@/hooks/useFormStore";
import FormElementRenderer from "./FormElementRenderer";
import { cn } from "@/lib/utils";

interface FormCanvasProps {
  preview?: boolean;
}

const FormCanvas = ({ preview = false }: FormCanvasProps) => {
  const { elements, currentId, setCurrentElement } = useFormStore();
  const { setNodeRef: setDroppableRef } = useDroppable({ id: "form-canvas" });

  if (elements.length === 0) {
    return (
      <div 
        ref={!preview ? setDroppableRef : undefined}
        className="h-full flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50"
      >
        <p className="text-gray-500 text-center">
          Drag and drop form elements here to start building your form
        </p>
      </div>
    );
  }

  return (
    <div 
      ref={!preview ? setDroppableRef : undefined}
      className="space-y-4 p-4 min-h-[300px]"
    >
      {elements.map((element) => (
        <SortableElement
          key={element.id}
          id={element.id}
          preview={preview}
          isSelected={currentId === element.id}
          onSelect={() => !preview && setCurrentElement(element.id)}
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
}

const SortableElement = ({
  id,
  children,
  isSelected,
  preview,
  onSelect,
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
        isDragging && "opacity-50"
      )}
      onClick={onSelect}
    >
      {children}
    </div>
  );
};

export default FormCanvas;
