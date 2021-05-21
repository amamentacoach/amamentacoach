import styled from 'styled-components/native';

interface OptionProps {
  selected: boolean;
}

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

export const ModalOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
`;

export const TextModal = styled.Text`
  color: ${props => props.theme.black};
  text-align: left;
  font-family: 'OpenSans-Regular';
  font-size: 16px;
`;

export const OuterCircle = styled.View<OptionProps>`
  border: 1.4px solid
    ${({ theme, selected }) => (selected ? theme.babyPink : theme.brightGrey)};
  background-color: transparent;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

export const InnerCircle = styled.View<OptionProps>`
  background-color: ${({ theme, selected }) =>
    selected ? theme.babyPink : 'transparent'};
  width: 10px;
  height: 10px;
  border-radius: 5px;
`;

export const LocationContainer = styled.View`
  margin-top: 10px;
`;

export const HeaderBackground = styled.View`
  background-color: ${props => props.theme.babyPink};
  align-items: center;
  width: 100%;
  height: 70%;
`;

export const HeaderText = styled.Text`
  font-family: 'Manjari-Bold';
  font-size: 24px;
  color: ${props => props.theme.white};
  margin-top: 30px;
`;

export const BannerImage = styled.ImageBackground`
  margin: -124px 24px 0 24px;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;

export const HUButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.accent};
  height: 40px;
  width: 100%;
  margin-bottom: 8px;
  justify-content: center;
  align-items: center;
`;

export const HUButtonText = styled.Text`
  font-family: 'Manjari-Bold';
  font-size: 14px;
  color: ${props => props.theme.white};
`;

export const ContentContainer = styled.View`
  flex: 1;
  margin: 80px 24px 0 24px;
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

export const ContentTextContainer = styled.View`
  flex: 1;
  justify-content: space-around;
  margin-left: 15px;
`;

export const ContentTitle = styled.Text`
  color: ${props => props.theme.black};
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  flex-wrap: wrap;
  margin-bottom: 3px;
`;

export const ContentSeparator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${props => props.theme.brightGrey};
  opacity: 0.25;
  margin-top: 20px;
`;
