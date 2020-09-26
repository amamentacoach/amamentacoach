import React, { useState } from 'react';

import {
  Container,
  LabelText,
  TextOption,
  OptionsContainer,
  Option,
  OuterCircle,
  InnerCircle,
  ErrorContainer,
  ErrorText,
} from './styles';

interface FormRadioGroupProps {
  name: string;
  label: string;
  options: string[];
  error?: string | undefined;
  onChange: (fieldName: string, fieldValue: string) => void;
}

const FormRadioGroupInput: React.FC<FormRadioGroupProps> = ({
  name,
  label,
  options,
  error,
  onChange,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  function handleOptionSelected(index: number) {
    setSelectedIndex(index);
    onChange(name, options[index]);
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
      <ErrorContainer>
        {error ? <ErrorText>{error}</ErrorText> : null}
      </ErrorContainer>
    </Container>
  );
};

export default FormRadioGroupInput;
