import i18n from 'i18n-js';
import { useEffect } from 'react';
import { hide } from 'react-native-bootsplash';

import ImageWrapper from 'components/ImageWrapper';
import InformationPages from 'components/InformationPages';
import MainButton from 'components/MainButton';
import ProgressDots from 'components/ProgressDots';
import { useIsFirstRun } from 'contexts/firstRun';
import { OpenSansRegular } from 'lib/sharedStyles';

import type {
  InfoPageItem,
  InfoPageModelProps,
} from 'components/InformationPages';

import {
  ContentText,
  ContentWrapper,
  CurrentPageWrapper,
  Footer,
  Header,
  LastPageButtonWrapper,
  SkipButton,
} from './styles';

import IntroChart from '@assets/images/intro_chart.svg';
import IntroDiaryHeart from '@assets/images/intro_diary_pencil.svg';
import IntroMobile from '@assets/images/intro_mobile.svg';
import IntroMother from '@assets/images/intro_mother.svg';

const Introduction: React.FC = () => {
  const { setPersistentNotFirstRun } = useIsFirstRun();

  const pages: InfoPageItem[] = [
    {
      id: '1',
      image: IntroMother,
      content: [{ id: '1', text: i18n.t('AppIntroductionPage.1') }],
    },
    {
      id: '2',
      image: IntroDiaryHeart,
      content: [{ id: '1', text: i18n.t('AppIntroductionPage.2') }],
    },
    {
      id: '3',
      image: IntroChart,
      content: [{ id: '1', text: i18n.t('AppIntroductionPage.3') }],
    },
    {
      id: '4',
      image: IntroMobile,
      content: [{ id: '1', text: i18n.t('AppIntroductionPage.4') }],
    },
  ];

  useEffect(() => {
    hide({ duration: 250 });
  }, []);

  async function onEnd(): Promise<void> {
    await setPersistentNotFirstRun('appIntroduction');
  }

  const InfoModel: React.FC<InfoPageModelProps> = ({
    flatListRef,
    index,
    pagesLength,
    image,
    content,
  }) => (
    <>
      <Header>
        <SkipButton onPress={onEnd}>
          {index < pagesLength - 1 && (
            <OpenSansRegular>{i18n.t('Skip')}</OpenSansRegular>
          )}
        </SkipButton>
      </Header>
      <ContentWrapper>
        {image && (
          <ImageWrapper resizeMode="contain" source={image} width="100%" />
        )}
        {content.map(({ id, text }) => (
          <ContentText key={id}>{text}</ContentText>
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
          <MainButton
            disabled={index !== pagesLength - 1}
            text={i18n.t('LetsStart')}
            onPress={onEnd}
          />
        </LastPageButtonWrapper>
      </Footer>
    </>
  );

  return <InformationPages PageModel={InfoModel} data={pages} />;
};

export default Introduction;
