
import { create } from 'zustand';

export type FormElementType = 
  | 'text'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'number'
  | 'email'
  | 'password'
  | 'heading'
  | 'paragraph';

export interface FormElement {
  id: string;
  type: FormElementType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  defaultValue?: string | boolean | number;
  validations?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
}

interface FormStore {
  elements: FormElement[];
  currentId: string | null;
  addElement: (element: FormElement) => void;
  updateElement: (id: string, updates: Partial<FormElement>) => void;
  removeElement: (id: string) => void;
  setCurrentElement: (id: string | null) => void;
  reorderElements: (startIndex: number, endIndex: number) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  elements: [],
  currentId: null,
  
  addElement: (element) => 
    set((state) => ({ 
      elements: [...state.elements, element],
      currentId: element.id
    })),
  
  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((el) => 
        el.id === id ? { ...el, ...updates } : el
      ),
    })),
  
  removeElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      currentId: state.currentId === id ? null : state.currentId
    })),
  
  setCurrentElement: (id) =>
    set({ currentId: id }),
  
  reorderElements: (startIndex, endIndex) =>
    set((state) => {
      const newElements = [...state.elements];
      const [removed] = newElements.splice(startIndex, 1);
      newElements.splice(endIndex, 0, removed);
      return { elements: newElements };
    }),
}));
