import type { TouchableOpacityProps } from 'react-native';

import { Button, TextButton } from './styles';

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
      activeOpacity={0.9}
      color={color}
      disabled={disabled}
      onPress={onPress}>
      <TextButton color={color} disabled={disabled}>
        {text}
      </TextButton>
    </Button>
  );
};

export default SecondaryButton;
