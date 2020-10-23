import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))``;

export const Header = styled.View`
  width: 100%;
  height: 254px;
`;

export const HeaderBackground = styled.View`
  background-color: #7d5cd7;
  align-items: center;
  width: 100%;
  height: 170px;
  padding: 0 24px;
`;

export const BannerImage = styled.Image`
  width: 100%;
`;

export const HeaderText = styled.Text`
  font-family: 'Manjari-Bold';
  font-size: 24px;
  color: #fafafa;
  margin-top: 30px;
`;

export const HUButton = styled.TouchableOpacity`
  background-color: #30d2f5;
  height: 30px;
  width: 185px;
  margin-top: -48px;
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
  margin: 24px 24px 0 24px;
`;

export const ContentHeader = styled.Text`
  font-family: 'Manjari-Bold';
  font-size: 20px;
`;

export const Option = styled.TouchableOpacity`
  flex: 1;
`;

export const ContentOption = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  flex-direction: row;
`;

export const ContentImage = styled.Image`
  height: 100px;
  width: 100px;
`;

export const ContentTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 15px;
`;

export const ContentTitle = styled.Text`
  color: #000000;
  font-family: 'Open-Sans-Bold';
  font-size: 16px;
  flex-wrap: wrap;
`;

export const ContentSubtitle = styled.Text`
  color: #545454;
  font-family: 'Open-Sans-Regular';
  font-size: 16px;
  flex-wrap: wrap;
`;

export const ContentSeparator = styled.View`
  height: 1px;
  width: 100%;
  background-color: #979797;
  opacity: 0.25;
  margin: 20px 0;
`;
