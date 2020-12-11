import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { TextButton, Button } from './styles';

interface SecondaryButtonProps extends TouchableOpacityProps {
  text: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  text,
  onPress,
  disabled,
}) => {
  return (
    <Button onPress={onPress} disabled={disabled} activeOpacity={0.9}>
      <TextButton disabled={disabled}>{text}</TextButton>
    </Button>
  );
};

export default SecondaryButton;
