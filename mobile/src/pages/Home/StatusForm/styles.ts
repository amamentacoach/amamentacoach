import styled from 'styled-components/native';

import { OpenSansBold, OpenSansRegular } from 'lib/sharedStyles';

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
  padding: 24px;
  background-color: ${props => props.theme.white};
  flex: 1;
`;

export const HighlightedText = styled(OpenSansBold)`
  color: ${props => props.theme.darkBlue};
  text-align: center;
`;

export const TextContainer = styled.View`
  margin-bottom: 20px;
`;

export const CenterAlignedText = styled(OpenSansRegular)`
  text-align: center;
  font-size: 14px;
`;

export const ValuesInfoText = styled(OpenSansRegular)`
  text-align: center;
  margin-bottom: 2px;
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  flex-shrink: 1;
`;
