import { iconSelected } from './icon';

export interface IIconProps {
  icon?: keyof typeof iconSelected;
  size?: number;
  color?: string;
}

export enum ETypeIcon {
  ICON_ARROW_DOWN = 'icon-arrow-down',
  ICON_TRASH = 'icon-trash',
  ICON_PLUS = 'icon-plus',
  ICON_DONE = 'icon-done',
  ICON_ARROW_LEFT = 'icon-arrow-left',
  ICON_SEARCH = 'icon-search',
}
