import i18n from 'i18n-js';

import ImageWrapper from 'components/ImageWrapper';
import InformationPages from 'components/InformationPages';
import MainButton from 'components/MainButton';
import ProgressDots from 'components/ProgressDots';
import { useIsFirstRun } from 'contexts/firstRun';

import type {
  InfoPageItem,
  InfoPageModelProps,
} from 'components/InformationPages';

import {
  ContentText,
  ContentWrapper,
  ContinueButton,
  CurrentPageWrapper,
  Footer,
  FooterButtonWrapper,
  TextContinueButton,
} from './styles';

import IntroDiary from '@assets/images/intro_diary.svg';
import IntroDiaryCalendar from '@assets/images/intro_diary_calendar.svg';

const DiaryIntroduction: React.FC = () => {
  const { setPersistentNotFirstRun } = useIsFirstRun();

  const pages: InfoPageItem[] = [
    {
      id: '1',
      image: IntroDiary,
      content: [
        {
          id: '1',
          text: i18n.t('DiaryIntroductionPage.Text1'),
        },
      ],
    },
    {
      id: '2',
      image: IntroDiaryCalendar,
      content: [
        {
          id: '1',
          text: i18n.t('DiaryIntroductionPage.Text2'),
        },
      ],
    },
  ];

  async function onEnd(): Promise<void> {
    await setPersistentNotFirstRun('diaryIntroduction');
  }

  const InfoModel: React.FC<InfoPageModelProps> = ({
    flatListRef,
    index,
    pagesLength,
    content,
    image,
  }) => (
    <>
      <ContentWrapper>
        {image && <ImageWrapper source={image} />}
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
        <FooterButtonWrapper>
          {index === pagesLength - 1 ? (
            <MainButton onPress={onEnd} text={i18n.t('LetsStart')} />
          ) : (
            <ContinueButton activeOpacity={0.7} onPress={onEnd}>
              <TextContinueButton>{i18n.t('Skip')}</TextContinueButton>
            </ContinueButton>
          )}
        </FooterButtonWrapper>
      </Footer>
    </>
  );

  return <InformationPages data={pages} PageModel={InfoModel} />;
};

export default DiaryIntroduction;
