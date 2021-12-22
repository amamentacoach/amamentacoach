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
  ColoredText,
  ContentText,
  ContentWrapper,
  CurrentPageWrapper,
  Footer,
  Header,
  HeaderLastPageBox,
  ImageContainer,
  LastPageBox,
  LastPageButtonWrapper,
} from './styles';

import SurveyPrimary from '@assets/images/icons/survey_primary.svg';

const IntroductionStatusForm: React.FC = () => {
  const { setPersistentNotFirstRun } = useIsFirstRun();

  const pages: InfoPageItem[] = [
    {
      id: '1',
      image: SurveyPrimary,
      content: [
        {
          id: '1',
          text: i18n.t('IntroductionStatusFormPage.Text1'),
        },
      ],
    },
    {
      id: '2',
      image: SurveyPrimary,
      content: [
        {
          id: '1',
          text: i18n.t('IntroductionStatusFormPage.Text2'),
        },
      ],
    },
    {
      id: '3',
      image: SurveyPrimary,
      content: [],
    },
  ];

  async function handleEndIntroduction(): Promise<void> {
    await setPersistentNotFirstRun('statusFormIntroduction');
  }

  const InfoModel: React.FC<InfoPageModelProps> = ({
    flatListRef,
    pagesLength,
    index,
    content,
    image,
  }) => (
    <>
      <Header>
        <ContentText>{i18n.t('StatusFormPage.Header')}</ContentText>
      </Header>
      <ContentWrapper>
        <ImageContainer>
          {image && <ImageWrapper source={image} />}
        </ImageContainer>
        {index === pagesLength - 1 ? (
          <LastPageBox>
            <HeaderLastPageBox>
              {i18n.t('StatusFormPage.FormName')}
            </HeaderLastPageBox>
            <ContentText>
              <ColoredText>1</ColoredText> = {i18n.t('StatusFormPage.Value1')}
            </ContentText>
            <ContentText>
              <ColoredText>2</ColoredText> = {i18n.t('StatusFormPage.Value2')}
            </ContentText>
            <ContentText>
              <ColoredText>3</ColoredText> = {i18n.t('StatusFormPage.Value3')}
            </ContentText>
            <ContentText>
              <ColoredText>4</ColoredText> = {i18n.t('StatusFormPage.Value4')}
            </ContentText>
            <ContentText>
              <ColoredText>5</ColoredText> = {i18n.t('StatusFormPage.Value5')}
            </ContentText>
          </LastPageBox>
        ) : (
          <>
            {content.map(({ id, text }) => (
              <ContentText key={id}>{text}</ContentText>
            ))}
          </>
        )}
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
            onPress={handleEndIntroduction}
          />
        </LastPageButtonWrapper>
      </Footer>
    </>
  );

  return <InformationPages PageModel={InfoModel} data={pages} />;
};

export default IntroductionStatusForm;
