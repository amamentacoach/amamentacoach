import styled from 'styled-components/native';

export const FormScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
`;

export const HeaderBackground = styled.View`
  background-color: #7d5cd7;
  align-items: center;
  width: 100%;
  height: 170px;
`;

export const HeaderText = styled.Text`
  color: #fafafa;
  text-align: center;
  font-family: 'OpenSans-Regular';
  font-size: 18px;
  margin: -150px 24px 10px 24px;
`;

export const QuestionContainer = styled.View`
  min-height: 20px;
`;

export const ContentContainer = styled.View`
  flex: 1;
  margin: 0px 24px;
  background-color: white;
  border-radius: 5px;
  padding: 24px;
`;

export const QuestionText = styled.Text`
  text-align: center;
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  margin: 15px 0;
  color: #161026;
`;

export const Footer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 20px;
`;
