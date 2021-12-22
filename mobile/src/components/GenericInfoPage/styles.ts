import styled from 'styled-components/native';

import { OpenSansBold, OpenSansRegular } from 'lib/sharedStyles';

interface LastPageButtonWrapperProps {
  opacity: number;
}

export const Header = styled.View`
  align-items: flex-end;
  justify-content: center;
  height: 45px;
  padding: 15px 0;
`;

export const SkipButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-right: 30px;
`;

export const ContentWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 0px 24px;
`;

export const ContentTitleText = styled(OpenSansRegular)`
  font-size: 18px;
  text-align: center;
  margin: 0 24px;
`;

export const ImageContainer = styled.View`
  margin: 20px;
  max-height: 250px;
`;

export const TextContainer = styled.View`
  margin-bottom: 20px;
`;

export const ContentHeaderText = styled(OpenSansBold)`
  text-align: center;
`;

export const ContentText = styled(OpenSansRegular)`
  text-align: center;
  color: ${props => props.theme.grey};
`;

export const Footer = styled.View`
  flex-direction: column;
  margin: 0 24px;
`;

export const CurrentPageWrapper = styled.View`
  margin-bottom: 24px;
`;

export const LastPageButtonWrapper = styled.View<LastPageButtonWrapperProps>`
  opacity: ${({ opacity }) => opacity};
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

export const EndButton = styled.TouchableOpacity`
  width: 100%;
  height: 25px;
  align-items: center;
  justify-content: center;
`;

export const TextEndButton = styled(OpenSansRegular)`
  color: ${props => props.theme.grey};
  font-size: 18px;
`;
