import ImageWrapper from 'components/ImageWrapper';

import type { ImageWrapperSourcePropType } from 'components/ImageWrapper';

import {
  ContentContainer,
  ContentHeader,
  ContentOptionButton,
  ContentSeparator,
  ContentSubtitle,
  ContentTextContainer,
  ContentTitle,
  Option,
} from './styles';

import NextIcon from '@assets/images/icons/ic_next.svg';

export interface OptionListEntry {
  image?: ImageWrapperSourcePropType;
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
    <ContentContainer>
      {label && <ContentHeader>{label}</ContentHeader>}
      {options.map(({ image, title, subtitle, onPress }, index) => (
        <Option key={title}>
          <ContentOptionButton activeOpacity={0.7} onPress={onPress}>
            {image && <ImageWrapper source={image} width={70} height={70} />}

            <ContentTextContainer>
              <ContentTitle>{title}</ContentTitle>
              {subtitle && <ContentSubtitle>{subtitle}</ContentSubtitle>}
            </ContentTextContainer>

            {displayArrows && <NextIcon height={15} width={20} />}
          </ContentOptionButton>
          {index < options.length - 1 && <ContentSeparator />}
        </Option>
      ))}
    </ContentContainer>
  );
};

export default OptionsList;
