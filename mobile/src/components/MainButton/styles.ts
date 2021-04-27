import styled from 'styled-components/native';

interface IButtonProps {
  color?: string;
  disabled?: boolean | null;
}

export const Button = styled.TouchableOpacity<IButtonProps>`
  height: 50px;
  width: 100%;
  background-color: ${({ theme, color, disabled }) => {
    if (disabled) {
      return theme.brightGrey;
    }
    return color || theme.primary;
  }};
  justify-content: center;
  align-items: center;
  border-radius: 3.6px;
`;

export const TextButton = styled.Text<IButtonProps>`
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  color: ${({ theme, color, disabled }) => {
    if (disabled || !color) {
      return theme.white;
    }
    return theme.black;
  }};
`;
