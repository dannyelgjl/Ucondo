import { ExpenseItem } from '../../services/data';

export interface ExpenseListProps {
  onPress?: () => void;
  onDelete?: () => void;
  item: ExpenseItem;
}
