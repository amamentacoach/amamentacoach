import styled from 'styled-components/native';

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 274px;
`;

export const TextModal = styled.Text`
  color: #161026;
  text-align: left;
  font-family: 'OpenSans-Regular';
  font-size: 16px;
`;

export const HeaderBackground = styled.View`
  background-color: #7d5cd7;
  align-items: center;
  width: 100%;
  height: 70%;
`;

export const HeaderText = styled.Text`
  font-family: 'Manjari-Bold';
  font-size: 24px;
  color: #fafafa;
  margin-top: 30px;
`;

export const BannerImage = styled.ImageBackground`
  flex: 1;
  margin: -112px 24px 0 24px;
  align-items: center;
  justify-content: flex-end;
`;

export const HUButton = styled.TouchableOpacity`
  background-color: #30d2f5;
  height: 30px;
  width: 185px;
  margin-bottom: 21px;
  justify-content: center;
  align-items: center;
`;

export const HUButtonText = styled.Text`
  font-family: 'Manjari-Bold';
  font-size: 14px;
  color: #fafafa;
`;

export const ContentContainer = styled.View`
  flex: 1;
  margin: 30px 24px 0 24px;
`;

export const ContentHeader = styled.Text`
  font-family: 'Manjari-Bold';
  font-size: 20px;
  margin-bottom: 20px;
`;

export const Option = styled.View`
  margin-bottom: 20px;
`;

export const ContentOption = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const ContentImage = styled.Image`
  height: 100px;
  width: 100px;
`;

export const ContentTextContainer = styled.View`
  flex: 1;
  justify-content: space-around;
  margin-left: 15px;
`;

export const ContentTitle = styled.Text`
  color: #000000;
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  flex-wrap: wrap;
  margin-bottom: 3px;
`;

export const ContentSeparator = styled.View`
  height: 1px;
  width: 100%;
  background-color: #979797;
  opacity: 0.25;
  margin-top: 20px;
`;
