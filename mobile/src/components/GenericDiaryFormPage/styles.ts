import styled from 'styled-components/native';

interface CurrentPageContainerProps {
  color: string;
}

export const Container = styled.View`
  flex: 1;
`;

export const CurrentPageContainer = styled.View<CurrentPageContainerProps>`
  background-color: ${({ color }) => color};
  border-radius: 3.6px;
  padding: 10px;
  margin-top: 6px;
  align-self: center;
`;

export const ImageContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin: 15px 0 0 0;
`;

export const CurrentPageText = styled.Text`
  text-align: center;
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  color: ${props => props.theme.black};
`;

export const QuestionText = styled.Text`
  text-align: center;
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  margin: 15px 0;
  color: ${props => props.theme.black};
`;

export const Footer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 20px;
`;
