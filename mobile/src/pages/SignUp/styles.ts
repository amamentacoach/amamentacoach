import styled from 'styled-components/native';

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
`;

export const Header = styled.View`
  margin: 0 auto;
  padding: 20px;
`;

export const HeaderText = styled.Text`
  font-size: 18px;
  color: #7d5cd7;
  text-align: center;
`;

export const HeaderSubText = styled.Text`
  font-size: 14px;
  font-family: 'OpenSans-Regular';
  margin: 0 auto;
  text-align: center;
  padding-top: 20px;
`;

export const FormContainer = styled.View`
  flex: 1;
  margin: 0 24px;
`;

export const SubmitButtonContainer = styled.View`
  flex: 1;
  padding: 15px 0px;
  flex-direction: column-reverse;
`;
