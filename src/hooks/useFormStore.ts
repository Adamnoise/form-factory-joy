
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { FormStore } from '../store/formActions';
import { createFormActions } from '../store/formActions';
import { initialFormState } from '../store/formInitialState';

// Re-export types for backward compatibility
export type { 
  FormElementType,
  FormElementStyle,
  FormElementPosition,
  FormElement
} from '../types/formTypes';

// Create the store with the initial state and actions
export const useFormStore = create<FormStore>((set, get) => ({
  ...initialFormState,
  canUndo: false,
  canRedo: false,
  ...createFormActions(set, get)
}));
