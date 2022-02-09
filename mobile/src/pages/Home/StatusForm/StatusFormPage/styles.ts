import styled from 'styled-components/native';

import { OpenSansBold, OpenSansRegular } from 'lib/sharedStyles';

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

export const HeaderText = styled(OpenSansRegular)`
  text-align: center;
  font-size: 18px;
  margin: -150px 24px 10px 24px;
`;

export const ContentContainer = styled.View`
  margin: 0 24px;
  padding: 0 24px;
  background-color: ${props => props.theme.white};
  border-radius: 5px;
  flex: 1;
`;

export const InfoContainer = styled.View`
  margin: 20px 0;
`;

export const ColoredInfoText = styled(OpenSansBold)`
  color: ${props => props.theme.darkBlue};
  text-align: center;
`;

export const ValuesInfoText = styled(OpenSansRegular)`
  text-align: center;
`;

export const QuestionText = styled(OpenSansRegular)`
  text-align: center;
  margin-bottom: 15px;
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin: 10px 0;
  flex-shrink: 1;
`;

export const FirstButtonContainer = styled.View`
  flex: 1;
  margin-right: 15px;
`;
