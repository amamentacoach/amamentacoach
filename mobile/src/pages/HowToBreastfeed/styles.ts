import styled from 'styled-components/native';

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
  padding: 24px;
`;

export const HeaderText = styled.Text`
  margin-bottom: 12px;
  color: #737373;
  font-family: 'Open-Sans-Regular';
  font-size: 16px;
  text-align: center;
`;
