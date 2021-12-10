import styled from 'styled-components/native';

export const Header = styled.Text`
  color: black;
  font-family: 'OpenSans-Bold';
  font-size: 18px;
`;

export const EntryContainer = styled.View`
  margin-bottom: 10px;
`;

export const NoRegistriesMessage = styled.Text`
  color: ${props => props.theme.primary};
  font-family: 'OpenSans-Bold';
  font-size: 18px;
`;
