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

export const SkipButton = styled.TouchableOpacity`
  margin: 0px 30px 0 0;
`;

export const SkipButtonText = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 16px;
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

export const Footer = styled.View`
  flex-direction: column;
  margin: 0 24px 30px 24px;
`;

export const CurrentPageWrapper = styled.View`
  margin: 30px 0;
`;

export const LastPageButtonWrapper = styled.View<ILastPageButtonWrapperProps>`
  opacity: ${({ opacity }) => opacity};
  justify-content: center;
  align-items: center;
`;
