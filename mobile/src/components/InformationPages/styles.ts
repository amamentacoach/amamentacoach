import styled from 'styled-components/native';

import { ScrollView } from 'lib/sharedStyles';

interface ContainerProps {
  width: number;
}

export const PageContainer = styled(ScrollView)<ContainerProps>`
  width: ${({ width }) => width}px;
`;
