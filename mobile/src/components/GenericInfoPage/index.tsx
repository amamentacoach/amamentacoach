import React from 'react';

import i18n from 'i18n-js';

import ImageWrapper from '../ImageWrapper';
import { InfoPageModelProps } from '../InformationPages';
import ProgressDots from '../ProgressDots';

import {
  ContentHeaderText,
  ContentText,
  ContentTitleText,
  ContentWrapper,
  CurrentPageWrapper,
  EndButton,
  Footer,
  Header,
  ImageContainer,
  LastPageButtonWrapper,
  SkipButton,
  SkipButtonText,
  TextContainer,
  TextEndButton,
} from './styles';

interface GenericInfoPageOptions {
  displaySkipButton?: boolean;
  onEnd: () => void;
}

// Página genérica que pode ser passada a um componente InformationPages.
const createGenericInfoPage = ({
  displaySkipButton,
  onEnd,
}: GenericInfoPageOptions) => {
  const InfoModel: React.FC<InfoPageModelProps> = ({
    index,
    pagesLength,
    title,
    content,
    image,
    flatListRef,
  }) => (
    <>
      <Header>
        {displaySkipButton && (
          <SkipButton onPress={onEnd}>
            {index < pagesLength - 1 && (
              <SkipButtonText>{i18n.t('Skip')}</SkipButtonText>
            )}
          </SkipButton>
        )}
      </Header>
      <ContentWrapper>
        <ContentTitleText>{title}</ContentTitleText>
        {image && (
          <ImageContainer>
            <ImageWrapper
              source={image}
              width={250}
              height="100%"
              resizeMode="contain"
            />
          </ImageContainer>
        )}
        {content.map(({ id, sectionHeader, text }) => (
          <TextContainer key={id}>
            {sectionHeader && (
              <ContentHeaderText>{sectionHeader}</ContentHeaderText>
            )}
            <ContentText>{text}</ContentText>
          </TextContainer>
        ))}
      </ContentWrapper>
      <Footer>
        <CurrentPageWrapper>
          <ProgressDots
            flatlistRef={flatListRef}
            selectedIndex={index}
            length={pagesLength}
          />
        </CurrentPageWrapper>
        <LastPageButtonWrapper opacity={index === pagesLength - 1 ? 1 : 0}>
          <EndButton onPress={() => onEnd()}>
            <TextEndButton>{i18n.t('Leave')}</TextEndButton>
          </EndButton>
        </LastPageButtonWrapper>
      </Footer>
    </>
  );

  return InfoModel;
};

export default createGenericInfoPage;
