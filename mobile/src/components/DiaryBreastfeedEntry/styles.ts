import styled from 'styled-components/native';

import { OpenSansBold } from 'lib/sharedStyles';

export const Breastfeed = styled.View`
  border: 2px ${props => props.theme.brightGrey} solid;
  border-radius: 3.6px;
  padding: 15px;
  margin-bottom: 10px;
`;

export const BabyName = styled(OpenSansBold)`
  font-size: 18px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const TextContainer = styled.View`
  flex-direction: row;
`;
