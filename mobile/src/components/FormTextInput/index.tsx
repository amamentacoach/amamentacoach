import React from 'react';
import { TextInput as ReactTextInput, TextInputProps } from 'react-native';

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
  centerText?: boolean | undefined;
  textInputRef?: React.RefObject<ReactTextInput> | null | undefined;
}

const FormTextInput: React.FC<FormTextProps> = ({
  label,
  value,
  placeholder,
  error,
  textAlignVertical,
  secureTextEntry,
  keyboardType,
  multiline,
  numberOfLines,
  maxLength,
  centerText = false,
  onChangeText,
}) => {
  return (
    <Container>
      {label !== undefined && <LabelText>{label}</LabelText>}
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#acaab2"
        textAlignVertical={textAlignVertical}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        centerText={centerText}
      />
      <ErrorContainer>{error && <ErrorText>{error}</ErrorText>}</ErrorContainer>
    </Container>
  );
};

export default FormTextInput;
