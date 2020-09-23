import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './routes/AppStack';

// TODO Adicionar fontes.
const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Routes />
    </>
  );
};

export default App;
