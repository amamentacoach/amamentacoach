import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { ManjariBold } from 'lib/sharedStyles';

export const Header = styled.View`
  height: 184px;
`;

export const HeaderBackground = styled.View`
  background-color: ${props => props.theme.babyPink};
  height: 95%;
`;

export const HeaderText = styled(ManjariBold)`
  font-size: 24px;
  align-self: center;
  color: ${props => props.theme.black};
  margin: 10px 0;
`;

export const Banner = styled(TouchableOpacity)`
  background-color: ${props => props.theme.primary};
  padding: 12px 0;
  justify-content: center;
  align-items: center;
  margin: 0 24px;
`;

export const BannerButtonTextContainer = styled.View`
  background-color: ${props => props.theme.accent};
  height: 40px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const BannerButtonText = styled(ManjariBold)`
  font-size: 14px;
  color: ${props => props.theme.white};
`;

export const ContentContainer = styled.View`
  flex: 1;
  margin: 80px 24px 0 24px;
`;

export const ContentHeader = styled(ManjariBold)`
  margin-bottom: 20px;
`;
