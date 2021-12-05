import styled from 'styled-components/native';

import { ScrollView } from 'lib/SharedStyles';

interface ContainerProps {
  width: number;
}

export const PageContainer = styled(ScrollView)<ContainerProps>`
  width: ${({ width }) => width}px;
`;
