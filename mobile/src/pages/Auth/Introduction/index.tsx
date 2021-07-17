import React, { useEffect } from 'react';

import RNBootSplash from 'react-native-bootsplash';

import ImageWrapper from '../../../components/ImageWrapper';
import InformationPages, {
  InfoModelProps,
  InfoPage,
} from '../../../components/InformationPages';
import MainButton from '../../../components/MainButton';
import ProgressDots from '../../../components/ProgressDots';
import { useIsFirstRun } from '../../../contexts/firstRun';

import {
  Header,
  SkipButton,
  SkipButtonText,
  ContentWrapper,
  ContentText,
  Footer,
  LastPageButtonWrapper,
  CurrentPageWrapper,
} from './styles';

import IntroChart from '../../../../assets/images/intro_chart.svg';
import IntroDiaryHeart from '../../../../assets/images/intro_diary_pencil.svg';
import IntroMobile from '../../../../assets/images/intro_mobile.svg';
import IntroMother from '../../../../assets/images/intro_mother.svg';

const pages: InfoPage[] = [
  {
    id: 1,
    image: IntroMother,
    content: [
      {
        text:
          'Bem vinda! O AmamentaCoach foi pensado para te auxiliar na desafiadora jornada de amamentar um bebê prematuro.',
      },
    ],
  },
  {
    id: 2,
    image: IntroDiaryHeart,
    content: [
      {
        text: 'Explore cada ícone e faça do App seu grande aliado! ',
      },
    ],
  },
  {
    id: 3,
    image: IntroChart,
    content: [
      {
        text:
          'Quanto mais você usar o AmamentaCoach , mais recursos terá para amamentar seu bebê prematuro!',
      },
    ],
  },
  {
    id: 4,
    image: IntroMobile,
    content: [
      {
        text:
          'Você registrará seus avanços diários e terá acesso a conteúdos exclusivos para te instruir e te motivar!',
      },
    ],
  },
];

const Introduction: React.FC = () => {
  const { setPersistentNotFirstRun } = useIsFirstRun();

  useEffect(() => {
    RNBootSplash.hide({ duration: 250 });
  }, []);

  async function handleEnd() {
    await setPersistentNotFirstRun('appIntroduction');
  }

  const InfoModel: React.FC<InfoModelProps> = ({
    flatListRef,
    index,
    pagesLength,
    image,
    content,
  }) => (
    <>
      <Header>
        <SkipButton onPress={handleEnd}>
          {index < pagesLength - 1 && <SkipButtonText>Pular</SkipButtonText>}
        </SkipButton>
      </Header>
      <ContentWrapper>
        {image && (
          <ImageWrapper source={image} resizeMode="contain" width="100%" />
        )}
        {content.map(({ text }) => (
          <ContentText key={text}>{text}</ContentText>
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
          <MainButton
            text="Vamos começar!"
            onPress={handleEnd}
            disabled={index !== pagesLength - 1}
          />
        </LastPageButtonWrapper>
      </Footer>
    </>
  );

  return <InformationPages pages={pages} PageModel={InfoModel} />;
};

export default Introduction;
