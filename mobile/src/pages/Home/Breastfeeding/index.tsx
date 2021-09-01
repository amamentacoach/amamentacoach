import React from 'react';

import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';

import OptionsList, { Options } from '../../../components/OptionList';

import { HeaderText, ScrollView } from './styles';

import PrematureBreastfeed from '../../../../assets/images/premature_breastfeed.svg';
import WithdrawalCalendar from '../../../../assets/images/withdrawal_calendar.svg';
import WithdrawalClock from '../../../../assets/images/withdrawal_clock.svg';
import WithdrawalQuestion from '../../../../assets/images/withdrawal_question.svg';

const Breastfeeding: React.FC = () => {
  const navigation = useNavigation();

  const options: Options[] = [
    {
      image: WithdrawalQuestion,
      title: i18n.t('BreastfeedingPage.1'),
      onPress: () => navigation.navigate('WhyBreastfeed'),
    },
    {
      image: PrematureBreastfeed,
      title: i18n.t('BreastfeedingPage.2'),
      onPress: () => navigation.navigate('HowToBreastfeed'),
    },
    {
      image: WithdrawalCalendar,
      title: i18n.t('BreastfeedingPage.3'),
      onPress: () => navigation.navigate('WhenToBreastfeed'),
    },
    {
      image: WithdrawalClock,
      title: i18n.t('BreastfeedingPage.4'),
      onPress: () => navigation.navigate('HowLongToBreastfeed'),
    },
  ];

  return (
    <ScrollView>
      <HeaderText>{i18n.t('BreastfeedingPage.Header')}</HeaderText>
      <OptionsList options={options} />
    </ScrollView>
  );
};

export default Breastfeeding;
