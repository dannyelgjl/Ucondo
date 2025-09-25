import { Icon } from '../Icon';
import { ETypeIcon } from '../Icon/types';
import * as S from './styles';
import { ExpenseListProps } from './types';
import { useContainer } from './useContainer';

const ExpenseList = (props: ExpenseListProps) => {
  const { color } = useContainer(props);

  return (
    <S.Container onPress={props.onPress}>
      <S.Title colors={color}>
        {props.item.code} - {props.item.name}
      </S.Title>

      <S.ButtonTrash onPress={props.onDelete}>
        <Icon icon={ETypeIcon.ICON_TRASH} size={20} />
      </S.ButtonTrash>
    </S.Container>
  );
};

export default ExpenseList;
