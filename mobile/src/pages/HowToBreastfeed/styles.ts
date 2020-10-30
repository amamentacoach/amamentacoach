import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))``;

export const HeaderText = styled.Text`
  margin: 20px 24px 12px 24px;
  color: #737373;
  font-family: 'Open-Sans-Regular';
  font-size: 16px;
  text-align: center;
`;
