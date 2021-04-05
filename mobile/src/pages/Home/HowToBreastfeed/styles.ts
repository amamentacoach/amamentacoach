import styled from 'styled-components/native';

interface ILastPageButtonWrapperProps {
  opacity: number;
}

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  min-height: 22px;
  margin-top: 30px;
`;

export const CurrentPageContainer = styled.View`
  background-color: #c1acfc;
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
  color: #161026;
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
`;

export const CurrentPageWrapper = styled.View`
  margin: 30px 0;
`;

export const Footer = styled.View`
  flex-direction: column;
  margin: 0 24px 30px 24px;
`;

export const LastPageButtonWrapper = styled.View<ILastPageButtonWrapperProps>`
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
  color: #545454;
  font-family: 'OpenSans-Regular';
  font-size: 18px;
`;
