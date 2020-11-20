import styled from 'styled-components/native';

interface IContainerProps {
  width: number;
}

interface ILastPageButtonWrapperProps {
  opacity: number;
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
  width: ${(props) => props.width}px;
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  min-height: 22px;
  margin-top: 30px;
`;

export const SkipButton = styled.TouchableOpacity`
  margin: 0px 30px 0 0;
`;

export const SkipButtonText = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 16px;
`;

export const ContentWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  margin: 24px 24px 0 24px;
`;

export const ContentText = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  text-align: center;
  color: #545454;
`;

export const Footer = styled.View`
  flex-direction: column;
  margin: 0 24px;
  margin-bottom: 30px;
`;

export const CurrentPageWrapper = styled.View`
  margin: 30px 0;
`;

export const LastPageButtonWrapper = styled.View<ILastPageButtonWrapperProps>`
  opacity: ${(props) => props.opacity};
  justify-content: center;
  align-items: center;
`;
