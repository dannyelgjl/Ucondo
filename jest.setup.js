/* eslint-disable no-undef */
import { NativeModules } from 'react-native';

NativeModules.StatusBarManager = NativeModules.StatusBarManager || {
  getHeight: jest.fn(cb => cb({ height: 0 })),
  setColor: jest.fn(),
  setStyle: jest.fn(),
  setHidden: jest.fn(),
  addListener: jest.fn(),
  removeAllListeners: jest.fn(),
};

const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('new NativeEventEmitter()')
  ) {
    return;
  }
  // @ts-ignore
  return originalWarn.apply(console, args);
};
