import React from 'react';

import OptionsList from '../../components/OptionList';

import { Container, ScrollView } from './styles';

const Premature: React.FC = () => {
  const options = [
    {
      image: require('../../../assets/images/premature_birth.png'),
      title: 'Informação: emoções X amamentação',
      subtitle: 'Subtítulo 1',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/premature_baby.png'),
      title: 'Caixinha da distração',
      subtitle: 'Subtítulo 2',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/premature_heart.png'),
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

export default Premature;