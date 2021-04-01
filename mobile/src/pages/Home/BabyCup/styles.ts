import styled from 'styled-components/native';

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
  padding: 24px;
`;

export const VideoLink = styled.Text`
  color: #7d5cd7;
  font-family: 'OpenSans-Bold';
  font-size: 18px;
  align-self: center;
  margin-bottom: 20px;
`;

export const InstructionContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const Step = styled.Text`
  color: #7d5cd7;
  font-family: 'OpenSans-Bold';
  font-size: 18px;
  margin-right: 5px;
`;

export const Instruction = styled.Text`
  color: #737373;
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  text-align: justify;
  flex-shrink: 1;
`;
