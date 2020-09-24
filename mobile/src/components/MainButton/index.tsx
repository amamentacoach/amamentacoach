import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { TextButton, Button, Container } from './styles';

interface MainButtonProps extends TouchableOpacityProps {
  buttonText: string;
}

const MainButton: React.FC<MainButtonProps> = ({
  buttonText,
  onPress,
  disabled,
}) => {
  return (
    <Container>
      <Button onPress={onPress} disabled={disabled} activeOpacity={0.7}>
        <TextButton>{buttonText}</TextButton>
      </Button>
    </Container>
  );
};

export default MainButton;
