import styled from 'styled-components/native';

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
  padding: 24px;
`;

export const HeaderText = styled.Text`
  font-family: 'OpenSans-Bold';
  font-size: 18px;
  color: ${props => props.theme.primary};
  text-align: center;
`;

export const HeaderSubText = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 14px;
  margin: 0 auto 15px auto;
  text-align: center;
  padding-top: 20px;
`;

export const FormContainer = styled.View`
  flex: 1;
  margin-bottom: 6px;
`;

export const SubmitButtonContainer = styled.View`
  flex: 1;
  align-items: flex-end;
  flex-direction: row;
  padding: 15px 0px;
  margin-bottom: 20px;
`;
