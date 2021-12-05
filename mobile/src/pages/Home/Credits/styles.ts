import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 24px;
`;

export const TextContainer = styled.View`
  margin-bottom: 15px;
`;

export const Text = styled.Text`
  color: ${props => props.theme.grey};
  font-family: 'OpenSans-Regular';
  font-size: 18px;
  line-height: 24px;
`;

export const Link = styled(Text)`
  text-decoration: underline;
`;
