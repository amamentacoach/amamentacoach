import styled from 'styled-components/native';

interface LastPageButtonWrapperProps {
  opacity: number;
}

export const CurrentPageContainer = styled.View`
  background-color: ${props => props.theme.babyPurple};
  border-radius: 3.6px;
  padding: 10px;
  margin-top: 20px;
  align-self: center;
  min-width: 70px;
`;

export const CurrentPageText = styled.Text`
  text-align: center;
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  color: ${props => props.theme.black};
`;

export const ContentTitleText = styled.Text`
  font-family: 'OpenSans-Regular';
  color: ${props => props.theme.black};
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
  color: ${props => props.theme.grey};
`;

export const CurrentPageWrapper = styled.View`
  margin: 30px 0;
`;

export const Footer = styled.View`
  flex-direction: column;
  margin: 0 24px 30px 24px;
`;

export const LastPageButtonWrapper = styled.View<LastPageButtonWrapperProps>`
  opacity: ${({ opacity }) => opacity};
  justify-content: center;
  align-items: center;
`;

export const ContinueButton = styled.TouchableOpacity`
  width: 100%;
  height: 25px;
  align-items: center;
  justify-content: center;
`;

export const TextContinueButton = styled.Text`
  color: ${props => props.theme.grey};
  font-family: 'OpenSans-Regular';
  font-size: 18px;
`;
