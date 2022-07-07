import styled from 'styled-components/native';

import { OpenSansBold, OpenSansRegular } from 'lib/sharedStyles';

export const Header = styled.View`
  margin: 0 auto;
  padding: 20px;
`;

export const HeaderText = styled(OpenSansBold)`
  font-size: 18px;
  text-align: center;
`;

export const HeaderSubText = styled(OpenSansRegular)`
  font-size: 14px;
  margin: 0 auto;
  text-align: center;
  padding-top: 20px;
`;

export const QuestionContainer = styled.View`
  margin: 10px 0;
`;

export const SubmitButtonContainer = styled.View`
  flex: 1;
  padding: 15px 0px;
  flex-direction: column-reverse;
`;
