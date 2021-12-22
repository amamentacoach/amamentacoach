import styled from 'styled-components/native';

import { OpenSansBold, OpenSansRegular } from 'lib/sharedStyles';

export const Container = styled.View`
  margin-top: 20px;
`;

export const Title = styled(OpenSansBold)`
  font-size: 18px;
  text-align: justify;
`;

export const MainText = styled(OpenSansRegular)`
  font-size: 14px;
  text-align: justify;
  line-height: 22px;
  margin-top: 8px;
`;

export const BoldMainText = styled(MainText)`
  font-family: 'OpenSans-Bold';
`;
