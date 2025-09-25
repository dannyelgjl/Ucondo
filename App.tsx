import React from 'react';
// import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
// import theme from './src/theme/theme';

const App = () => (
  <NavigationContainer>
    {/* <ThemeProvider theme={theme}> */}
    <Routes />
    {/* </ThemeProvider> */}
  </NavigationContainer>
);

export default App;
