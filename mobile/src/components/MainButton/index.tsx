import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { TextButton, Button } from './styles';

interface MainButtonProps extends TouchableOpacityProps {
  text: string;
}

const MainButton: React.FC<MainButtonProps> = ({ text, onPress, disabled }) => {
  return (
    <Button onPress={onPress} disabled={disabled} activeOpacity={0.9}>
      <TextButton>{text}</TextButton>
    </Button>
  );
};

export default MainButton;
