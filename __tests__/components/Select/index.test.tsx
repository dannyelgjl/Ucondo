import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import Select from '../../../src/components/Select';
import { renderWithTheme } from '../../../src/utils/renderWithTheme';

const OPTIONS = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

describe('Select', () => {
  it('renders placeholder when no value is selected', () => {
    const { getByText } = renderWithTheme(
      <Select
        options={OPTIONS}
        placeholder="Choose"
        value=""
        onChange={jest.fn()}
      />,
    );
    expect(getByText('Choose')).toBeTruthy();
  });

  it('renders selected label when value matches an option', () => {
    const { getByText, queryByText } = renderWithTheme(
      <Select
        options={OPTIONS}
        placeholder="Choose"
        value="b"
        onChange={jest.fn()}
      />,
    );
    expect(getByText('Option B')).toBeTruthy();
    expect(queryByText('Choose')).toBeNull();
  });

  it('renders label when provided', () => {
    const { getByText } = renderWithTheme(
      <Select
        options={OPTIONS}
        label="Accounts"
        placeholder="Choose"
        value=""
        onChange={jest.fn()}
      />,
    );
    expect(getByText('Accounts')).toBeTruthy();
  });

  it('shows error message when error=true and errorMessage provided', () => {
    const { getByText } = renderWithTheme(
      <Select
        options={OPTIONS}
        placeholder="Choose"
        value=""
        onChange={jest.fn()}
        error
        errorMessage="Parent cannot accept releases"
      />,
    );
    expect(getByText('Parent cannot accept releases')).toBeTruthy();
  });

  it('does not show error message when error=false', () => {
    const { queryByText } = renderWithTheme(
      <Select
        options={OPTIONS}
        placeholder="Choose"
        value=""
        onChange={jest.fn()}
        error={false}
        errorMessage="Parent cannot accept releases"
      />,
    );
    expect(queryByText('Parent cannot accept releases')).toBeNull();
  });

  it('opens the modal with options when pressing the select button', () => {
    const { getByText } = renderWithTheme(
      <Select
        options={OPTIONS}
        placeholder="Choose"
        value=""
        onChange={jest.fn()}
      />,
    );

    fireEvent.press(getByText('Choose'));

    expect(getByText('Option A')).toBeTruthy();
    expect(getByText('Option B')).toBeTruthy();
    expect(getByText('Option C')).toBeTruthy();
  });

  it('calls onChange with selected value and closes modal', () => {
    const onChange = jest.fn();
    const { getByText, queryByText } = renderWithTheme(
      <Select
        options={OPTIONS}
        placeholder="Choose"
        value=""
        onChange={onChange}
      />,
    );

    fireEvent.press(getByText('Choose'));
    fireEvent.press(getByText('Option C'));

    expect(onChange).toHaveBeenCalledWith('c');
    expect(queryByText('Option A')).toBeNull();
  });

  it('closes without selection and does not call onChange', () => {
    const onChange = jest.fn();
    const { getByText, queryByText } = renderWithTheme(
      <Select
        options={OPTIONS}
        placeholder="Choose"
        value=""
        onChange={onChange}
      />,
    );

    // open
    fireEvent.press(getByText('Choose'));
    expect(getByText('Option A')).toBeTruthy();

    // close by toggling the button again (no selection)
    fireEvent.press(getByText('Choose'));

    expect(queryByText('Option A')).toBeNull();
    expect(onChange).not.toHaveBeenCalled();
  });
});
