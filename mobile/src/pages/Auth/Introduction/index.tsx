import React, { useEffect } from 'react';

import i18n from 'i18n-js';
import { hide } from 'react-native-bootsplash';

import ImageWrapper from '../../../components/ImageWrapper';
import InformationPages, {
  InfoPageItem,
  InfoPageModelProps,
} from '../../../components/InformationPages';
import MainButton from '../../../components/MainButton';
import ProgressDots from '../../../components/ProgressDots';
import { useIsFirstRun } from '../../../contexts/firstRun';

import {
  ContentText,
  ContentWrapper,
  CurrentPageWrapper,
  Footer,
  Header,
  LastPageButtonWrapper,
  SkipButton,
  SkipButtonText,
} from './styles';

import IntroChart from '../../../../assets/images/intro_chart.svg';
import IntroDiaryHeart from '../../../../assets/images/intro_diary_pencil.svg';
import IntroMobile from '../../../../assets/images/intro_mobile.svg';
import IntroMother from '../../../../assets/images/intro_mother.svg';

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
      content: [{ id: '1', text: i18n.t('AppIntroductionPage.4') }],
    },
    {
      id: '3',
      image: IntroChart,
      content: [{ id: '1', text: i18n.t('AppIntroductionPage.3') }],
    },
    {
      id: '4',
      image: IntroMobile,
      content: [{ id: '1', text: i18n.t('AppIntroductionPage.2') }],
    },
  ];

  useEffect(() => {
    hide({ duration: 250 });
  }, []);

  async function onEnd() {
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
            <SkipButtonText>{i18n.t('Skip')}</SkipButtonText>
          )}
        </SkipButton>
      </Header>
      <ContentWrapper>
        {image && (
          <ImageWrapper source={image} resizeMode="contain" width="100%" />
        )}
        {content.map(({ id, text }) => (
          <ContentText key={id}>{text}</ContentText>
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
            text={i18n.t('LetsStart')}
            onPress={onEnd}
            disabled={index !== pagesLength - 1}
          />
        </LastPageButtonWrapper>
      </Footer>
    </>
  );

  return <InformationPages data={pages} PageModel={InfoModel} />;
};

export default Introduction;
