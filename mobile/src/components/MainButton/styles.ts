import styled from 'styled-components/native';

interface ButtonProps {
  disabled: boolean | null | undefined;
}

export const Container = styled.View`
  flex: 1;
`;

export const Button = styled.TouchableOpacity<ButtonProps>`
  height: 50px;
  background-color: ${(props) => (props.disabled ? '#c5c2cc' : '#7d5cd7')};
  color: #fafafa;
  justify-content: center;
  align-items: center;
  margin: auto 0 15px 0;
`;

export const TextButton = styled.Text`
  color: #fafafa;
  font-size: 16px;
`;
