import React from 'react';

import { iconSelected } from './icon';
import { IIconProps } from './types';

export const Icon = ({ icon, color, size }: IIconProps) => {
  const IconComponent = icon ? iconSelected[icon] : null;

  if (!IconComponent) return null;
  return <IconComponent color={color} width={size} height={size} />;
};
