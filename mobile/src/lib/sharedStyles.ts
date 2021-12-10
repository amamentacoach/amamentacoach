import styled from 'styled-components/native';

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
`;

export const PaddedScrollView = styled(ScrollView)`
  padding: 24px;
`;

export const Flex = styled.View`
  flex: 1;
`;

export const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Line = styled.View`
  background-color: ${props => props.theme.grey};
  height: 1px;
  margin: 20px 0;
  opacity: 0.25;
  width: 100%;
`;
