
import { StateCreator } from 'zustand';
import { FormElement, FormStoreState } from '../types/formTypes';

export interface FormActions {
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
}

export type FormStore = FormStoreState & FormActions;

export const createFormActions: StateCreator<FormStore, [], [], FormActions> = (set, get) => ({
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
});
