import styled from 'styled-components/native';

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
`;

export const Header = styled.View`
  flex: 1;
  max-height: 200px;
  margin: 30px auto;
  justify-content: space-between;
`;

export const HeaderImage = styled.Image`
  min-height: 100px;
  min-width: 100px;
  margin: 0 auto;
`;

export const HeaderText = styled.Text`
  font-family: 'Manjari-Bold';
  font-size: 24px;
  margin: -20px auto auto auto;
  color: ${props => props.theme.primary};
  width: 180px;
  text-align: center;
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
