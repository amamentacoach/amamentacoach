import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { TextButton, Button } from './styles';

interface MainButtonProps extends TouchableOpacityProps {
  buttonText: string;
}

const MainButton: React.FC<MainButtonProps> = ({
  buttonText,
  onPress,
  disabled,
}) => {
  return (
    <Button onPress={onPress} disabled={disabled} activeOpacity={0.7}>
      <TextButton>{buttonText}</TextButton>
    </Button>
  );
};

export default MainButton;
