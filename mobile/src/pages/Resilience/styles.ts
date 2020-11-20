import styled from 'styled-components/native';

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
  padding: 24px;
`;

export const PageHeader = styled.Text`
  margin-bottom: 20px;
  color: #737373;
  font-family: 'Open-Sans-Regular';
  font-size: 16px;
  text-align: center;
`;

export const Header = styled.Text`
  margin-top: 26px;
  margin-bottom: 6px;
  color: #161026;
  font-family: 'Manjari-Bold';
  font-size: 18px;
`;

export const Text = styled.Text`
  margin-bottom: 30px;
  color: #737373;
  font-family: 'Open-Sans-Regular';
  font-size: 16px;
`;
