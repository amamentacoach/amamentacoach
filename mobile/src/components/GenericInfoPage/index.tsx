import React from 'react';

import { View } from 'react-native';

import ImageWrapper from '../ImageWrapper';
import { InfoModelProps } from '../InformationPages';
import ProgressDots from '../ProgressDots';

import {
  ContinueButton,
  TextContinueButton,
  ContentWrapper,
  ContentText,
  Footer,
  LastPageButtonWrapper,
  CurrentPageWrapper,
  ContentTitleText,
  ContentHeaderText,
} from './styles';

// Página genérica que pode ser passada a um componente InformationPages.
const createGenericInfoPage = (onEnd: () => void) => {
  const InfoModel: React.FC<InfoModelProps> = ({
    index,
    pagesLength,
    title,
    content,
    image,
    flatListRef,
  }) => (
    <>
      <ContentTitleText>{title}</ContentTitleText>
      <ContentWrapper>
        {image && (
          <ImageWrapper
            source={image}
            width="100%"
            height="50%"
            resizeMode="contain"
          />
        )}
        {content.map(({ sectionHeader, text }) => (
          <View key={text}>
            {sectionHeader && (
              <ContentHeaderText>{sectionHeader}</ContentHeaderText>
            )}
            <ContentText>{text}</ContentText>
          </View>
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
          <ContinueButton onPress={() => onEnd()}>
            <TextContinueButton>Sair</TextContinueButton>
          </ContinueButton>
        </LastPageButtonWrapper>
      </Footer>
    </>
  );

  return InfoModel;
};

export default createGenericInfoPage;
