import React from 'react';
import { TextInputProps } from 'react-native';

import {
  Container,
  LabelText,
  TextInput,
  ErrorContainer,
  ErrorText,
} from './styles';

interface FormTextProps extends TextInputProps {
  label?: string | undefined;
  error?: string | undefined;
}

const FormTextInput: React.FC<FormTextProps> = ({
  label,
  value,
  placeholder,
  error,
  secureTextEntry,
  keyboardType,
  onChangeText,
}) => {
  return (
    <Container>
      {label !== undefined ? <LabelText>{label}</LabelText> : null}
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#acaab2"
        keyboardType={keyboardType}
      />
      <ErrorContainer>
        {error ? <ErrorText>{error}</ErrorText> : null}
      </ErrorContainer>
    </Container>
  );
};

export default FormTextInput;
