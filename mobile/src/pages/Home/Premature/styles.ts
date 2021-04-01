import styled from 'styled-components/native';

const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
  padding: 20px 24px 0 24px;
`;

export default ScrollView;
