import { ExpenseList } from '../../../src/components/';
import { ExpenseListProps } from '../../../src/components/ExpenseList/types';
import { fireEvent } from '@testing-library/react-native';
import { renderWithTheme } from '../../../src/utils/renderWithTheme';

describe('ExpenseList', () => {
  const baseItem = { id: '1', code: '2.1', name: 'Com pessoal' } as any;

  const renderComp = (override: Partial<ExpenseListProps> = {}) => {
    const onPress = jest.fn();
    const onDelete = jest.fn();
    const props: ExpenseListProps = {
      item: baseItem,
      onPress,
      onDelete,
      ...override,
    };
    const utils = renderWithTheme(<ExpenseList {...props} />);
    return { ...utils, onPress, onDelete };
  };

  it('renders "code - name"', () => {
    const { getByTestId } = renderComp();
    const title = getByTestId('title');
    expect(title.props.children.join('')).toContain(
      `${baseItem.code} - ${baseItem.name}`,
    );
  });

  it('use color in Title', () => {
    const { getByTestId } = renderComp();
    const title = getByTestId('title');
    expect(title.props.colors).toBe('#FF6900');
  });

  it('get onPress in container', () => {
    const { getByTestId, onPress } = renderComp();
    const container = getByTestId('container');
    fireEvent.press(container);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('get onDelete press to trash', () => {
    const { getByTestId, onDelete } = renderComp();
    const trash = getByTestId('trash');
    fireEvent.press(trash);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
