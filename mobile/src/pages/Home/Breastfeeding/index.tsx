import { Action, AppScreen } from '@common/telemetria';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';
import { Linking } from 'react-native';

import OptionsList from 'components/OptionList';
import { PaddedScrollView } from 'lib/sharedStyles';
import { getBestLocale } from 'utils/localize';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { OptionListEntry } from 'components/OptionList';
import type { RootStackProps } from 'routes/app';

import { HeaderText } from './styles';

import PrematureBreastfeed from '@assets/images/premature_breastfeed.svg';
import WithdrawalCalendar from '@assets/images/withdrawal_calendar.svg';
import WithdrawalClock from '@assets/images/withdrawal_clock.svg';
import WithdrawalQuestion from '@assets/images/withdrawal_question.svg';

const Breastfeeding: React.FC = () => {
  const { languageTag } = getBestLocale();
  const navigation = useNavigation<RootStackProps>();

  const options: OptionListEntry[] = [
    {
      image: { source: WithdrawalQuestion },
      title: i18n.t('BreastfeedingPage.1'),
      onPress: () => navigation.navigate('WhyBreastfeed'),
    },
    {
      image: { source: PrematureBreastfeed },
      title: i18n.t('BreastfeedingPage.2'),
      onPress: () => navigation.navigate('HowToBreastfeed'),
    },
    {
      image: { source: WithdrawalCalendar },
      title: i18n.t('BreastfeedingPage.3'),
      onPress: () => navigation.navigate('WhenToBreastfeed'),
    },
    {
      image: { source: WithdrawalClock },
      title: i18n.t('BreastfeedingPage.4'),
      onPress: () => navigation.navigate('HowLongToBreastfeed'),
    },
  ];
  if (languageTag === 'en') {
    options.push({
      image: { source: WithdrawalQuestion },
      title: i18n.t('BreastfeedingPage.5'),
      onPress: () =>
        Linking.openURL(
          'https://www.healthlinkbc.ca/pregnancy-parenting/parenting-babies-0-12-months/breastfeeding/video-hand-expressing-breastmilk',
        ),
    });
  }

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.Breastfeeding },
    });
  }, []);

  return (
    <PaddedScrollView>
      <HeaderText>{i18n.t('BreastfeedingPage.Header')}</HeaderText>
      <OptionsList options={options} />
    </PaddedScrollView>
  );
};

export default Breastfeeding;
