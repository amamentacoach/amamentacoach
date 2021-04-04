import React from 'react';
import { Image, View } from 'react-native';

import ProgressDots from '../ProgressDots';
import { IInfoPageProps } from '../InformationPages';

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
  const InfoPage: React.FC<IInfoPageProps> = ({
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
        <Image source={image} />
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

  return InfoPage;
};

export default createGenericInfoPage;
