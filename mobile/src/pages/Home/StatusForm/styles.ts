import styled from 'styled-components/native';

export const HeaderInfoModal = styled.Text`
  color: ${props => props.theme.babyBlue};
  text-align: center;
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  margin-bottom: 10px;
`;

export const TextInfoModal = styled.Text`
  color: black;
  text-align: center;
  font-family: 'OpenSans-Regular';
  font-size: 16px;
`;

export const ColoredText = styled.Text`
  color: ${props => props.theme.babyBlue};
  text-align: center;
  font-family: 'OpenSans-Bold';
  font-size: 16px;
`;

export const InfoButton = styled.TouchableOpacity`
  margin-right: 20px;
`;
