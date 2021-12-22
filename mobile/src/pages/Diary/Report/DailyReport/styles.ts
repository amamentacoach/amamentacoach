import styled from 'styled-components/native';

import { OpenSansBold } from 'lib/sharedStyles';

export const Header = styled(OpenSansBold)`
  color: ${props => props.theme.black};
  font-size: 18px;
`;

export const EntryContainer = styled.View`
  margin-bottom: 10px;
`;

export const NoRegistriesMessage = styled(OpenSansBold)`
  font-size: 18px;
`;
