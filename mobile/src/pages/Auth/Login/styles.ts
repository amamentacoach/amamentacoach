import styled from 'styled-components/native';

import { OpenSansBold, OpenSansRegular } from 'lib/sharedStyles';

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
  showsVerticalScrollIndicator: false,
}))`
  flex: 1;
`;

export const FormContainer = styled.View`
  flex: 1;
  padding: 24px;
`;

export const ForgotPasswordText = styled(OpenSansRegular)`
  font-size: 14px;
  margin: auto 0 40px auto;
  color: ${props => props.theme.grey};
  text-align: center;
`;

export const SubmitButtonContainer = styled.View`
  margin-bottom: 40px;
`;

export const NoAccountText = styled(OpenSansRegular)`
  color: ${props => props.theme.grey};
  margin: 0 auto;
`;

export const SignUpText = styled(OpenSansBold)`
  margin: 0 auto;
`;
