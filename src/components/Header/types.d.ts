import { ETypeIcon } from '../Icon/types';

export interface HeaderProps {
  title: string;
  onPress?: () => void;
  onRegister?: () => void;
  iconType?: ETypeIcon;
  showInput?: boolean;
  onChangeText?: (text: string) => void;
  value?: string;
}
