import type { TouchableOpacityProps } from 'react-native';

import { Button, Text } from './styles';

interface MainButtonProps extends TouchableOpacityProps {
  text: string;
  color?: string;
}

const MainButton: React.FC<MainButtonProps> = ({
  text,
  color,
  disabled,
  onPress,
}) => {
  return (
    <Button
      activeOpacity={0.9}
      color={color}
      disabled={disabled}
      onPress={onPress}>
      <Text color={color} disabled={disabled}>
        {text}
      </Text>
    </Button>
  );
};

export default MainButton;
