import styled from 'styled-components/native';

export const Header = styled.Text`
  color: black;
  font-family: 'OpenSans-Bold';
  font-size: 18px;
  margin-bottom: 10px;
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
