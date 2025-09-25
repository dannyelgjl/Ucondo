import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import Header from '../../../src/components/Header';
import { ETypeIcon } from '../../../src/components/Icon/types';
import { renderWithTheme } from '../../../src/utils/renderWithTheme';

describe('Header', () => {
  it('renders title', () => {
    const { getByTestId } = renderWithTheme(
      <Header title="Minhas Contas" iconType={ETypeIcon.ICON_DONE} />,
    );

    expect(getByTestId('header-title').props.children).toBe('Minhas Contas');
  });

  it('executes onPress on the back button when provided', () => {
    const onPress = jest.fn();
    const { getByTestId } = renderWithTheme(
      <Header
        title="Voltar"
        onPress={onPress}
        iconType={ETypeIcon.ICON_DONE}
      />,
    );

    fireEvent.press(getByTestId('header-back-button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('executes onRegister in button action', () => {
    const onRegister = jest.fn();
    const { getByTestId } = renderWithTheme(
      <Header
        title="Adicionar"
        onRegister={onRegister}
        iconType={ETypeIcon.ICON_PLUS}
      />,
    );

    fireEvent.press(getByTestId('header-add-button'));
    expect(onRegister).toHaveBeenCalledTimes(1);
  });

  it('shows and interacts with the search input when showInput=true', () => {
    const onChangeText = jest.fn();
    const { getByTestId } = renderWithTheme(
      <Header
        title="Buscar"
        showInput
        iconType={ETypeIcon.ICON_SEARCH}
        onChangeText={onChangeText}
        value=""
      />,
    );

    const container = getByTestId('header-search-container');
    expect(container).toBeTruthy();

    const input = getByTestId('header-search-input');
    fireEvent.changeText(input, 'abc');
    expect(onChangeText).toHaveBeenCalledWith('abc');
  });
});
