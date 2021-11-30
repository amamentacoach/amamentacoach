import { Action, AppScreen } from '@common/telemetria';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';

import createGenericInfoPage from 'components/GenericInfoPage';
import InformationPages from 'components/InformationPages';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { InfoPageItem } from 'components/InformationPages';
import type { RootStackProps } from 'routes/app';

import { ColoredContentText, ContentText } from './styles';

import MilkWithdrawalSeven from '@assets/images/milk_withdrawal_seven.png';
import WhyMilkWithdrawalTwo from '@assets/images/why_milk_withdrawal_two.png';

const WhyBreastfeed: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const pages: InfoPageItem[] = [
    {
      id: '1',
      title: i18n.t('WhyBreastfeedPage.Header'),
      image: MilkWithdrawalSeven,
      content: [
        {
          id: '1',
          text: (
            <ContentText>{i18n.t('WhyBreastfeedPage.Page1.Text1')}</ContentText>
          ),
        },
        {
          id: '2',
          text: (
            <ContentText>
              {i18n.t('WhyBreastfeedPage.Page1.Text2')}
              <ColoredContentText>
                {' '}
                {i18n.t('WhyBreastfeedPage.Page1.Text3')}{' '}
              </ColoredContentText>
              {i18n.t('WhyBreastfeedPage.Page1.Text4')}
            </ContentText>
          ),
        },
      ],
    },
    {
      id: '2',
      title: i18n.t('WhyBreastfeedPage.Header'),
      image: WhyMilkWithdrawalTwo,
      content: [
        {
          id: '1',
          text: (
            <ContentText>{i18n.t('WhyBreastfeedPage.Page2.Text1')}</ContentText>
          ),
        },
      ],
    },
    {
      id: '3',
      title: i18n.t('WhyBreastfeedPage.Header'),
      image: WhyMilkWithdrawalTwo,
      content: [
        {
          id: '1',
          text: (
            <ContentText>
              {i18n.t('WhyBreastfeedPage.Page3.Text1')}
              <ColoredContentText>
                {i18n.t('WhyBreastfeedPage.Page3.Text2')}
              </ColoredContentText>
              {i18n.t('WhyBreastfeedPage.Page3.Text3')}
            </ContentText>
          ),
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
      context: { screen: AppScreen.WhyBreastfeed },
    });
  }, []);

  return (
    <InformationPages
      data={pages}
      PageModel={createGenericInfoPage({ onEnd })}
    />
  );
};

export default WhyBreastfeed;
