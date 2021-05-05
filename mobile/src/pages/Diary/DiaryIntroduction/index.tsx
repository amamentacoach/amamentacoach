import React from 'react';
import { Image as ReactImage } from 'react-native';

import { useIsFirstRun } from '../../../contexts/firstRun';
import ProgressDots from '../../../components/ProgressDots';
import MainButton from '../../../components/MainButton';
import InformationPages, {
  InfoModelProps,
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

import IntroDiary from '../../../../assets/images/intro_diary.svg';
import IntroDiaryCalendar from '../../../../assets/images/intro_diary_calendar.svg';

const pages = [
  {
    id: 1,
    Image: IntroDiary,
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
    Image: IntroDiaryCalendar,
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

  const InfoModel: React.FC<InfoModelProps> = ({
    flatListRef,
    index,
    pagesLength,
    content,
    Image,
  }) => (
    <>
      <ContentWrapper>
        {Image &&
          (typeof Image === 'number' ? (
            <ReactImage source={Image} />
          ) : (
            <Image />
          ))}
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

  return <InformationPages pages={pages} PageModel={InfoModel} />;
};

export default DiaryIntroduction;
