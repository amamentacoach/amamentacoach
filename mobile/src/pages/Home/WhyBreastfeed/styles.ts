import styled from 'styled-components/native';

import { OpenSansBold, OpenSansRegular } from 'lib/sharedStyles';

export const ContentText = styled(OpenSansRegular)`
  text-align: center;
  color: ${props => props.theme.grey};
`;

export const ColoredContentText = styled(OpenSansBold)`
  text-align: center;
`;
