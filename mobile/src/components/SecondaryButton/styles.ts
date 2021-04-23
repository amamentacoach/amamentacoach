import styled from 'styled-components/native';

interface IButtonProps {
  disabled?: boolean | null;
}

export const Button = styled.TouchableOpacity<IButtonProps>`
  height: 50px;
  width: 100%;
  background-color: transparent;
  border: 2px solid
    ${({ theme, disabled }) => (disabled ? theme.brightGrey : '#7d5cd7;')};
  justify-content: center;
  align-items: center;
  border-radius: 3.6px;
`;

export const TextButton = styled.Text<IButtonProps>`
  color: ${props => props.theme.primary};
  font-size: 16px;
  font-family: 'OpenSans-Bold';
  color: ${({ theme, disabled }) =>
    disabled ? theme.brightGrey : theme.primary};
`;
