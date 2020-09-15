import React from 'react';

import { Container, CircleShape } from './styles';

interface ProgressDotsProps {
  selectedIndex: number;
  length: number;
  navigateToPage: (page: number) => void;
}

const ProgressDots: React.FC<ProgressDotsProps> = ({
  selectedIndex,
  length,
  navigateToPage,
}) => {
  function createCircles() {
    const circles = [];
    for (let i = 0; i < length; i++) {
      circles.push(
        <CircleShape
          onPress={() => navigateToPage(i)}
          key={i}
          selected={i === selectedIndex}
        />,
      );
    }
    return circles;
  }

  return (
    <>
      <Container>{createCircles()}</Container>
    </>
  );
};

export default ProgressDots;
