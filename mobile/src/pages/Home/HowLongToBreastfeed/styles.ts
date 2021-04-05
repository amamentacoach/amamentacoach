import styled from 'styled-components/native';

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
`;

export const ContentTitleText = styled.Text`
  font-family: 'OpenSans-Regular';
  color: #000000;
  font-size: 18px;
  text-align: center;
  margin: 20px 24px 0 24px;
`;

export const ContentWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  margin: 24px 24px 0 24px;
`;

export const ContentText = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  text-align: center;
  color: #545454;
  margin: 30px 0;
`;

export const ColoredText = styled.Text`
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  text-align: center;
  color: #7d5cd7;
`;
