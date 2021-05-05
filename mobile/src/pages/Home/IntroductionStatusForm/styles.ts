import styled from 'styled-components/native';

interface LastPageButtonWrapperProps {
  opacity: number;
}

export const Header = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

export const ContentWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 24px;
`;

export const ImageContainer = styled.View`
  align-items: center;
  margin: 70px 0;
`;

export const ContentText = styled.Text`
  flex: 1;
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
  margin: 40px 0;
`;

export const LastPageBox = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  border: 2px solid ${props => props.theme.primary};
  border-radius: 3.6px;
`;

export const HeaderLastPageBox = styled.Text`
  color: ${props => props.theme.primary};
  text-align: center;
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  margin: 10px 0;
`;

export const ColoredText = styled.Text`
  color: ${props => props.theme.primary};
  text-align: center;
  font-family: 'OpenSans-Bold';
  font-size: 16px;
`;

export const LastPageButtonWrapper = styled.View<LastPageButtonWrapperProps>`
  opacity: ${({ opacity }) => opacity};
  justify-content: center;
  align-items: center;
`;
