import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.Text`
  color: black;
  font-family: 'OpenSans-Bold';
  font-size: 18px;
  margin-bottom: 10px;
`;

export const EntryContainer = styled.View`
  margin-bottom: 20px;
`;

export const Line = styled.View`
  margin-top: 20px;
  background-color: ${props => props.theme.brightGrey};
  height: 1px;
`;

export const Question = styled.Text`
  color: ${props => props.theme.primary};
  font-size: 18px;
  font-family: 'OpenSans-Regular';
  margin-bottom: 5px;
`;

export const AnswerHeader = styled.Text`
  color: black;
  font-size: 16px;
  font-family: 'OpenSans-Regular';
  margin-bottom: 4px;
`;

export const Answer = styled.Text`
  color: black;
  font-size: 16px;
  font-family: 'OpenSans-Regular';
  margin-left: 14px;
`;
