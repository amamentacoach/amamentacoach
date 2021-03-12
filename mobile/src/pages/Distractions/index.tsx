import React from 'react';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import OptionsList from '../../components/OptionList';

import { ScrollView, HeaderText } from './styles';

const Distractions: React.FC = () => {
  const navigation = useNavigation();
  const options = [
    {
      image: require('../../../assets/images/puzzle.png'),
      title: 'Quebra-cabeça',
      onPress: async () => {
        await Linking.openURL(
          'https://www.geniol.com.br/raciocinio/quebra-cabeca',
        );
      },
    },
    {
      image: require('../../../assets/images/crosswords.png'),
      title: 'Palavras Cruzadas',
      onPress: async () => {
        await Linking.openURL(
          'https://cruzadasclube.com.br/jogo/categoria/id/1/n/cruzadas-classicas',
        );
      },
    },
    {
      image: require('../../../assets/images/music.png'),
      title: 'Músicas para relaxar',
      onPress: () => navigation.navigate('MusicPlaylists'),
    },
  ];

  return (
    <ScrollView>
      <HeaderText>
        Você não só pode como deve pensar em outras coisas além dos desafios da
        prematuridade e da amamentação! E, às vezes, não pensar em NADA!
      </HeaderText>
      <OptionsList options={options} displayArrows />
    </ScrollView>
  );
};

export default Distractions;
