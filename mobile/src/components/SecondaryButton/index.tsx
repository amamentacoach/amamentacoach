import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { TextButton, Button } from './styles';

interface SecondaryButtonProps extends TouchableOpacityProps {
  buttonText: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
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

export default SecondaryButton;
