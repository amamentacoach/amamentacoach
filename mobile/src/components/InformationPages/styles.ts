import styled from 'styled-components/native';

interface IContainerProps {
  width: number;
}

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
`;

export const ListContainer = styled.SafeAreaView`
  flex: 1;
`;

export const PageContainer = styled.View<IContainerProps>`
  width: ${({ width }) => width}px;
  flex: 1;
`;
