import styled from 'styled-components/native';

import ImageWrapper from '../../../components/ImageWrapper';

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
`;

export const Header = styled(ImageWrapper)`
  align-items: center;
  max-height: 200px;
  margin: 30px auto 30px auto;
  justify-content: center;
`;

export const FormContainer = styled.View`
  flex: 1;
  margin: 0 24px;
`;

export const ForgotPasswordText = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 14px;
  margin: auto 0 40px auto;
  color: ${props => props.theme.grey};
  text-align: center;
`;

export const SubmitButtonContainer = styled.View`
  margin-bottom: 40px;
`;

export const SignUpContainer = styled.View`
  flex: 1;
`;

export const NoAccountText = styled.Text`
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  color: ${props => props.theme.grey};
  margin: 0 auto;
`;

export const SignUpText = styled.Text`
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  color: ${props => props.theme.primary};
  margin: 0 auto;
`;
