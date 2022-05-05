import {
  HorizontalOptionButton,
  InnerCircle,
  OuterCircle,
  TextOption,
  VerticalOptionButton,
} from './styles';

interface FormRadioGroupProps {
  // Define se a opção é apresentada horizontalmente ou verticalmente.
  text: string;
  isSelected?: boolean;
  direction?: 'row' | 'column';
  color?: string;
  onPress: () => void;
}

const RadioOption: React.FC<FormRadioGroupProps> = ({
  text,
  isSelected,
  color,
  direction = 'column',
  onPress,
}) => {
  const RadioButtonComponent =
    direction === 'column' ? HorizontalOptionButton : VerticalOptionButton;

  return (
    <RadioButtonComponent
      activeOpacity={1}
      color={color}
      direction={direction}
      isSelected={isSelected}
      onPress={onPress}>
      {direction === 'column' && (
        <OuterCircle color={color} isSelected={isSelected}>
          <InnerCircle color={color} isSelected={isSelected} />
        </OuterCircle>
      )}
      <TextOption color={color} direction={direction} isSelected={isSelected}>
        {text}
      </TextOption>
    </RadioButtonComponent>
  );
};

export default RadioOption;
