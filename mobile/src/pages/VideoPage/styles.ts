import styled from 'styled-components/native';

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
`;

export const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export const VideoContainer = styled.View`
  margin: 20px 24px;
`;
