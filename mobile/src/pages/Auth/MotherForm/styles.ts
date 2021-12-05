import styled from 'styled-components/native';

export const HeaderText = styled.Text`
  font-family: 'OpenSans-Bold';
  font-size: 18px;
  color: ${props => props.theme.primary};
  text-align: center;
`;

export const HeaderSubText = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 14px;
  margin: 0 auto 15px auto;
  text-align: center;
  padding-top: 20px;
`;

export const FormContainer = styled.View`
  flex: 1;
  margin-bottom: 20px;
`;

export const DDDContainer = styled.View`
  margin-right: 4px;
  width: 70px;
`;

export const PhoneInputContainer = styled.View`
  flex: 4;
`;

export const SubOptionsContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const OptionPickerContainer = styled.View`
  flex: 1;
`;

export const FirstSubOptionContainer = styled.View`
  flex: 1;
  margin-right: 4px;
`;

export const SecondSubOptionContainer = styled.View`
  flex: 1;
`;

export const SubmitButtonContainer = styled.View`
  flex: 1;
  align-items: flex-end;
  flex-direction: row;
  padding: 15px 0px;
`;
