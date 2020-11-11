import styled from 'styled-components/native';

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  padding: 20px 24px 0 24px;
`;

export const Header = styled.View`
  margin-bottom: 20px;
`;

export const BannerImage = styled.Image`
  width: 100%;
`;
