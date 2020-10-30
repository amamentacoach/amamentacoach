import React from 'react';

import OptionsList from '../../components/OptionList';

import { Container, ScrollView } from './styles';

const EmotionsAndBreastfeeding: React.FC = () => {
  const options = [
    {
      image: require('../../../assets/images/emotions_info.png'),
      title: 'Informação: emoções X amamentação',
      subtitle: 'Subtítulo 1',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/emotions_box.png'),
      title: 'Caixinha da distração',
      subtitle: 'Subtítulo 2',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/emotions_jacobson.png'),
      title: 'Técnica de Relaxamento de Jacobson',
      subtitle: 'Subtítulo 3',
      onPress: () => {},
    },
  ];

  return (
    <Container>
      <ScrollView>
        <OptionsList options={options} />
      </ScrollView>
    </Container>
  );
};

export default EmotionsAndBreastfeeding;
