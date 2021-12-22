import styled from 'styled-components/native';

import { ManjariBold } from 'lib/sharedStyles';

export const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const HeaderTitle = styled(ManjariBold)`
  text-align: center;
`;
