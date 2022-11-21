import styled from 'styled-components/native';

import { Center, ManjariBold, OpenSansRegular } from 'lib/sharedStyles';

interface VideoContainerProps {
  display: boolean;
}

export const PageHeader = styled(OpenSansRegular)`
  margin-bottom: 20px;
  color: ${props => props.theme.grey};
  text-align: center;
`;

export const MoreInfoContainer = styled(Center)`
  margin-right: 10px;
`;

export const VideoContainer = styled.View<VideoContainerProps>`
  justify-content: center;
  display: ${({ display }) => (display ? 'flex' : 'none')};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

export const Header = styled(ManjariBold)`
  margin-top: 26px;
  margin-bottom: 6px;
`;

export const Text = styled(OpenSansRegular)`
  margin-bottom: 30px;
  color: ${props => props.theme.grey};
`;
