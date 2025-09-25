import { useTheme } from 'styled-components/native';
import { getTitleColor } from '../../utils/format';
import { ExpenseListProps } from './types';

export const useContainer = (_: ExpenseListProps) => {
  const theme = useTheme();
  const color = getTitleColor(_.item.code, theme);

  return { color };
};
