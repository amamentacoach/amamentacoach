import styled from 'styled-components/native';

interface IContentContainerProps {
  display: boolean;
}

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
`;

export const ContentContainer = styled.View<IContentContainerProps>`
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
  margin: 20px 24px;
`;
