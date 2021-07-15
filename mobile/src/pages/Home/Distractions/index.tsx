import React from 'react';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import OptionsList, { Options } from '../../../components/OptionList';

import { ScrollView, HeaderText } from './styles';

import Puzzle from '../../../../assets/images/puzzle.svg';
import Crosswords from '../../../../assets/images/crosswords.svg';
import Music from '../../../../assets/images/music.svg';

const Distractions: React.FC = () => {
  const navigation = useNavigation();
  const options: Options[] = [
    {
      image: Puzzle,
      title: 'Quebra-cabeça',
      onPress: async () => {
        await Linking.openURL(
          'https://www.geniol.com.br/raciocinio/quebra-cabeca',
        );
      },
    },
    {
      image: Crosswords,
      title: 'Palavras Cruzadas',
      onPress: async () => {
        await Linking.openURL(
          'https://cruzadasclube.com.br/jogo/categoria/id/1/n/cruzadas-classicas',
        );
      },
    },
    {
      image: Music,
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
