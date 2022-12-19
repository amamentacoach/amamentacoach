import styled from 'styled-components/native';

import FormPickerInput from 'components/FormPickerInput';
import { OpenSansBold, OpenSansRegular } from 'lib/sharedStyles';

export const HeaderText = styled(OpenSansBold)`
  font-size: 18px;
  text-align: center;
`;

export const StateQuestion = styled(OpenSansRegular)`
  font-size: 14px;
`;

export const StatePicker = styled(FormPickerInput)`
  height: 49px;
`;

export const QuestionContainer = styled.View`
  margin: 10px 0;
`;

export const SubmitButtonContainer = styled.View`
  flex: 1;
  align-items: flex-end;
  flex-direction: row;
  margin-top: 20px;
`;
