import styled from 'styled-components/native';

import { ManjariRegular, OpenSansRegular } from 'lib/sharedStyles';

export const HeaderBackground = styled.View`
  background-color: ${props => props.theme.babyGreen};
  align-items: center;
  width: 100%;
  height: 170px;
`;

export const ContentContainer = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${props => props.theme.white};
  border-radius: 5px;
  margin: -140px 24px 0 24px;
  padding: 12px;
`;

export const ImageContainer = styled.View`
  max-height: 250px;
`;

export const ContentHeader = styled(ManjariRegular)`
  align-items: center;
  text-align: center;
  margin: 20px;
`;

export const ContentText = styled(OpenSansRegular)`
  font-size: 14px;
  text-align: center;
  color: ${props => props.theme.grey};
  margin: 20px;
`;

export const Footer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
`;

export const FirstButtonContainer = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const SecondButtonContainer = styled.View`
  flex: 1;
  margin: 0 20px;
`;
