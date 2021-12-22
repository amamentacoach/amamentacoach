import styled from 'styled-components/native';

import { ManjariBold, OpenSansRegular } from 'lib/sharedStyles';

export const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const HeaderTitle = styled(ManjariBold)`
  text-align: center;
`;

export const CalendarButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: auto;
  bottom: auto;
`;

export const DateText = styled(OpenSansRegular)`
  color: ${props => props.theme.grey};
  text-align: center;
  margin-bottom: 25px;
`;
