import styled from 'styled-components/native';

export const AddQuestionButton = styled.TouchableOpacity`
  margin-right: 18px;
`;

export const FlatlistContainer = styled.View`
  flex: 1;
  margin: 24px 24px 0px 24px;
`;

export const Question = styled.Text`
  font-family: 'OpenSans-Bold';
  font-size: 18px;
  color: ${props => props.theme.primary};
  margin-bottom: 5px;
`;

export const Answer = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  color: ${props => props.theme.grey};
`;

export const LoadingIndicator = styled.ActivityIndicator`
  margin-bottom: 20px;
`;
