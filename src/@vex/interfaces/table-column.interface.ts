

export interface TableColumn<T> {
  label: string;
  property: keyof T | string;
<<<<<<< HEAD
  type: 'text' | 'textTruncate' | 'identificador' | 'image' | 'badge' | 'progress' | 'checkbox' | 'button' | 'periodo' | 'date' | 'datetime' | 'clickButton' | 'currency' | 'byteConversion' | 'buttonGroup';
=======
  type: 'text' | 'textTruncate' | 'identificador' |  'image' | 'badge' | 'progress' | 'checkbox' | 'button' | 'periodo' | 'date' | 'datetime' | 'clickButton' | 'currency' | 'byteConversion' | 'buttonGroup';
>>>>>>> e0664263d11314e8f664651cb4cbabeb43705b90
  buttonItems?: buttonItems<T>[];
  visible?: boolean;
  cssClasses?: string[];
}
  
export interface buttonItems<T> {
    buttonLabel: string;
    buttonAction: string;
    disable?: keyof T | boolean;
    visible?: boolean;
    buttonCondition?:string;
}