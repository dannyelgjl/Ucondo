import { Icon } from '../Icon';
import { ETypeIcon } from '../Icon/types';
import * as S from './styles';
import { ExpenseListProps } from './types';

const ExpenseList = ({ item, onPress, onDelete }: ExpenseListProps) => (
  <S.Container onPress={onPress}>
    <S.Title>
      {item.code} - {item.name}
    </S.Title>

    <S.ButtonTrash onPress={onDelete}>
      <Icon icon={ETypeIcon.ICON_TRASH} size={20} />
    </S.ButtonTrash>
  </S.Container>
);

export default ExpenseList;
