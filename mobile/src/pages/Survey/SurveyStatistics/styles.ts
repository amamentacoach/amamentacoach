import styled from 'styled-components/native';

export const HeaderBackground = styled.View`
  background-color: ${props => props.theme.babyBlue};
  align-items: center;
  width: 100%;
  height: 170px;
`;

export const HeaderText = styled.Text`
  color: ${props => props.theme.black};
  text-align: center;
  font-family: 'OpenSans-Regular';
  font-size: 18px;
  margin: -150px 24px 10px 24px;
`;

export const ContentContainer = styled.View`
  background-color: ${props => props.theme.white};
  border-radius: 5px;
  margin: 0px 24px;
  padding: 24px 15px;
  flex: 1;
`;

export const ContentHeader = styled.Text`
  color: ${props => props.theme.black};
  text-align: center;
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  margin-bottom: 25px;
`;

export const QuestionIndex = styled.Text`
  color: ${props => props.theme.black};
  text-align: center;
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  margin-bottom: 10px;
`;

export const Question = styled.Text`
  color: ${props => props.theme.grey};
  text-align: center;
  font-family: 'OpenSans-Normal';
  font-size: 14px;
  margin-bottom: 12px;
`;

export const ContentSeparator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${props => props.theme.grey};
  opacity: 0.25;
  margin: 40px 0;
`;
