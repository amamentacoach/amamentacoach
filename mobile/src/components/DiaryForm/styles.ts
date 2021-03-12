import styled from 'styled-components/native';

export const ListContainer = styled.SafeAreaView`
  flex: 1;
`;

export const HeaderBackground = styled.View`
  background-color: #7d5cd7;
  align-items: center;
  width: 100%;
  height: 170px;
`;

export const HeaderText = styled.Text`
  color: #fafafa;
  text-align: center;
  font-family: 'OpenSans-Regular';
  font-size: 18px;
  margin: -150px 24px 10px 24px;
`;

export const ContentContainer = styled.View`
  flex: 1;
  margin: 0px 24px;
  background-color: white;
  border-radius: 5px;
  padding: 24px;
`;
