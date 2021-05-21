import styled from 'styled-components/native';

interface VideoContainerProps {
  display: boolean;
}

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
  padding: 24px;
`;

export const PageHeader = styled.Text`
  margin-bottom: 20px;
  color: ${props => props.theme.grey};
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  text-align: center;
`;

export const VideoContainer = styled.View<VideoContainerProps>`
  justify-content: center;
  display: ${({ display }) => (display ? 'flex' : 'none')};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

export const Header = styled.Text`
  margin-top: 26px;
  margin-bottom: 6px;
  color: ${props => props.theme.black};
  font-family: 'Manjari-Bold';
  font-size: 18px;
`;

export const Text = styled.Text`
  margin-bottom: 30px;
  color: ${props => props.theme.grey};
  font-family: 'OpenSans-Regular';
  font-size: 16px;
`;
