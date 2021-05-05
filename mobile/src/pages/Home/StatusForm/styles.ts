import styled from 'styled-components/native';

interface ScrollViewProps {
  width: number;
}

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))<ScrollViewProps>`
  flex: 1;
  width: ${({ width }) => width}px;
`;

export const HeaderInfoModal = styled.Text`
  color: ${props => props.theme.babyBlue};
  text-align: center;
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  margin-bottom: 10px;
`;

export const TextInfoModal = styled.Text`
  color: black;
  text-align: center;
  font-family: 'OpenSans-Regular';
  font-size: 16px;
`;

export const ColoredText = styled.Text`
  color: ${props => props.theme.babyBlue};
  text-align: center;
  font-family: 'OpenSans-Bold';
  font-size: 16px;
`;

export const InfoButton = styled.TouchableOpacity`
  margin-right: 20px;
`;

export const HeaderBackground = styled.View`
  background-color: ${props => props.theme.babyBlue};
  align-items: center;
  width: 100%;
  height: 170px;
`;

export const HeaderText = styled.Text`
  color: ${props => props.theme.black};
  text-align: center;
  font-family: 'OpenSans-Regular';
  font-size: 18px;
  margin: -150px 24px 10px 24px;
`;

export const ContentContainer = styled.View`
  flex: 1;
  margin: 0px 24px;
  background-color: ${props => props.theme.white};
  border-radius: 5px;
  padding: 24px;
`;

export const QuestionContainer = styled.View`
  flex: 1;
`;

export const QuestionText = styled.Text`
  text-align: center;
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  margin: 15px 0;
  color: ${props => props.theme.black};
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-top: 10px;
`;

export const FirstButtonContainer = styled.View`
  flex: 1;
  margin-right: 15px;
`;

export const SecondButtonContainer = styled.View`
  flex: 1;
`;
