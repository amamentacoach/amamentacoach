import styled from 'styled-components/native';

interface ContainerProps {
  width: number;
}

export const ListContainer = styled.SafeAreaView`
  flex: 1;
`;

export const PageContainer = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))<ContainerProps>`
  flex: 1;
  width: ${({ width }) => width}px;
`;
