import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const LabelText = styled.Text`
  font-family: 'OpenSans-Regular';
  color: #161026;
  font-size: 14px;
  margin-bottom: 5px;
`;

export const PickerContainer = styled.View`
  border: 1px solid #545454;
  margin-bottom: 5px;
`;

export const TextOption = styled.Text`
  font-family: 'OpenSans-Regular';
  margin-left: 15px;
  font-size: 16px;
`;

export const ErrorContainer = styled.View`
  flex: 1;
  min-height: 20px;
  margin-top: 5px;
`;

export const ErrorText = styled.Text`
  font-family: 'OpenSans-Regular';
  color: #ea3c3c;
  font-size: 14px;
`;
