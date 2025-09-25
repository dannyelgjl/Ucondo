import React from 'react';
import { Text } from 'react-native';
import { render, act } from '@testing-library/react-native';
import * as RN from 'react-native';
import { useStatusBarHeight } from '../../../src/utils/statusBarHeight';

const TestComponent = () => {
  const h = useStatusBarHeight();
  return <Text testID="height">{String(h)}</Text>;
};

describe('useStatusBarHeight', () => {
  let listeners: Array<(payload: any) => void> = [];

  beforeEach(() => {
    listeners = [];

    // @ts-ignore
    RN.NativeModules.StatusBarManager = RN.NativeModules.StatusBarManager || {};
    // @ts-ignore
    RN.NativeModules.StatusBarManager.getHeight = jest.fn(cb =>
      cb({ height: 10 }),
    );

    // @ts-ignore
    jest.spyOn(RN, 'NativeEventEmitter').mockImplementation(
      () =>
        ({
          addListener: (_event: string, cb: (payload: any) => void) => {
            listeners.push(cb);
            return { remove: jest.fn() } as any;
          },
        } as any),
    );
  });

  afterEach(() => {
    (RN.NativeEventEmitter as any).mockRestore?.();
  });

  it('returns initial height from StatusBarManager.getHeight', () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('height').props.children).toBe('10');
  });

  it('updates height when statusBarFrameDidChange event fires', () => {
    const { getByTestId } = render(<TestComponent />);

    act(() => {
      listeners.forEach(cb => cb({ frame: { height: 10 } }));
    });

    expect(getByTestId('height').props.children).toBe('10');
  });
});
