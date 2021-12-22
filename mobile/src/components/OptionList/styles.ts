import styled from 'styled-components/native';

import { OpenSansRegular, OpenSansBold, ManjariBold } from 'lib/sharedStyles';

export const Container = styled.View`
  flex: 1;
  margin-bottom: 20px;
`;

export const Header = styled(ManjariBold)`
  font-size: 20px;
  margin-bottom: 12px;
`;

export const OptionButton = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const TextContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 15px;
`;

export const Title = styled(OpenSansBold)`
  color: ${props => props.theme.black};
  flex-wrap: wrap;
  margin-bottom: 3px;
`;

export const Subtitle = styled(OpenSansRegular)`
  color: ${props => props.theme.grey};
  flex-wrap: wrap;
`;
