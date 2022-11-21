import { Action, AppScreen } from '@common/telemetria';
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
import BreastFeedPremature7 from '@assets/images/breastfeed_premature_7.svg';

interface PageColor {
  foreground: string;
  background: string;
}

interface ColorfulInfoPageItem extends InfoPageItem {
  pageColor: PageColor;
}

interface ColorfulInfoPageModelProps extends InfoPageModelProps {
  pageColor?: PageColor;
}

const StepByStepPremature: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const { height } = Dimensions.get('screen');

  const pages: ColorfulInfoPageItem[] = [
    {
      id: '1',
      title: i18n.t('StepByStepPrematurePage.Page1.Title'),
      content: [
        { id: '1', text: i18n.t('StepByStepPrematurePage.Page1.Text') },
      ],
      pageColor: { foreground: '#fff', background: '#fff' },
    },
    {
      id: '2',
      image: BreastFeedPremature1,
      title: i18n.t('StepByStepPrematurePage.Page2.Title'),
      content: [
        { id: '1', text: i18n.t('StepByStepPrematurePage.Page2.Text') },
      ],
      pageColor: { foreground: '#F5E9EC', background: theme.babyPink },
    },
    {
      id: '3',
      title: i18n.t('StepByStepPrematurePage.Page3.Title'),
      image: BreastFeedPremature2,
      content: [
        { id: '1', text: i18n.t('StepByStepPrematurePage.Page3.Text') },
      ],
      pageColor: { foreground: '#FCF6EF', background: theme.babyYellow },
    },
    {
      id: '4',
      title: i18n.t('StepByStepPrematurePage.Page4.Title'),
      image: BreastFeedPremature3,
      content: [
        { id: '1', text: i18n.t('StepByStepPrematurePage.Page4.Text') },
      ],
      pageColor: { foreground: '#E5EEF1', background: theme.babyBlue },
    },
    {
      id: '5',
      title: i18n.t('StepByStepPrematurePage.Page5.Title'),
      image: BreastFeedPremature4,
      content: [
        { id: '1', text: i18n.t('StepByStepPrematurePage.Page5.Text') },
      ],
      pageColor: { foreground: '#E9EEEB', background: theme.babyGreen },
    },
    {
      id: '6',
      title: i18n.t('StepByStepPrematurePage.Page6.Title'),
      image: BreastFeedPremature5,
      content: [
        { id: '1', text: i18n.t('StepByStepPrematurePage.Page6.Text') },
      ],
      pageColor: { foreground: '#F5E9EC', background: theme.babyPink },
    },
    {
      id: '7',
      title: i18n.t('StepByStepPrematurePage.Page7.Title'),
      image: BreastFeedPremature6,
      content: [
        { id: '1', text: i18n.t('StepByStepPrematurePage.Page7.Text') },
      ],
      pageColor: { foreground: '#F3EFFC', background: theme.babyPurple },
    },
    {
      id: '8',
      title: i18n.t('StepByStepPrematurePage.Page8.Title'),
      content: [
        { id: '1', text: i18n.t('StepByStepPrematurePage.Page8.Text') },
      ],
      pageColor: { foreground: '#FFF', background: theme.babyBlue },
    },
    {
      id: '9',
      title: i18n.t('StepByStepPrematurePage.Page9.Title'),
      image: BreastFeedPremature7,
      content: [
        { id: '1', text: i18n.t('StepByStepPrematurePage.Page9.Text') },
      ],
      pageColor: { foreground: '#F3EFFC', background: theme.babyPurple },
    },
  ];

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.StepByStepPremature },
    });
  }, []);

  const InfoModel: React.FC<ColorfulInfoPageModelProps> = ({
    index,
    pagesLength,
    title,
    content,
    image,
    flatListRef,
    pageColor,
  }) => (
    <Background color={pageColor ? pageColor.background : '#fff'}>
      {index === 0 && <ContentTitleText>{title}</ContentTitleText>}

      {image && index !== 0 && (
        <Foreground
          color={pageColor ? pageColor.foreground : '#fff'}
          height={height}
        />
      )}
      <ContentWrapper shouldDisplayImage={!!image}>
        {image && <ImageWrapper height={300} source={image} />}
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

      <Footer>
        <CurrentPageWrapper>
          <ProgressDots
            flatlistRef={flatListRef}
            length={pagesLength}
            selectedIndex={index}
          />
        </CurrentPageWrapper>
        <LastPageButtonWrapper opacity={index === pagesLength - 1 ? 1 : 0}>
          <ContinueButton onPress={() => navigation.goBack()}>
            <TextContinueButton>{i18n.t('Close')}</TextContinueButton>
          </ContinueButton>
        </LastPageButtonWrapper>
      </Footer>
    </Background>
  );

  return <InformationPages PageModel={InfoModel} data={pages} />;
};

export default StepByStepPremature;
