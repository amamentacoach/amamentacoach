import styled from 'styled-components/native';

import { OpenSansBold, OpenSansRegular } from 'lib/sharedStyles';

export const Header = styled(OpenSansRegular)`
  color: ${props => props.theme.grey};
  margin-bottom: 15px;
  text-align: center;
`;

export const FormContent = styled.View`
  align-content: flex-start;
`;

export const SubmitButtonContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
`;

export const MultipleOptionContainer = styled.View`
  flex-direction: row;
`;

export const FirstOption = styled.TouchableOpacity`
  flex-direction: row;
  margin-right: 70px;
`;

export const SecondOption = styled.TouchableOpacity`
  flex-direction: row;
`;

export const OptionHeader = styled(OpenSansBold)`
  color: ${props => props.theme.grey};
  margin-bottom: 15px;
`;

export const OptionText = styled(OpenSansRegular)`
  color: ${props => props.theme.grey};
  margin-left: 15px;
`;

export const ErrorContainer = styled.View`
  flex: 1;
  min-height: 20px;
`;
