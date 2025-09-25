import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import ConfirmModal from '../../../src/components/Modal';
import { renderWithTheme } from '../../../src/utils/renderWithTheme';

const findSvgMock = (node: any): boolean => {
  if (!node) return false;
  if (Array.isArray(node)) return node.some(findSvgMock);
  if (node.type === 'SvgMock') return true;
  if (node.children) return findSvgMock(node.children);
  return false;
};

describe('ConfirmModal', () => {
  it('renders title, message and icon when visible', () => {
    const { toJSON, getByText } = renderWithTheme(
      <ConfirmModal visible title="Confirm" message="Are you sure?" />,
    );

    expect(getByText('Confirm')).toBeTruthy();
    expect(getByText('Are you sure?')).toBeTruthy();

    const tree = toJSON() as any;
    expect(findSvgMock(tree)).toBe(true);
  });

  it('calls onCancel when tapping cancel button', () => {
    const onCancel = jest.fn();
    const { getByText } = renderWithTheme(
      <ConfirmModal visible onCancel={onCancel} cancelText="No" />,
    );

    fireEvent.press(getByText('No'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirm when tapping confirm button', () => {
    const onConfirm = jest.fn();
    const { getByText } = renderWithTheme(
      <ConfirmModal visible onConfirm={onConfirm} confirmText="Yes" />,
    );

    fireEvent.press(getByText('Yes'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('disables actions when loading=true', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    const { getByText } = renderWithTheme(
      <ConfirmModal
        visible
        loading
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmText="Yes"
        cancelText="No"
      />,
    );

    fireEvent.press(getByText('Yes'));
    fireEvent.press(getByText('No'));
    expect(onConfirm).not.toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();
  });
});
