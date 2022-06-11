import styled from 'styled-components/native';

import FormPickerInput from 'components/FormPickerInput';
import { OpenSansRegular, OpenSansBold, Center } from 'lib/sharedStyles';

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

export const ExternalFormContainer = styled(Center)`
  margin: 10px 0;
`;
