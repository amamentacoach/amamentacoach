import styled from 'styled-components/native';

import { OpenSansBold, OpenSansRegular } from 'lib/sharedStyles';

export const Header = styled(OpenSansBold)`
  color: ${props => props.theme.black};
  font-size: 18px;
  margin-bottom: 10px;
`;

export const Question = styled(OpenSansRegular)`
  color: ${props => props.theme.primary};
  font-size: 18px;
  margin-bottom: 5px;
`;

export const AnswerHeader = styled(OpenSansRegular)`
  margin-bottom: 4px;
`;

export const Answer = styled(OpenSansRegular)`
  margin-left: 14px;
`;
