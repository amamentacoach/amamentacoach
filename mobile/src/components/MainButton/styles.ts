import styled from 'styled-components/native';

interface IButtonProps {
  disabled?: boolean | null;
}

export const Button = styled.TouchableOpacity<IButtonProps>`
  height: 50px;
  width: 100%;
  background-color: ${({ disabled }) => (disabled ? '#c5c2cc' : '#7d5cd7')};
  justify-content: center;
  align-items: center;
  border-radius: 3.6px;
`;

export const TextButton = styled.Text`
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  color: #fafafa;
`;
