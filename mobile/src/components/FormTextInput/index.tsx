import { ErrorContainer, ErrorText } from 'lib/sharedStyles';

import type { TextInputProps } from 'react-native';

import { Container, LabelText, TextInput } from './styles';

type FormTextProps = TextInputProps & {
  label?: string;
  error?: string;
};

const FormTextInput: React.FC<FormTextProps> = ({ label, error, ...props }) => {
  return (
    <Container>
      {label !== undefined && <LabelText>{label}</LabelText>}
      <TextInput {...props} />
      <ErrorContainer>
        {!!error && <ErrorText>{error}</ErrorText>}
      </ErrorContainer>
    </Container>
  );
};

export default FormTextInput;
