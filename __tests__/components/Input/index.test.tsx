import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import Input from '../../../src/components/Input';
import { renderWithTheme } from '../../../src/utils/renderWithTheme';
import { ETypeIcon } from '../../../src/components/Icon/types';

describe('Input', () => {
  it('renders label when provided', () => {
    const { getByText } = renderWithTheme(
      <Input label="Name" value="" onChangeText={jest.fn()} />,
    );
    expect(getByText('Name')).toBeTruthy();
  });

  it('renders placeholder and value', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input placeholder="Type here" value="abc" onChangeText={jest.fn()} />,
    );
    const input = getByPlaceholderText('Type here');
    expect(input.props.value).toBe('abc');
  });

  it('calls onChangeText when typing', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = renderWithTheme(
      <Input placeholder="Type" value="" onChangeText={onChangeText} />,
    );
    const input = getByPlaceholderText('Type');
    fireEvent.changeText(input, 'hello');
    expect(onChangeText).toHaveBeenCalledWith('hello');
  });

  it('applies multiline and numberOfLines props', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input
        placeholder="Multi"
        value=""
        onChangeText={jest.fn()}
        multiline
        numberOfLines={4}
      />,
    );
    const input = getByPlaceholderText('Multi');
    expect(input.props.multiline).toBe(true);
    expect(input.props.numberOfLines).toBe(4);
  });

  it('respects editable=false', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input
        placeholder="Edit"
        value=""
        onChangeText={jest.fn()}
        editable={false}
      />,
    );
    const input = getByPlaceholderText('Edit');
    expect(input.props.editable).toBe(false);
  });

  it('shows error message when error=true and errorMessage provided', () => {
    const { getByText } = renderWithTheme(
      <Input
        label="Email"
        value=""
        onChangeText={jest.fn()}
        error
        errorMessage="Invalid email"
      />,
    );
    expect(getByText('Invalid email')).toBeTruthy();
  });

  it('does not show error message when error=false', () => {
    const { queryByText } = renderWithTheme(
      <Input
        label="Email"
        value=""
        onChangeText={jest.fn()}
        error={false}
        errorMessage="Invalid email"
      />,
    );
    expect(queryByText('Invalid email')).toBeNull();
  });

  it('renders icon when icon prop is provided', () => {
    const { toJSON } = renderWithTheme(
      <Input
        label="Icon field"
        value=""
        onChangeText={jest.fn()}
        icon={ETypeIcon.ICON_SEARCH}
      />,
    );

    const tree = toJSON() as any;
    const findSvgMock = (node: any): boolean => {
      if (!node) return false;
      if (Array.isArray(node)) return node.some(findSvgMock);
      if (node.type === 'SvgMock') return true;
      if (node.children) return findSvgMock(node.children);
      return false;
    };

    expect(findSvgMock(tree)).toBe(true);
  });
});
