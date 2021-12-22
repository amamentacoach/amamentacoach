import { ErrorContainer, ErrorText } from 'lib/sharedStyles';

import type { ComponentProps } from 'react';

import { Container, LabelText, TextInput } from './styles';

interface FormTextProps extends ComponentProps<typeof TextInput> {
  label?: string;
  error?: string;
}

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
