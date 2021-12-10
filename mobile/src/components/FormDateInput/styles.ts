import styled from 'styled-components/native';

export const LabelText = styled.Text`
  font-family: 'OpenSans-Regular';
  color: ${props => props.theme.black};
  font-size: 14px;
  margin-bottom: 5px;
`;

export const TextInput = styled.TextInput`
  font-family: 'OpenSans-Regular';
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.black};
  padding-left: 20px;
  border-radius: 3.6px;
`;

export const ErrorContainer = styled.View`
  flex: 1;
  min-height: 20px;
  margin-top: 5px;
`;

export const ErrorText = styled.Text`
  font-family: 'OpenSans-Regular';
  color: ${props => props.theme.error};
  font-size: 14px;
`;
