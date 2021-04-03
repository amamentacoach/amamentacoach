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
  width: ${({ width }) => width}px;
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

export const ContentWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 24px;
`;

export const ImageContainer = styled.View`
  align-items: center;
  margin: 70px 0;
`;

export const ContentText = styled.Text`
  flex: 1;
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  text-align: center;
  color: #545454;
`;

export const Footer = styled.View`
  flex-direction: column;
  margin: 0 24px 30px 24px;
`;

export const CurrentPageWrapper = styled.View`
  margin: 40px 0;
`;

export const LastPageBox = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  border: 2px solid #7d5cd7;
  border-radius: 3.6px;
`;

export const HeaderLastPageBox = styled.Text`
  color: #7d5cd7;
  text-align: center;
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  margin: 10px 0;
`;

export const ColoredText = styled.Text`
  color: #7d5cd7;
  text-align: center;
  font-family: 'OpenSans-Bold';
  font-size: 16px;
`;

export const LastPageButtonWrapper = styled.View<ILastPageButtonWrapperProps>`
  opacity: ${({ opacity }) => opacity};
  justify-content: center;
  align-items: center;
`;
