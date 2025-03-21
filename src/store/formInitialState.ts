
import { FormStoreState } from '../types/formTypes';

export const initialFormState: FormStoreState = {
  elements: [],
  customComponents: [],
  favoriteComponents: [],
  currentId: null,
  history: [[]],
  historyIndex: 0,
  canUndo: false,
  canRedo: false
};
