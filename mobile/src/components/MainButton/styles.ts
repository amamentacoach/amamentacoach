import styled from 'styled-components/native';

interface IButtonProps {
  disabled?: boolean | null;
}

export const Button = styled.TouchableOpacity<IButtonProps>`
  height: 50px;
  width: 100%;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.brightGrey : theme.primary};
  justify-content: center;
  align-items: center;
  border-radius: 3.6px;
`;

export const TextButton = styled.Text`
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  color: ${props => props.theme.white};
`;
