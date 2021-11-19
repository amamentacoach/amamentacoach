import { TextInput as ReactTextInput } from 'react-native';

import type { TextInputProps } from 'react-native';

import {
  Container,
  ErrorContainer,
  ErrorText,
  LabelText,
  TextInput,
} from './styles';

interface FormTextProps extends TextInputProps {
  label?: string;
  error?: string;
  centerText?: boolean;
  textInputRef?: React.RefObject<ReactTextInput> | null;
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
      <ErrorContainer>
        {!!error && <ErrorText>{error}</ErrorText>}
      </ErrorContainer>
    </Container>
  );
};

export default FormTextInput;
