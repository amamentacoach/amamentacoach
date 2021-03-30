import styled from 'styled-components/native';

interface IContainerProps {
  width: number;
}

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
`;

export const ListContainer = styled.SafeAreaView`
  flex: 1;
`;

export const PageContainer = styled.View<IContainerProps>`
  width: ${({ width }) => width}px;
  flex: 1;
`;

export const HeaderBackground = styled.View`
  background-color: #7d5cd7;
  align-items: center;
  width: 100%;
  height: 170px;
`;

export const ContentContainer = styled.View`
  flex: 1;
  align-items: center;
  margin: -140px 24px 0 24px;
  background-color: white;
  border-radius: 5px;
`;

export const ContentHeader = styled.Text`
  align-items: center;
  text-align: center;
  font-family: 'Manjari-Regular';
  font-size: 18px;
  margin: 30px;
`;

export const ContentImage = styled.Image`
  margin: 0 24px;
`;

export const ContentText = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 14px;
  text-align: center;
  color: #545454;
  margin: 20px;
`;

export const Footer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 15px;
`;

export const FirstButtonContainer = styled.View`
  flex: 1;
  margin-left: 20px;
`;
export const SecondButtonContainer = styled.View`
  flex: 1;
  margin: 0 20px;
`;
