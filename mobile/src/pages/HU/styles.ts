import styled from 'styled-components/native';

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
  padding: 24px;
`;

export const Header = styled.View`
  margin-bottom: 20px;
`;

export const BannerImage = styled.Image`
  width: 100%;
`;
