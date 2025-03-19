
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
  | 'custom'
  // Adding shadcn/ui components
  | 'accordion'
  | 'alert'
  | 'alert-dialog'
  | 'aspect-ratio'
  | 'avatar'
  | 'badge'
  | 'breadcrumb'
  | 'button'
  | 'calendar'
  | 'card'
  | 'carousel'
  | 'chart'
  | 'collapsible'
  | 'combobox'
  | 'command'
  | 'context-menu'
  | 'data-table'
  | 'date-picker'
  | 'dialog'
  | 'drawer'
  | 'dropdown-menu'
  | 'form'
  | 'hover-card'
  | 'input-otp'
  | 'menubar'
  | 'navigation-menu'
  | 'pagination'
  | 'popover'
  | 'progress'
  | 'radio-group'
  | 'resizable'
  | 'scroll-area'
  | 'separator'
  | 'sheet'
  | 'sidebar'
  | 'skeleton'
  | 'slider'
  | 'sonner'
  | 'switch'
  | 'table'
  | 'tabs'
  | 'toast'
  | 'toggle'
  | 'toggle-group'
  | 'tooltip';

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
    step?: number;
    customValidation?: string;
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
  };
  code?: string;
  isFavorite?: boolean;
  
  // New properties
  width?: string;
  customWidth?: string;
  customWidthUnit?: string;
  size?: string;
  labelPosition?: string;
  customClass?: string;
  hidden?: boolean;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  styles?: {
    textColor?: string;
    backgroundColor?: string;
    borderWidth?: string;
    borderStyle?: string;
    borderColor?: string;
    borderRadius?: string;
    paddingY?: string;
    paddingX?: string;
    marginY?: string;
    marginX?: string;
    fontWeight?: string;
    fontSize?: string;
    lineHeight?: string;
    letterSpacing?: string;
    opacity?: string;
    shadow?: string;
  };
  position?: {
    type?: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    zIndex?: string;
    align?: string;
    gridColumn?: string;
    gridRow?: string;
    hideMobile?: boolean;
    hideTablet?: boolean;
    hideDesktop?: boolean;
  };
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
