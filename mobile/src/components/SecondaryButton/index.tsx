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
    <Button onPress={onPress} disabled={disabled} activeOpacity={0.7}>
      <TextButton>{text}</TextButton>
    </Button>
  );
};

export default SecondaryButton;
