import styled from 'styled-components/native';

interface NextButtonProps {
  disabled: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  margin: 0 auto;
  padding: 20px;
`;

export const HeaderText = styled.Text`
  font-size: 18px;
  color: #7d5cd7;
  text-align: center;
`;

export const HeaderSubText = styled.Text`
  font-size: 14px;
  margin: 0 auto;
  text-align: center;
  padding-top: 20px;
`;

export const FormContainer = styled.View`
  flex: 1;
  margin: 0 24px;
`;

export const SubmitButton = styled.TouchableOpacity<NextButtonProps>`
  height: 50px;
  background-color: ${(props) => (props.disabled ? '#c5c2cc' : '#7d5cd7')};
  color: #fafafa;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 15px;
  width: 100%;
`;

export const TextSubmitButton = styled.Text`
  color: #fafafa;
  font-size: 16px;
`;
