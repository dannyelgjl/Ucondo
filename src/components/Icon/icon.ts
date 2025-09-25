import { SvgProps } from 'react-native-svg';
import IconArrowDown from '../../assets/icon/icon-arrow-down.svg';
import IconDone from '../../assets/icon/icon-done.svg';
import IconPlus from '../../assets/icon/icon-plus.svg';
import IconTrash from '../../assets/icon/icon-trash.svg';
import IconArrowLeft from '../../assets/icon/icon-arrow-left.svg';
import IconSearch from '../../assets/icon/icon-search.svg';

import { ETypeIcon } from './types';

type TMapOptions = {
  [key in ETypeIcon]: React.FC<SvgProps>;
};

export const iconSelected: TMapOptions = {
  'icon-arrow-down': IconArrowDown,
  'icon-done': IconDone,
  'icon-plus': IconPlus,
  'icon-trash': IconTrash,
  'icon-arrow-left': IconArrowLeft,
  'icon-search': IconSearch,
};
