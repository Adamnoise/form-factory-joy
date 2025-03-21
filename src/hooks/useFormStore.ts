
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

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

interface FormStoreState {
  elements: FormElement[];
  customComponents: FormElement[];
  favoriteComponents: string[]; // Array of component IDs
  currentId: string | null;
  history: FormElement[][];
  historyIndex: number;
}

interface FormStore extends FormStoreState {
  addElement: (element: FormElement) => void;
  updateElement: (id: string, updates: Partial<FormElement>) => void;
  removeElement: (id: string) => void;
  setCurrentElement: (id: string | null) => void;
  reorderElements: (startIndex: number, endIndex: number) => void;
  addCustomComponent: (component: FormElement) => void;
  toggleFavorite: (componentId: string) => void;
  isFavorite: (componentId: string) => boolean;
  setElements: (elements: FormElement[]) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const useFormStore = create<FormStore>((set, get) => ({
  elements: [],
  customComponents: [],
  favoriteComponents: [],
  currentId: null,
  history: [[]],
  historyIndex: 0,
  canUndo: false,
  canRedo: false,
  
  addElement: (element) => 
    set((state) => {
      const newElements = [...state.elements, element];
      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newElements];
      return { 
        elements: newElements,
        currentId: element.id,
        history: newHistory,
        historyIndex: newHistory.length - 1,
        canUndo: true,
        canRedo: false
      };
    }),
  
  updateElement: (id, updates) =>
    set((state) => {
      const newElements = state.elements.map((el) => 
        el.id === id ? { ...el, ...updates } : el
      );
      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newElements];
      return {
        elements: newElements,
        history: newHistory,
        historyIndex: newHistory.length - 1,
        canUndo: true,
        canRedo: false
      };
    }),
  
  removeElement: (id) =>
    set((state) => {
      const newElements = state.elements.filter((el) => el.id !== id);
      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newElements];
      return {
        elements: newElements,
        currentId: state.currentId === id ? null : state.currentId,
        history: newHistory,
        historyIndex: newHistory.length - 1,
        canUndo: true,
        canRedo: false
      };
    }),
  
  setCurrentElement: (id) =>
    set({ currentId: id }),
  
  reorderElements: (startIndex, endIndex) =>
    set((state) => {
      const newElements = [...state.elements];
      const [removed] = newElements.splice(startIndex, 1);
      newElements.splice(endIndex, 0, removed);
      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newElements];
      return { 
        elements: newElements,
        history: newHistory,
        historyIndex: newHistory.length - 1,
        canUndo: true,
        canRedo: false
      };
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

  setElements: (elements) =>
    set((state) => {
      const newHistory = [...state.history.slice(0, state.historyIndex + 1), elements];
      return {
        elements,
        history: newHistory,
        historyIndex: newHistory.length - 1,
        canUndo: true,
        canRedo: false
      };
    }),

  undo: () =>
    set((state) => {
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1;
        return {
          elements: state.history[newIndex],
          historyIndex: newIndex,
          canUndo: newIndex > 0,
          canRedo: true
        };
      }
      return state;
    }),

  redo: () =>
    set((state) => {
      if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1;
        return {
          elements: state.history[newIndex],
          historyIndex: newIndex,
          canUndo: true,
          canRedo: newIndex < state.history.length - 1
        };
      }
      return state;
    }),
}));
