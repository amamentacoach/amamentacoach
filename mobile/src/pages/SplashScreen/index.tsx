import React from 'react';

import { Container, LogoImage, AppNameText } from './styles';

import logo from '../../../assets/images/logo_white.png';

const SplashScreen: React.FC = () => {
  return (
    <Container>
      <LogoImage source={logo} resizeMode="stretch" />
    </Container>
  );
};

export default SplashScreen;
