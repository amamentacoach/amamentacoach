import styled from 'styled-components/native';

interface ContentContainerProps {
  display: boolean;
}

export const ContentContainer = styled.View<ContentContainerProps>`
  flex: 1;
  justify-content: center;
  display: ${({ display }) => (display ? 'flex' : 'none')};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const VideoContainer = styled.View`
  margin: 0px 24px;
`;
