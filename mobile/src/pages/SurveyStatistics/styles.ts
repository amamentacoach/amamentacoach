import styled from 'styled-components/native';

export const ScrollView = styled.ScrollView.attrs(() => ({
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
  font-family: 'Open-Sans-Regular';
  font-size: 18px;
  margin: -150px 24px 10px 24px;
`;

export const ContentContainer = styled.View`
  background-color: white;
  border-radius: 5px;
  margin: 0px 24px;
  padding: 24px 15px;
  flex: 1;
`;

export const ContentHeader = styled.Text`
  color: #161026;
  text-align: center;
  font-family: 'Open-Sans-Bold';
  font-size: 16px;
  margin-bottom: 25px;
`;

export const QuestionContainer = styled.View`
  flex: 1;
`;

export const QuestionIndex = styled.Text`
  color: #161026;
  text-align: center;
  font-family: 'Open-Sans-Bold';
  font-size: 16px;
  margin-bottom: 10px;
`;

export const Question = styled.Text`
  color: #545454;
  text-align: center;
  font-family: 'Open-Sans-Normal';
  font-size: 14px;
  margin-bottom: 12px;
`;

export const ContentSeparator = styled.View`
  height: 1px;
  width: 100%;
  background-color: #979797;
  opacity: 0.25;
  margin: 40px 0;
`;
