import React, { useState } from 'react';
import { Text } from 'react-native';

import {
  Container,
  LabelText,
  TextOption,
  OptionsContainer,
  Option,
  OuterCircle,
  InnerCircle,
} from './styles';

interface FormRadioGroupProps {
  name: string;
  label: string;
  options: string[];
  error?: string | undefined;
  setField: (fieldName: string, fieldValue: string) => void;
}

const FormRadioGroupInput: React.FC<FormRadioGroupProps> = ({
  name,
  label,
  options,
  error,
  setField,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  function handleOptionSelected(index: number) {
    setSelectedIndex(index);
    setField(name, options[index]);
  }

  return (
    <Container>
      <LabelText>{label}</LabelText>
      <OptionsContainer>
        {options.map((option, index) => (
          <Option
            selected={index === selectedIndex}
            key={option}
            activeOpacity={1}
            onPress={() => handleOptionSelected(index)}>
            <OuterCircle selected={index === selectedIndex}>
              <InnerCircle selected={index === selectedIndex} />
            </OuterCircle>
            <TextOption>{option}</TextOption>
          </Option>
        ))}
      </OptionsContainer>
      {error ? <Text>{error}</Text> : null}
    </Container>
  );
};

export default FormRadioGroupInput;
