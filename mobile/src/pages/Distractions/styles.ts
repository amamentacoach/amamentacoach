import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  padding-top: 20px;
`;

export const HeaderText = styled.Text`
  margin: 0px 24px 30px 24px;
  color: #737373;
  font-family: 'Open-Sans-Regular';
  font-size: 16px;
  text-align: center;
`;
