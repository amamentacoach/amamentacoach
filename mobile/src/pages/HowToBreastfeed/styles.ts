import styled from 'styled-components/native';

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  padding: 20px 24px 0 24px;
`;

export const HeaderText = styled.Text`
  margin-bottom: 12px;
  color: #737373;
  font-family: 'Open-Sans-Regular';
  font-size: 16px;
  text-align: center;
`;
