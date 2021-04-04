import React from 'react';
import { useNavigation } from '@react-navigation/native';

import OptionsList from '../../../components/OptionList';

import { HeaderText, ScrollView } from './styles';

const HowToBreastFeed: React.FC = () => {
  const navigation = useNavigation();

  const options = [
    {
      image: require('../../../../assets/images/withdrawal_question.png'),
      title: 'Por que fazer?',
      onPress: () => navigation.navigate('WhyBreastfeed'),
    },
    {
      image: require('../../../../assets/images/premature_breastfeed.png'),
      title: 'Como fazer?',
      onPress: () => {},
    },
    {
      image: require('../../../../assets/images/withdrawal_calendar.png'),
      title: 'Quando fazer?',
      onPress: () => {},
    },
    {
      image: require('../../../../assets/images/withdrawal_clock.png'),
      title: 'Por quanto tempo fazer?',
      onPress: () => {},
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

export default HowToBreastFeed;
