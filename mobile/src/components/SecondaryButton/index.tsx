import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { TextButton, Button } from './styles';

interface SecondaryButtonProps extends TouchableOpacityProps {
  text: string;
  color?: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  text,
  disabled,
  color,
  onPress,
}) => {
  return (
    <Button
      color={color}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.9}>
      <TextButton color={color} disabled={disabled}>
        {text}
      </TextButton>
    </Button>
  );
};

export default SecondaryButton;
