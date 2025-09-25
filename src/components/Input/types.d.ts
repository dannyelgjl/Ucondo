import { KeyboardType } from 'react-native';
import { ETypeIcon } from '../Icon/types';

export interface IInputProfileProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  icon?: ETypeIcon;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: KeyboardType;
  error?: boolean;
  errorMessage?: string;
  editable?: boolean;
  mb?: number;
  mt?: number;
}
