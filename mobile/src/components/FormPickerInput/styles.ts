import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const LabelText = styled.Text`
  font-family: 'OpenSans-Regular';
  color: ${props => props.theme.black};
  font-size: 14px;
  margin-bottom: 5px;
`;

export const PickerContainer = styled.View`
  border: 1px solid ${props => props.theme.grey};
  margin-bottom: 5px;
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
