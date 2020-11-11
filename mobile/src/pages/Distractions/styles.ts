import styled from 'styled-components/native';

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  padding: 20px 24px 0 24px;
`;

export const HeaderText = styled.Text`
  margin: 0px 24px 30px 24px;
  color: #737373;
  font-family: 'Open-Sans-Regular';
  font-size: 16px;
  text-align: center;
`;
