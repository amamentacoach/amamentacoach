import React from 'react';
import { Image } from 'react-native';

import { useIsFirstRun } from '../../../contexts/firstRun';
import ProgressDots from '../../../components/ProgressDots';
import MainButton from '../../../components/MainButton';
import InformationPages, {
  IInfoPageProps,
} from '../../../components/InformationPages';

import {
  ContinueButton,
  TextContinueButton,
  ContentWrapper,
  ContentText,
  Footer,
  FooterButtonWrapper,
  CurrentPageWrapper,
} from './styles';

const pages = [
  {
    id: 1,
    image: require('../../../../assets/images/intro_diary_diary.png'),
    content: [
      {
        text:
          'Esse é o seu DIÁRIO! Um espaço para registrar seus avanços e oferecer recursos que poderão te ajudar nessa jornada!',
      },
    ],
  },
  {
    id: 2,
    title: '1.  Procure a serenidade',
    image: require('../../../../assets/images/intro_diary_calendar.png'),
    content: [
      {
        text:
          'Será muito importante que você o acesse todos os dias e informe sobre você, o seu bebê e a produção de leite.',
      },
    ],
  },
];

const DiaryIntroduction: React.FC = () => {
  const { setPersistentNotFirstRun } = useIsFirstRun();

  async function handleEndDiaryIntroduction() {
    await setPersistentNotFirstRun('diaryIntroduction');
  }

  const InfoPage: React.FC<IInfoPageProps> = ({
    flatListRef,
    index,
    pagesLength,
    content,
    image,
  }) => (
    <>
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
        <FooterButtonWrapper>
          {index === pagesLength - 1 ? (
            <MainButton
              onPress={handleEndDiaryIntroduction}
              text="Vamos começar!"
            />
          ) : (
            <ContinueButton
              activeOpacity={0.7}
              onPress={handleEndDiaryIntroduction}>
              <TextContinueButton>Pular</TextContinueButton>
            </ContinueButton>
          )}
        </FooterButtonWrapper>
      </Footer>
    </>
  );

  return <InformationPages pages={pages} PageModel={InfoPage} />;
};

export default DiaryIntroduction;
