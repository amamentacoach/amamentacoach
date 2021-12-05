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

export const CalendarButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: auto;
  bottom: auto;
`;

export const DateText = styled.Text`
  color: ${props => props.theme.grey};
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  text-align: center;
  margin-bottom: 25px;
`;
