import React from 'react';
import { useNavigation } from '@react-navigation/native';

import OptionsList, { OptionList } from '../../../components/OptionList';

import { HeaderText, ScrollView } from './styles';

import WithdrawalQuestion from '../../../../assets/images/withdrawal_question.svg';
import PrematureBreastfeed from '../../../../assets/images/premature_breastfeed.svg';
import WithdrawalCalendar from '../../../../assets/images/withdrawal_calendar.svg';
import WithdrawalClock from '../../../../assets/images/withdrawal_clock.svg';

const Breastfeeding: React.FC = () => {
  const navigation = useNavigation();

  const options: OptionList[] = [
    {
      Image: WithdrawalQuestion,
      title: 'Por que fazer?',
      onPress: () => navigation.navigate('WhyBreastfeed'),
    },
    {
      Image: PrematureBreastfeed,
      title: 'Como fazer?',
      onPress: () => navigation.navigate('HowToBreastfeed'),
    },
    {
      Image: WithdrawalCalendar,
      title: 'Quando fazer?',
      onPress: () => navigation.navigate('WhenToBreastfeed'),
    },
    {
      Image: WithdrawalClock,
      title: 'Por quanto tempo fazer?',
      onPress: () => navigation.navigate('HowLongToBreastfeed'),
    },
  ];

  return (
    <ScrollView>
      <HeaderText>
        Tudo o que você precisa saber sobre retirada do leite
      </HeaderText>
      <OptionsList options={options} />
    </ScrollView>
  );
};

export default Breastfeeding;
