import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';

import { useIsFirstRun } from '../../../contexts/firstRun';
import MainButton from '../../../components/MainButton';
import ProgressDots from '../../../components/ProgressDots';
import InformationPages, {
  InfoModelProps,
} from '../../../components/InformationPages';

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

import IntroMother from '../../../../assets/images/intro_mother.svg';
import IntroDiaryHeart from '../../../../assets/images/intro_diary_pencil.svg';
import IntroChart from '../../../../assets/images/intro_chart.svg';
import IntroMobile from '../../../../assets/images/intro_mobile.svg';

const pages = [
  {
    id: 1,
    Image: IntroMother,
    content: [
      {
        text:
          'Bem vinda! O AmamentaCoach foi pensado para te auxiliar na desafiadora jornada de amamentar um bebê prematuro.',
      },
    ],
  },
  {
    id: 2,
    Image: IntroDiaryHeart,
    content: [
      {
        text: 'Explore cada ícone e faça do App seu grande aliado! ',
      },
    ],
  },
  {
    id: 3,
    Image: IntroChart,
    content: [
      {
        text:
          'Quanto mais você usar o AmamentaCoach , mais recursos terá para amamentar seu bebê prematuro!',
      },
    ],
  },
  {
    id: 4,
    Image: IntroMobile,
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

  async function handleSkip() {
    await setPersistentNotFirstRun('appIntroduction');
  }

  const InfoModel: React.FC<InfoModelProps> = ({
    flatListRef,
    index,
    pagesLength,
    Image,
    content,
  }) => (
    <>
      <Header>
        <SkipButton onPress={handleSkip}>
          {index < pagesLength - 1 && <SkipButtonText>Pular</SkipButtonText>}
        </SkipButton>
      </Header>
      <ContentWrapper>
        {Image && typeof Image !== 'number' && <Image />}
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
            onPress={handleSkip}
            disabled={index !== pagesLength - 1}
          />
        </LastPageButtonWrapper>
      </Footer>
    </>
  );

  return <InformationPages pages={pages} PageModel={InfoModel} />;
};

export default Introduction;
