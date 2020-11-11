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
  font-size: 24px;
  margin: 0 auto;
  color: #7d5cd7;
  width: 180px;
  text-align: center;
`;

export const FormContainer = styled.View`
  flex: 1;
  margin: 0 24px;
`;

export const ForgotPasswordText = styled.Text`
  font-size: 14px;
  margin: auto 0 40px auto;
  color: #545454;
  text-align: center;
`;

export const SubmitButtonContainer = styled.View`
  margin-bottom: 40px;
`;

export const SignUpContainer = styled.View`
  flex: 1;
`;

export const NoAccountText = styled.Text`
  font-size: 16px;
  color: #545454;
  margin: 0 auto;
`;

export const SignUpText = styled.Text`
  font-size: 16px;
  color: #7d5cd7;
  margin: 0 auto;
`;
