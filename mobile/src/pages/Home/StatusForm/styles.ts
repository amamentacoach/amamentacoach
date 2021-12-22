import styled from 'styled-components/native';

import { OpenSansBold, OpenSansRegular } from 'lib/sharedStyles';

export const ColoredText = styled(OpenSansBold)`
  color: ${props => props.theme.babyBlue};
  text-align: center;
`;

export const HeaderInfoModal = styled(ColoredText)`
  margin-bottom: 10px;
`;

export const TextInfoModal = styled(OpenSansRegular)`
  text-align: center;
`;

export const InfoButton = styled.TouchableOpacity`
  margin-right: 20px;
`;
