import styled from 'styled-components/native';

interface TextInputProps {
  centerText: boolean;
}

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const LabelText = styled.Text`
  font-family: 'OpenSans-Regular';
  color: #161026;
  font-size: 14px;
  margin-bottom: 5px;
`;

export const TextInput = styled.TextInput<TextInputProps>`
  font-family: 'OpenSans-Regular';
  background-color: #e7e7e7;
  color: #161026;
  border-radius: 3.6px;
  padding-left: ${({ centerText }) => (centerText ? 0 : 20)}px;
  text-align: ${({ centerText }) => (centerText ? 'center' : 'left')};
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
