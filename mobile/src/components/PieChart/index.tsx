import * as React from 'react';
import { processColor } from 'react-native';

import {
  Container,
  DescriptionColor,
  DescriptionContainer,
  DescriptionLabel,
  Descriptions,
  PieChartWrapper,
} from './styles';

interface PieChartProps {
  label: string;
  data: { description: string; value: number }[];
}

const PieChart: React.FC<PieChartProps> = ({ label, data }) => {
  const colors = ['#FA931A', '#85E43A', '#D75C5C', '#E5D43B', '#30D2F5'];

  return (
    <Container>
      <PieChartWrapper
        data={{
          dataSets: [
            {
              label,
              values: data.map(answer => answer.value),
              config: {
                colors: colors.map(color => processColor(color) as number),
                drawValues: true,
                valueTextSize: 14,
                valueTextColor: processColor('#161026') as number,
                valueFormatter: "#'%'",
              },
            },
          ],
        }}
        legend={{
          enabled: false,
        }}
        chartDescription={{ text: '' }}
        usePercentValues
        rotationEnabled={false}
        dragDecelerationEnabled={false}
        highlightPerTapEnabled={false}
        touchEnabled={false}
        logEnabled={false}
        holeRadius={0}
        transparentCircleRadius={0}
      />

      <Descriptions>
        {data.map(({ description }, index) => (
          <DescriptionContainer key={description}>
            <DescriptionColor color={colors[index]} />
            <DescriptionLabel>{description}</DescriptionLabel>
          </DescriptionContainer>
        ))}
      </Descriptions>
    </Container>
  );
};

export default PieChart;
