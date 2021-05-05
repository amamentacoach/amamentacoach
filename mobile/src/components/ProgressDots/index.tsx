import React from 'react';
import { FlatList } from 'react-native';

import { Container, CircleShape } from './styles';

interface ProgressDotsProps {
  selectedIndex: number;
  length: number;
  flatlistRef: React.RefObject<FlatList>;
}

const ProgressDots: React.FC<ProgressDotsProps> = ({
  selectedIndex,
  length,
  flatlistRef,
}) => {
  function goToPage(page: number) {
    if (page >= length) {
      return;
    }
    flatlistRef.current?.scrollToIndex({
      animated: true,
      index: page,
    });
  }

  function createCircles() {
    const circles = [];
    for (let i = 0; i < length; i++) {
      circles.push(
        <CircleShape
          onPress={() => goToPage(i)}
          key={i}
          selected={i === selectedIndex}
        />,
      );
    }
    return circles;
  }

  return <Container>{createCircles()}</Container>;
};

export default ProgressDots;
