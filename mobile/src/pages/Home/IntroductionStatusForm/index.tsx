import React from 'react';

import { useIsFirstRun } from '../../../contexts/firstRun';
import MainButton from '../../../components/MainButton';
import ProgressDots from '../../../components/ProgressDots';
import InformationPages, {
  InfoModelProps,
  InfoPage,
} from '../../../components/InformationPages';
import ImageWrapper from '../../../components/ImageWrapper';

import {
  Header,
  ContentWrapper,
  ContentText,
  Footer,
  LastPageButtonWrapper,
  CurrentPageWrapper,
  ImageContainer,
  LastPageBox,
  ColoredText,
  HeaderLastPageBox,
} from './styles';

import SurveyPrimary from '../../../../assets/images/icons/survey_primary.svg';

const pages: InfoPage[] = [
  {
    id: 1,
    image: SurveyPrimary,
    content: [
      {
        text:
          'Como você se sente com relação à sua autoconfiança para amamentar?\n\nPara cada uma das afirmações a seguir, por favor, escolha a resposta que melhor descreve sua autoconfiança em amamentar seu bebê.',
      },
    ],
  },
  {
    id: 2,
    image: SurveyPrimary,
    content: [
      {
        text:
          'Por favor, marque sua resposta circulando o número que melhor descreve como você se sente. Não há respostas certas ou erradas.',
      },
    ],
  },
  {
    id: 3,
    image: SurveyPrimary,
    content: [],
  },
];

const IntroductionStatusForm: React.FC = () => {
  const { setPersistentNotFirstRun } = useIsFirstRun();

  async function handleEndIntroduction() {
    await setPersistentNotFirstRun('statusFormIntroduction');
  }

  const InfoModel: React.FC<InfoModelProps> = ({
    flatListRef,
    pagesLength,
    index,
    content,
    image,
  }) => (
    <>
      <Header>
        <ContentText>Autoconfiança para amamentar</ContentText>
      </Header>
      <ContentWrapper>
        <ImageContainer>
          {image && <ImageWrapper source={image} />}
        </ImageContainer>
        {index === pagesLength - 1 ? (
          <LastPageBox>
            <HeaderLastPageBox>Escala</HeaderLastPageBox>
            <ContentText>
              <ColoredText>1</ColoredText> = nada confiante
            </ContentText>
            <ContentText>
              <ColoredText>2</ColoredText> = muito pouco confiante
            </ContentText>
            <ContentText>
              <ColoredText>3</ColoredText> = às vezes confiante
            </ContentText>
            <ContentText>
              <ColoredText>4</ColoredText> = confiante
            </ContentText>
            <ContentText>
              <ColoredText>5</ColoredText> = muito confiante
            </ContentText>
          </LastPageBox>
        ) : (
          <>
            {content.map(({ text }) => (
              <ContentText key={text}>{text}</ContentText>
            ))}
          </>
        )}
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
          <MainButton
            text="Vamos começar!"
            onPress={handleEndIntroduction}
            disabled={index !== pagesLength - 1}
          />
        </LastPageButtonWrapper>
      </Footer>
    </>
  );

  return <InformationPages pages={pages} PageModel={InfoModel} />;
};

export default IntroductionStatusForm;
