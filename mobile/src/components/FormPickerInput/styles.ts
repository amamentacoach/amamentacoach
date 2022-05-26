import styled from 'styled-components/native';

import { OpenSansRegular } from 'lib/sharedStyles';

export const Container = styled.View`
  width: 100%;
`;

export const LabelText = styled(OpenSansRegular)`
  font-size: 14px;
  margin-bottom: 5px;
`;

export const PickerContainer = styled.View`
  border: 1px solid ${props => props.theme.grey};
`;
