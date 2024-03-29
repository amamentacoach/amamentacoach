import { PieChart } from 'react-native-charts-wrapper';
import styled from 'styled-components/native';

import { OpenSansRegular } from 'lib/sharedStyles';

interface DescriptionColorProps {
  color: string;
}

export const PieChartWrapper = styled(PieChart)`
  flex: 1;
  height: 230px;
`;

export const Descriptions = styled.View`
  margin-top: 30px;
`;

export const DescriptionContainer = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
  align-items: center;
`;

export const DescriptionColor = styled.View<DescriptionColorProps>`
  background-color: ${({ color }) => color};
  width: 18px;
  height: 18px;
  border-radius: 3.6px;
  margin-right: 10px;
`;

export const DescriptionLabel = styled(OpenSansRegular)`
  flex: 1;
  font-size: 14px;
  color: ${props => props.theme.grey};
`;
