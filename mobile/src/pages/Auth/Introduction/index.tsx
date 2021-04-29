import React, { useEffect } from 'react';
import { Image } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import { useIsFirstRun } from '../../../contexts/firstRun';
import MainButton from '../../../components/MainButton';
import ProgressDots from '../../../components/ProgressDots';
import InformationPages, {
  IInfoPageProps,
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

const pages = [
  {
    id: 1,
    image: require('../../../../assets/images/intro_mother.png'),
    content: [
      {
        text:
          'Bem vinda! O AmamentaCoach foi pensado para te auxiliar na desafiadora jornada de amamentar um bebê prematuro.',
      },
    ],
  },
  {
    id: 2,
    image: require('../../../../assets/images/intro_diary_diary.png'),
    content: [
      {
        text: 'Explore cada ícone e faça do App seu grande aliado! ',
      },
    ],
  },
  {
    id: 3,
    image: require('../../../../assets/images/intro_chart.png'),
    content: [
      {
        text:
          'Quanto mais você usar o AmamentaCoach , mais recursos terá para amamentar seu bebê prematuro!',
      },
    ],
  },
  {
    id: 4,
    image: require('../../../../assets/images/intro_mobile.png'),
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

  const InfoPage: React.FC<IInfoPageProps> = ({
    flatListRef,
    index,
    pagesLength,
    image,
    content,
  }) => (
    <>
      <Header>
        <SkipButton onPress={handleSkip}>
          {index < pagesLength - 1 && <SkipButtonText>Pular</SkipButtonText>}
        </SkipButton>
      </Header>
      <ContentWrapper>
        <Image source={image} />
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

  return <InformationPages pages={pages} PageModel={InfoPage} />;
};

export default Introduction;
