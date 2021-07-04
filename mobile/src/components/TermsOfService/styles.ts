import styled from 'styled-components/native';

export const Container = styled.View`
  margin-top: 20px;
`;

export const Title = styled.Text`
  font-family: 'OpenSans-Bold';
  font-size: 18px;
  text-align: justify;
  color: ${props => props.theme.primary};
`;

export const MainText = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 14px;
  text-align: justify;
  line-height: 22px;
  margin-top: 8px;
`;

export const BoldMainText = styled(MainText)`
  font-family: 'OpenSans-Bold';
`;
