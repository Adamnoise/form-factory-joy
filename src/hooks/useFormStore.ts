
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
  | 'paragraph'
  | 'custom';

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
  code?: string;
  isFavorite?: boolean;
}

interface FormStore {
  elements: FormElement[];
  customComponents: FormElement[];
  favoriteComponents: string[]; // Array of component IDs
  currentId: string | null;
  addElement: (element: FormElement) => void;
  updateElement: (id: string, updates: Partial<FormElement>) => void;
  removeElement: (id: string) => void;
  setCurrentElement: (id: string | null) => void;
  reorderElements: (startIndex: number, endIndex: number) => void;
  addCustomComponent: (component: FormElement) => void;
  toggleFavorite: (componentId: string) => void;
  isFavorite: (componentId: string) => boolean;
}

export const useFormStore = create<FormStore>((set, get) => ({
  elements: [],
  customComponents: [],
  favoriteComponents: [],
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

  addCustomComponent: (component) =>
    set((state) => ({
      customComponents: [...state.customComponents, component]
    })),
    
  toggleFavorite: (componentId) =>
    set((state) => {
      if (state.favoriteComponents.includes(componentId)) {
        return { 
          favoriteComponents: state.favoriteComponents.filter(id => id !== componentId) 
        };
      } else {
        return { 
          favoriteComponents: [...state.favoriteComponents, componentId] 
        };
      }
    }),
    
  isFavorite: (componentId) => {
    return get().favoriteComponents.includes(componentId);
  },
}));
