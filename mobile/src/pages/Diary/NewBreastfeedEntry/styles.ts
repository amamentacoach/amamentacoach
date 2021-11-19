import styled from 'styled-components/native';

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
  padding: 24px;
`;

export const FormContainer = styled.View`
  flex: 1;
`;

export const Header = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 16px;
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

export const OptionHeader = styled.Text`
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  color: ${props => props.theme.grey};
  margin-bottom: 15px;
`;

export const OptionText = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  color: ${props => props.theme.grey};
  margin-left: 15px;
`;

export const ErrorContainer = styled.View`
  flex: 1;
  min-height: 20px;
`;

export const ErrorText = styled.Text`
  font-family: 'OpenSans-Regular';
  color: ${props => props.theme.error};
  font-size: 14px;
`;
