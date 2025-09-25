import { Icon } from '../Icon';
import { ETypeIcon } from '../Icon/types';
import * as S from './styles';
import { ExpenseListProps } from './types';
import { useContainer } from './useContainer';

const ExpenseList = (props: ExpenseListProps) => {
  const { color } = useContainer(props);

  return (
    <S.Container onPress={props.onPress} testID="container">
      <S.Title colors={color} testID="title">
        {props.item.code} - {props.item.name}
      </S.Title>

      <S.ButtonTrash onPress={props.onDelete} testID="trash">
        <Icon icon={ETypeIcon.ICON_TRASH} size={20} />
      </S.ButtonTrash>
    </S.Container>
  );
};

export default ExpenseList;
