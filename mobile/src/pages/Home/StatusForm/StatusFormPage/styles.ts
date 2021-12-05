import styled from 'styled-components/native';

interface ScrollViewProps {
  width: number;
}

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))<ScrollViewProps>`
  flex: 1;
  color: ${props => props.theme.white};
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
  margin: 0 24px;
  padding: 0 24px;
  background-color: ${props => props.theme.white};
  border-radius: 5px;
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
  margin: 10px 0;
  flex: 1;
`;

export const FirstButtonContainer = styled.View`
  flex: 1;
  margin-right: 15px;
`;

export const SecondButtonContainer = styled.View`
  flex: 1;
`;
