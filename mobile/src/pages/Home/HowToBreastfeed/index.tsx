import { Action, AppScreen } from '@common/telemetria';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';

import ImageWrapper from 'components/ImageWrapper';
import InformationPages from 'components/InformationPages';
import ProgressDots from 'components/ProgressDots';
import { createTelemetryAction } from 'utils/telemetryAction';

import type {
  InfoPageItem,
  InfoPageModelProps,
} from 'components/InformationPages';
import type { RootStackProps } from 'routes/app';

import {
  ContentText,
  ContentTitleText,
  ContentWrapper,
  ContinueButton,
  CurrentPageContainer,
  CurrentPageText,
  CurrentPageWrapper,
  Footer,
  LastPageButtonWrapper,
  TextContinueButton,
} from './styles';

import MilkWithdrawalEight from '@assets/images/milk_withdrawal_eight.png';
import MilkWithdrawalFive from '@assets/images/milk_withdrawal_five.png';
import MilkWithdrawalFour from '@assets/images/milk_withdrawal_four.png';
import MilkWithdrawalNine from '@assets/images/milk_withdrawal_nine.png';
import MilkWithdrawalOne from '@assets/images/milk_withdrawal_one.png';
import MilkWithdrawalSeven from '@assets/images/milk_withdrawal_seven.png';
import MilkWithdrawalSix from '@assets/images/milk_withdrawal_six.png';
import MilkWithdrawalThree from '@assets/images/milk_withdrawal_three.png';
import MilkWithdrawalTwo from '@assets/images/milk_withdrawal_two.png';

const HowToBreastfeed: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();

  const pages: InfoPageItem[] = [
    {
      id: '1',
      title: i18n.t('HowToBreastfeedPage.Title'),
      image: MilkWithdrawalOne,
      content: [{ id: '1', text: i18n.t('HowToBreastfeedPage.Page1') }],
    },
    {
      id: '2',
      title: i18n.t('HowToBreastfeedPage.Title'),
      image: MilkWithdrawalTwo,
      content: [{ id: '1', text: i18n.t('HowToBreastfeedPage.Page2') }],
    },
    {
      id: '3',
      title: i18n.t('HowToBreastfeedPage.Title'),
      image: MilkWithdrawalThree,
      content: [
        {
          id: '1',
          text: i18n.t('HowToBreastfeedPage.Page3'),
        },
      ],
    },
    {
      id: '4',
      title: i18n.t('HowToBreastfeedPage.Title'),
      image: MilkWithdrawalFour,
      content: [{ id: '1', text: i18n.t('HowToBreastfeedPage.Page4') }],
    },
    {
      id: '5',
      title: i18n.t('HowToBreastfeedPage.Title'),
      image: MilkWithdrawalFive,
      content: [
        {
          id: '1',
          text: i18n.t('HowToBreastfeedPage.Page5'),
        },
      ],
    },
    {
      id: '6',
      title: i18n.t('HowToBreastfeedPage.Title'),
      image: MilkWithdrawalSix,
      content: [
        {
          id: '1',
          text: i18n.t('HowToBreastfeedPage.Page6'),
        },
      ],
    },
    {
      id: '7',
      title: i18n.t('HowToBreastfeedPage.Title'),
      image: MilkWithdrawalSeven,
      content: [{ id: '1', text: i18n.t('HowToBreastfeedPage.Page7') }],
    },
    {
      id: '8',
      title: i18n.t('HowToBreastfeedPage.Title'),
      image: MilkWithdrawalEight,
      content: [
        {
          id: '1',
          text: i18n.t('HowToBreastfeedPage.Page8'),
        },
      ],
    },
    {
      id: '9',
      title: i18n.t('HowToBreastfeedPage.Title'),
      image: MilkWithdrawalNine,
      content: [
        {
          id: '1',
          text: i18n.t('HowToBreastfeedPage.Page9'),
        },
      ],
    },
  ];

  function onEnd(): void {
    navigation.goBack();
  }

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.HowToBreastfeed },
    });
  }, []);

  const InfoModel: React.FC<InfoPageModelProps> = ({
    flatListRef,
    pagesLength,
    index,
    title,
    image,
    content,
  }) => (
    <>
      <ContentTitleText>{title}</ContentTitleText>
      <CurrentPageContainer>
        <CurrentPageText>
          {index + 1}/{pagesLength}
        </CurrentPageText>
      </CurrentPageContainer>
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
            length={pagesLength}
            selectedIndex={index}
          />
        </CurrentPageWrapper>
        <LastPageButtonWrapper opacity={index === pagesLength - 1 ? 1 : 0}>
          <ContinueButton onPress={() => onEnd()}>
            <TextContinueButton>{i18n.t('Leave')}</TextContinueButton>
          </ContinueButton>
        </LastPageButtonWrapper>
      </Footer>
    </>
  );

  return <InformationPages PageModel={InfoModel} data={pages} />;
};

export default HowToBreastfeed;
