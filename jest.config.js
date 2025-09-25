module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/jest.setup.js',
  ],
  moduleNameMapper: {
    '^react-native-svg$': 'react-native-svg/jest/react-native-svg-mock',
    '\\.(svg)$': '<rootDir>/__mocks__/svgMock.js',
    '\\.(png|jpg|jpeg)$': '<rootDir>/__mocks__/fileMock.js',
  },
};
