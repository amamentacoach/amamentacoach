import styled from 'styled-components/native';

import { OpenSansBold, OpenSansRegular } from 'lib/sharedStyles';

export const AddQuestionButton = styled.TouchableOpacity`
  margin-right: 18px;
`;

export const FlatlistContainer = styled.View`
  flex: 1;
  margin: 24px 24px 0px 24px;
`;

export const Question = styled(OpenSansBold)`
  font-size: 18px;
  margin-bottom: 5px;
`;

export const Answer = styled(OpenSansRegular)`
  color: ${props => props.theme.grey};
`;

export const LoadingIndicator = styled.ActivityIndicator`
  margin-bottom: 20px;
`;
