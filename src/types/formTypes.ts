
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

export interface FormStoreState {
  elements: FormElement[];
  customComponents: FormElement[];
  favoriteComponents: string[]; // Array of component IDs
  currentId: string | null;
  history: FormElement[][];
  historyIndex: number;
}
