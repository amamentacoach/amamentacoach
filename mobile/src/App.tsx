import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';

import theme from './config/theme';
import { AuthProvider } from './contexts/auth';
import { IsFirstRunProvider } from './contexts/firstRun';
import Routes from './routes/routes';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <IsFirstRunProvider>
              <Routes />
            </IsFirstRunProvider>
          </AuthProvider>
        </ThemeProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
