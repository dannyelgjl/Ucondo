import React from 'react';
import { render } from '@testing-library/react-native';
import { Icon } from '../../../src/components/Icon';
import { ETypeIcon } from '../../../src/components/Icon/types';

describe('Icon', () => {
  it('renders null when no icon is provided', () => {
    const { toJSON } = render((<Icon />) as any);
    expect(toJSON()).toBeNull();
  });

  it('renders the icon component with color and size props', () => {
    const size = 24;
    const color = '#123456';
    const { toJSON } = render(
      <Icon icon={ETypeIcon.ICON_TRASH} size={size} color={color} />,
    );
    const json = toJSON() as any;

    expect(json).toBeTruthy();
    expect(json.type).toBe('SvgMock');
    expect(json.props.width).toBe(size);
    expect(json.props.height).toBe(size);
    expect(json.props.color).toBe(color);
  });
});
