import React from 'react';
import { Linking } from 'react-native';

import OptionsList from '../../components/OptionList';

import { Container, ScrollView, HeaderText } from './styles';

const Distractions: React.FC = () => {
  const options = [
    {
      image: require('../../../assets/images/puzzle.png'),
      title: 'Quebra-cabeça',
      subtitle: 'Subtítulo 4',
      onPress: async () => {
        await Linking.openURL(
          'https://www.geniol.com.br/raciocinio/quebra-cabeca',
        );
      },
    },
    {
      image: require('../../../assets/images/crosswords.png'),
      title: 'Palavras Cruzadas',
      subtitle: 'Subtítulo 3',
      onPress: async () => {
        await Linking.openURL(
          'https://cruzadasclube.com.br/jogo/categoria/id/1/n/cruzadas-classicas',
        );
      },
    },
    {
      image: require('../../../assets/images/music.png'),
      title: 'Músicas para relaxar',
      subtitle: 'Subtítulo 4',
      onPress: async () => {
        await Linking.openURL(
          'https://www.youtube.com/results?search_query=m%C3%BAsicas+para+relaxar',
        );
      },
    },
  ];

  return (
    <Container>
      <ScrollView>
        <HeaderText>
          Você não só pode como deve pensar em outras coisas além dos desafios
          da prematuridade e da amamentação! E, às vezes, não pensar em NADA!
        </HeaderText>
        <OptionsList options={options} displayArrows />
      </ScrollView>
    </Container>
  );
};

export default Distractions;
