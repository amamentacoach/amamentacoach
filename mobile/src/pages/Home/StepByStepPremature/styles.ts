import styled from 'styled-components/native';

import { OpenSansBold, OpenSansRegular } from 'lib/sharedStyles';

interface BackgroundProps {
  color: string;
}

interface ForegroundProps {
  color: string;
  height: number;
}

interface LastPageButtonWrapperProps {
  opacity: number;
}

interface ContentProps {
  shouldDisplayImage: boolean;
}

export const Background = styled.View<BackgroundProps>`
  flex: 1;
  background-color: ${({ color }) => color};
`;

export const Foreground = styled.View<ForegroundProps>`
  background-color: ${({ color }) => color};
  border-bottom-left-radius: 120px;
  border-bottom-right-radius: 120px;
  height: ${({ height }) => height * 0.25}px;
  align-items: center;
`;

export const ContentTitleText = styled(OpenSansBold)`
  font-size: 20px;
  text-align: center;
  margin: 24px;
`;

export const ContentWrapper = styled.View<ContentProps>`
  align-items: center;
  justify-content: center;
  margin: 24px;
  padding-top: 20px;
  flex: ${({ shouldDisplayImage }) => (shouldDisplayImage ? 0 : 1)};
  margin-top: ${({ shouldDisplayImage }) => (shouldDisplayImage ? -200 : 10)}px;
`;

export const ContentHeaderText = styled(OpenSansRegular)`
  text-align: center;
  color: ${props => props.theme.primary};
  margin-top: 20px;
`;

export const ContentText = styled(OpenSansRegular)`
  text-align: center;
  color: ${props => props.theme.grey};
`;

export const Footer = styled.View`
  flex-direction: column;
  padding: 30px 0 60px 0px;
`;

export const CurrentPageWrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
  margin-bottom: 20px;
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

export const TextContinueButton = styled(OpenSansRegular)`
  color: ${props => props.theme.grey};
  font-size: 18px;
`;
