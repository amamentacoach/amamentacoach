import styled from 'styled-components/native';

export const HeaderText = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 14px;
  color: ${props => props.theme.grey};
  text-align: center;
  margin: 25px 0;
`;

export const FormContainer = styled.View`
  flex: 1;
`;

export const SubmitButtonContainer = styled.View`
  flex: 1;
  margin-bottom: 15px;
  justify-content: flex-end;
`;
