import styled from 'styled-components/native';

import { OpenSansRegular } from 'lib/sharedStyles';

export const OptionText = styled(OpenSansRegular)`
  color: ${props => props.theme.grey};
  font-size: 18px;
`;
