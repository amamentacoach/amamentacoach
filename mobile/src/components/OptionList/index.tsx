import React from 'react';

import {
  ContentContainer,
  ContentHeader,
  ContentOptionButton,
  ContentImage,
  ContentTitle,
  ContentSubtitle,
  ContentSeparator,
  Option,
  ContentTextContainer,
  OpenIconImage,
} from './styles';

import NextIcon from '../../../assets/images/icons/ic_next.png';

interface IOptionListProps {
  options: {
    image: any;
    title: string;
    subtitle?: string;
    onPress: () => void;
  }[];
  label?: string;
  displayArrows?: boolean;
}

const OptionsList: React.FC<IOptionListProps> = ({
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
            <ContentImage source={image} />
            <ContentTextContainer>
              <ContentTitle>{title}</ContentTitle>
              {subtitle && <ContentSubtitle>{subtitle}</ContentSubtitle>}
            </ContentTextContainer>
            {displayArrows && (
              <OpenIconImage source={NextIcon} resizeMode="contain" />
            )}
          </ContentOptionButton>
          {index < options.length - 1 && <ContentSeparator />}
        </Option>
      ))}
    </ContentContainer>
  );
};

export default OptionsList;
