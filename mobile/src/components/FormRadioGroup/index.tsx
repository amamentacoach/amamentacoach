import React, { useState } from 'react';

import {
  Container,
  ErrorContainer,
  ErrorText,
  InnerCircle,
  LabelText,
  OptionButton,
  OptionsContainer,
  OuterCircle,
  TextOption,
} from './styles';

interface FormRadioGroupProps {
  fieldName: string;
  label: string;
  options: string[];
  error?: string | undefined;
  onChange: (fieldName: string, fieldValue: string) => void;
}

const FormRadioGroupInput: React.FC<FormRadioGroupProps> = ({
  fieldName,
  label,
  options,
  error,
  onChange,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  function handleOptionSelected(index: number) {
    setSelectedIndex(index);
    onChange(fieldName, options[index]);
  }

  return (
    <Container>
      <LabelText>{label}</LabelText>
      <OptionsContainer>
        {options.map((option, index) => (
          <OptionButton
            selected={index === selectedIndex}
            key={option}
            activeOpacity={1}
            onPress={() => handleOptionSelected(index)}>
            <OuterCircle selected={index === selectedIndex}>
              <InnerCircle selected={index === selectedIndex} />
            </OuterCircle>
            <TextOption>{option}</TextOption>
          </OptionButton>
        ))}
      </OptionsContainer>
      <ErrorContainer>
        {error ? <ErrorText>{error}</ErrorText> : null}
      </ErrorContainer>
    </Container>
  );
};

export default FormRadioGroupInput;
