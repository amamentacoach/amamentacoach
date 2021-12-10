import { View } from 'react-native';

import ImageWrapper from 'components/ImageWrapper';
import { Line } from 'lib/sharedStyles';

import type { ImageWrapperSourcePropType } from 'components/ImageWrapper';

import {
  Container,
  Header,
  OptionButton,
  Subtitle,
  TextContainer,
  Title,
} from './styles';

import NextIcon from '@assets/images/icons/ic_next.svg';

export interface OptionListEntry {
  image?: {
    source: ImageWrapperSourcePropType;
    width?: number;
    height?: number;
  };
  title: string;
  subtitle?: string;
  onPress: () => void;
}

interface OptionListProps {
  options: OptionListEntry[];
  label?: string;
  displayArrows?: boolean;
}

const OptionsList: React.FC<OptionListProps> = ({
  options,
  label = null,
  displayArrows = false,
}) => {
  return (
    <Container>
      {label && <Header>{label}</Header>}
      {options.map(({ image, title, subtitle, onPress }, index) => (
        <View key={title}>
          <OptionButton activeOpacity={0.7} onPress={onPress}>
            {image?.source && (
              <ImageWrapper
                source={image.source}
                height={image.height ?? 70}
                width={image.width ?? 70}
              />
            )}

            <TextContainer>
              <Title>{title}</Title>
              {subtitle && <Subtitle>{subtitle}</Subtitle>}
            </TextContainer>

            {displayArrows && <NextIcon height={15} width={20} />}
          </OptionButton>
          {index < options.length - 1 && <Line />}
        </View>
      ))}
    </Container>
  );
};

export default OptionsList;
