import i18n from 'i18n-js';

import ImageWrapper from 'components/ImageWrapper';
import ProgressDots from 'components/ProgressDots';
import { OpenSansRegular } from 'lib/sharedStyles';

import type { InfoPageModelProps } from 'components/InformationPages';

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
}: GenericInfoPageOptions): React.FC<InfoPageModelProps> => {
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
              <OpenSansRegular>{i18n.t('Skip')}</OpenSansRegular>
            )}
          </SkipButton>
        )}
      </Header>
      <ContentWrapper>
        <ContentTitleText>{title}</ContentTitleText>
        {image && (
          <ImageContainer>
            <ImageWrapper
              height="100%"
              resizeMode="contain"
              source={image}
              width={250}
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
            length={pagesLength}
            selectedIndex={index}
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
