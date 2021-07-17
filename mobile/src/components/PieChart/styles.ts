import { PieChart } from 'react-native-charts-wrapper';
import styled from 'styled-components/native';

interface DescriptionColorProps {
  color: string;
}

export const Container = styled.View`
  flex: 1;
`;

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

export const DescriptionLabel = styled.Text`
  flex: 1;
  font-family: 'OpenSans-Regular';
  font-size: 14px;
  color: ${props => props.theme.grey};
`;
