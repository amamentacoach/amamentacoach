import styled from 'styled-components/native';

import { OpenSansRegular, OpenSansBold } from 'lib/sharedStyles';

export const HeaderText = styled(OpenSansBold)`
  font-size: 18px;
  text-align: center;
`;

export const HeaderSubText = styled(OpenSansRegular)`
  font-size: 14px;
  margin: 0 auto 15px auto;
  text-align: center;
  padding-top: 20px;
`;

export const FormContainer = styled.View`
  flex: 1;
  margin-bottom: 6px;
`;

export const SubmitButtonContainer = styled.View`
  flex: 1;
  align-items: flex-end;
  flex-direction: row;
  margin-top: 15px;
`;
