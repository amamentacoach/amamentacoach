import { Action, AppScreen } from '@common/Telemetria';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';
import { Dimensions, View } from 'react-native';

import ImageWrapper from 'components/ImageWrapper';
import InformationPages from 'components/InformationPages';
import ProgressDots from 'components/ProgressDots';
import theme from 'config/theme';
import { createTelemetryAction } from 'utils/telemetryAction';

import type {
  InfoPageItem,
  InfoPageModelProps,
} from 'components/InformationPages';
import type { RootStackProps } from 'routes/app';

import {
  Background,
  ContentHeaderText,
  ContentText,
  ContentTitleText,
  ContentWrapper,
  ContinueButton,
  CurrentPageWrapper,
  Footer,
  Foreground,
  LastPageButtonWrapper,
  TextContinueButton,
} from './styles';

import BreastFeedPremature1 from '@assets/images/breastfeed_premature_1.svg';
import BreastFeedPremature2 from '@assets/images/breastfeed_premature_2.svg';
import BreastFeedPremature3 from '@assets/images/breastfeed_premature_3.svg';
import BreastFeedPremature4 from '@assets/images/breastfeed_premature_4.svg';
import BreastFeedPremature5 from '@assets/images/breastfeed_premature_5.svg';
import BreastFeedPremature6 from '@assets/images/breastfeed_premature_6.svg';

const StepByStepPremature: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const { height } = Dimensions.get('screen');
  const colors = [
    { foreground: '#fff', background: '#fff' },
    { foreground: '#F5E9EC', background: theme.babyPink },
    { foreground: '#F3EFFC', background: theme.babyPurple },
    { foreground: '#E5EEF1', background: theme.babyBlue },
    { foreground: '#E9EEEB', background: theme.babyGreen },
    { foreground: '#F5E9EC', background: theme.babyPink },
    { foreground: '#F3EFFC', background: theme.babyPurple },
  ];

  const pages: InfoPageItem[] = [
    {
      id: '1',
      title: i18n.t('StepByStepPrematurePage.Page1.Title'),
      content: [
        { id: '1', text: i18n.t('StepByStepPrematurePage.Page1.Text') },
      ],
    },
    {
      id: '2',
      image: BreastFeedPremature1,
      title: i18n.t('StepByStepPrematurePage.Page2.Title'),
      content: [
        { id: '1', text: i18n.t('StepByStepPrematurePage.Page2.Text') },
      ],
    },
    {
      id: '3',
      title: i18n.t('StepByStepPrematurePage.Page3.Title'),
      image: BreastFeedPremature2,
      content: [
        { id: '1', text: i18n.t('StepByStepPrematurePage.Page3.Text') },
      ],
    },
    {
      id: '4',
      title: i18n.t('StepByStepPrematurePage.Page4.Title'),
      image: BreastFeedPremature3,
      content: [
        { id: '1', text: i18n.t('StepByStepPrematurePage.Page4.Text') },
      ],
    },
    {
      id: '5',
      title: i18n.t('StepByStepPrematurePage.Page5.Title'),
      image: BreastFeedPremature4,
      content: [
        { id: '1', text: i18n.t('StepByStepPrematurePage.Page5.Text') },
      ],
    },
    {
      id: '6',
      title: i18n.t('StepByStepPrematurePage.Page6.Title'),
      image: BreastFeedPremature5,
      content: [
        { id: '1', text: i18n.t('StepByStepPrematurePage.Page6.Text') },
      ],
    },
    {
      id: '7',
      title: i18n.t('StepByStepPrematurePage.Page7.Title'),
      image: BreastFeedPremature6,
      content: [
        { id: '1', text: i18n.t('StepByStepPrematurePage.Page7.Text') },
      ],
    },
  ];

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.StepByStepPremature },
    });
  }, []);

  const InfoModel: React.FC<InfoPageModelProps> = ({
    index,
    pagesLength,
    title,
    content,
    image,
    flatListRef,
  }) => (
    <Background color={colors[index].background}>
      {index === 0 && <ContentTitleText>{title}</ContentTitleText>}

      {index !== 0 && (
        <Foreground color={colors[index].foreground} height={height} />
      )}
      <ContentWrapper index={index}>
        {image && <ImageWrapper source={image} height={300} />}
        {index !== 0 && <ContentTitleText>{title}</ContentTitleText>}
        {content.map(({ id, sectionHeader, text }) => (
          <View key={id}>
            {sectionHeader && (
              <ContentHeaderText>{sectionHeader}</ContentHeaderText>
            )}
            <ContentText>{text}</ContentText>
          </View>
        ))}
      </ContentWrapper>

      <Footer index={index}>
        <CurrentPageWrapper>
          <ProgressDots
            flatlistRef={flatListRef}
            selectedIndex={index}
            length={pagesLength}
          />
        </CurrentPageWrapper>
        <LastPageButtonWrapper opacity={index === pagesLength - 1 ? 1 : 0}>
          <ContinueButton onPress={() => navigation.goBack()}>
            <TextContinueButton>{i18n.t('Leave')}</TextContinueButton>
          </ContinueButton>
        </LastPageButtonWrapper>
      </Footer>
    </Background>
  );

  return <InformationPages data={pages} PageModel={InfoModel} />;
};

export default StepByStepPremature;
