import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const CurrentPageContainer = styled.View`
  background-color: #c1acfc;
  border-radius: 3.6px;
  padding: 10px;
  margin-top: 6px;
  align-self: center;
`;

export const CurrentPageText = styled.Text`
  text-align: center;
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  color: #161026;
`;

export const QuestionText = styled.Text`
  text-align: center;
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  margin: 15px 0;
  color: #161026;
`;

export const Footer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 20px;
`;
