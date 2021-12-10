import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin-bottom: 20px;
`;

export const Header = styled.Text`
  font-family: 'Manjari-Bold';
  font-size: 20px;
  margin-bottom: 12px;
`;

export const OptionButton = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const TextContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 15px;
`;

export const Title = styled.Text`
  color: ${props => props.theme.black};
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  flex-wrap: wrap;
  margin-bottom: 3px;
`;

export const Subtitle = styled.Text`
  color: ${props => props.theme.grey};
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  flex-wrap: wrap;
`;
