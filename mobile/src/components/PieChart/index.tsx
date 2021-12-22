import * as React from 'react';
import { processColor } from 'react-native';

import { Flex } from 'lib/sharedStyles';

import {
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
  const colors = ['#D75C5C', '#85E43A', '#30D2F5', '#E5D43B', '#FA931A'];

  return (
    <Flex>
      <PieChartWrapper
        chartDescription={{ text: '' }}
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
        dragDecelerationEnabled={false}
        highlightPerTapEnabled={false}
        holeRadius={0}
        legend={{
          enabled: false,
        }}
        logEnabled={false}
        rotationEnabled={false}
        touchEnabled={false}
        transparentCircleRadius={0}
        usePercentValues
      />

      <Descriptions>
        {data.map(({ description }, index) => (
          <DescriptionContainer key={description}>
            <DescriptionColor color={colors[index]} />
            <DescriptionLabel>{description}</DescriptionLabel>
          </DescriptionContainer>
        ))}
      </Descriptions>
    </Flex>
  );
};

export default PieChart;
