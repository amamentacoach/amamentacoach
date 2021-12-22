import styled from 'styled-components/native';

import { OpenSansRegular } from 'lib/sharedStyles';

export const HeaderText = styled(OpenSansRegular)`
  color: ${props => props.theme.grey};
  text-align: center;
  margin: 25px 24px;
`;

export const FormContainer = styled.View`
  flex: 1;
  margin: 0 24px;
`;

export const SubmitButtonContainer = styled.View`
  flex: 1;
  margin-bottom: 15px;
  justify-content: flex-end;
`;
