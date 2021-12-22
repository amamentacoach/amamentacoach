import { FlatList } from 'react-native';

import { CircleShape, Container } from './styles';

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
  function goToPage(page: number): void {
    if (page >= length) {
      return;
    }
    flatlistRef.current?.scrollToIndex({
      animated: true,
      index: page,
    });
  }

  function createCircles(): JSX.Element[] {
    const circles = [];
    for (let i = 0; i < length; i++) {
      circles.push(
        <CircleShape
          key={i}
          selected={i === selectedIndex}
          onPress={() => goToPage(i)}
        />,
      );
    }
    return circles;
  }

  return <Container>{createCircles()}</Container>;
};

export default ProgressDots;
