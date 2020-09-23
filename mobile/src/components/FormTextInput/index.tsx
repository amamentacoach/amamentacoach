import React from 'react';
import { Text, TextInputProps } from 'react-native';

import { Container, LabelText, TextInput } from './styles';

interface FormTextProps extends TextInputProps {
  label: string;
  error?: string | undefined;
}

const FormTextInput: React.FC<FormTextProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry,
}) => {
  return (
    <Container>
      <LabelText>{label}</LabelText>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#acaab2"
      />
      {error ? <Text>{error}</Text> : null}
    </Container>
  );
};

export default FormTextInput;
