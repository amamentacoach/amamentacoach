import styled from 'styled-components/native';

export const ContentWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  margin: 24px 24px 0 24px;
`;

export const ContentText = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  color: ${props => props.theme.grey};
  margin: 20px 0 10px 0;
`;
