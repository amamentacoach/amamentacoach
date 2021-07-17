import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import theme from './config/theme';
import { AuthProvider } from './contexts/auth';
import { IsFirstRunProvider } from './contexts/firstRun';
import Routes from './routes/routes';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <IsFirstRunProvider>
        <AuthProvider>
          <NavigationContainer>
            <ThemeProvider theme={theme}>
              <Routes />
            </ThemeProvider>
          </NavigationContainer>
        </AuthProvider>
      </IsFirstRunProvider>
    </>
  );
};

export default App;
