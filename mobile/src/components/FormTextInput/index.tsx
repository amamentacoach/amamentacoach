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
  textInputRef?: React.RefObject<ReactTextInput> | null | undefined;
}

const FormTextInput: React.FC<FormTextProps> = ({
  label,
  value,
  placeholder,
  error,
  secureTextEntry,
  keyboardType,
  multiline,
  numberOfLines,
  maxLength,
  onChangeText,
}) => {
  return (
    <Container>
      {label !== undefined ? <LabelText>{label}</LabelText> : null}
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#acaab2"
        textAlignVertical="top"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
      />
      <ErrorContainer>
        {error ? <ErrorText>{error}</ErrorText> : null}
      </ErrorContainer>
    </Container>
  );
};

export default FormTextInput;
