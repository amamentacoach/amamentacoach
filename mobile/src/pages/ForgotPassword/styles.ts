import styled from 'styled-components/native';

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
  padding: 24px;
`;

export const HeaderText = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 14px;
  color: #545454;
  text-align: center;
  margin: 25px 24px;
`;

export const FormContainer = styled.View`
  flex: 1;
  margin: 0 24px;
`;

export const SubmitButtonContainer = styled.View`
  flex: 1;
  margin-bottom: 15px;
  justify-content: flex-end;
`;
