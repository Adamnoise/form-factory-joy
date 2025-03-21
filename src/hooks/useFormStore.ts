import { create } from 'zustand';

export type FormElementType = 
  'text' | 'email' | 'password' | 'number' | 'date' | 
  'textarea' | 'select' | 'checkbox' | 'radio' | 
  'heading' | 'paragraph' | 'custom' |
  'accordion' | 'alert' | 'alert-dialog' | 'aspect-ratio' |
  'avatar' | 'badge' | 'breadcrumb' | 'button' | 'calendar' |
  'card' | 'carousel' | 'chart' | 'collapsible' | 'combobox' |
  'command' | 'context-menu' | 'data-table' | 'date-picker' |
  'dialog' | 'drawer' | 'dropdown-menu' | 'form' |
  'hover-card' | 'input-otp' | 'menubar' | 'navigation-menu' |
  'pagination' | 'popover' | 'progress' | 'radio-group' |
  'resizable' | 'scroll-area' | 'separator' | 'sheet' |
  'sidebar' | 'skeleton' | 'slider' | 'sonner' | 'switch' |
  'table' | 'tabs' | 'toast' | 'toggle' | 'toggle-group' |
  'tooltip';

export interface FormElementStyle {
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
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface FormElementPosition {
  type?: 'static' | 'relative' | 'absolute' | 'fixed';
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: string;
  align?: 'left' | 'center' | 'right';
  gridColumn?: string;
  gridRow?: string;
  hideMobile?: boolean;
  hideTablet?: boolean;
  hideDesktop?: boolean;
}

export interface FormElement {
  id: string;
  type: FormElementType;
  label?: string;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  defaultValue?: string | boolean;
  defaultChecked?: boolean;
  code?: string;
  customClass?: string;
  width?: 'full' | 'medium' | 'small' | 'tiny' | 'custom';
  customWidth?: string;
  customWidthUnit?: 'px' | '%' | 'rem' | 'em';
  size?: 'xs' | 'small' | 'default' | 'large' | 'xl';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  labelPosition?: 'top' | 'left' | 'right' | 'bottom' | 'hidden';
  styles?: FormElementStyle;
  position?: FormElementPosition;
  hidden?: boolean;
  checkboxPosition?: 'left' | 'right';
  buttonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  buttonType?: 'button' | 'submit' | 'reset';
  icon?: string;
  iconPosition?: 'left' | 'right';
  maxLength?: number;
  minLength?: number;
  min?: number;
  max?: number;
  step?: number;
  inputMode?: 'text' | 'tel' | 'email' | 'url' | 'search';
  autocomplete?: string;
  rows?: number;
  resizable?: 'none' | 'vertical' | 'horizontal' | 'both';
  pattern?: string;
  customValidation?: string;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
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
