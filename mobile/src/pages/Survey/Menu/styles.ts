import styled from 'styled-components/native';

export const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const HeaderTitle = styled.Text`
  color: ${props => props.theme.black};
  font-family: 'Manjari-Bold';
  font-size: 18px;
  text-align: center;
`;
