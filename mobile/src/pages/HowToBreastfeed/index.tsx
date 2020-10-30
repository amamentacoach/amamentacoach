import React from 'react';

import OptionsList from '../../components/OptionList';

import { Container, HeaderText, ScrollView } from './styles';

const HowToBreastFeed: React.FC = () => {
  const options = [
    {
      image: require('../../../assets/images/withdrawal_question.png'),
      title: 'Por que fazer?',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/premature_breastfeed.png'),
      title: 'Como fazer?',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/withdrawal_calendar.png'),
      title: 'Quando fazer?',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/withdrawal_clock.png'),
      title: 'Por quanto tempo fazer?',
      onPress: () => {},
    },
  ];

  return (
    <Container>
      <ScrollView>
        <HeaderText>
          Tudo o que você precisa saber sobre retirada do leite
        </HeaderText>
        <OptionsList options={options} />
      </ScrollView>
    </Container>
  );
};

export default HowToBreastFeed;
