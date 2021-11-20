import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import { ThemeProvider } from 'styled-components/native';

import theme from 'config/theme';
import { AuthProvider } from 'contexts/auth';
import { IsFirstRunProvider } from 'contexts/firstRun';
import Routes from 'routes/routes';
import { setI18nConfig } from 'utils/localize';
import { submitTelemetryActions } from 'utils/telemetryAction';

const App: React.FC = () => {
  const [isLocalizationLoaded, setIsLocalizationLoaded] = useState(false);

  // Tentar enviar todas as ações de telemetria armazenadas no dispositivo.
  async function submitTelemetry(): Promise<void> {
    let status = true;
    while (status) {
      status = await submitTelemetryActions();
    }
  }

  useEffect(() => {
    submitTelemetry();
    setI18nConfig();
    RNLocalize.addEventListener('change', setI18nConfig);
    setIsLocalizationLoaded(true);
    return () => {
      RNLocalize.removeEventListener('change', setI18nConfig);
    };
  }, []);

  if (!isLocalizationLoaded) {
    return <StatusBar barStyle="light-content" />;
  }

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
