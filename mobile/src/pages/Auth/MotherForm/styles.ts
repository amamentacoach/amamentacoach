import styled from 'styled-components/native';

import { OpenSansBold } from 'lib/sharedStyles';

export const HeaderText = styled(OpenSansBold)`
  font-size: 18px;
  text-align: center;
`;

export const FormContainer = styled.View`
  flex: 1;
  margin-bottom: 20px;
`;

export const FirstSubOptionContainer = styled.View`
  flex: 1;
  margin-right: 4px;
`;

export const SubmitButtonContainer = styled.View`
  flex: 1;
  align-items: flex-end;
  flex-direction: row;
  padding: 15px 0px;
`;
