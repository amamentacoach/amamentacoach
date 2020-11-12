import React from 'react';
import { useNavigation } from '@react-navigation/native';

import OptionsList from '../../components/OptionList';

import ScrollView from './styles';

const EmotionsAndBreastfeeding: React.FC = () => {
  const navigation = useNavigation();

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
      onPress: () => {
        navigation.navigate('Distractions');
      },
    },
    {
      image: require('../../../assets/images/emotions_jacobson.png'),
      title: 'Técnica de Relaxamento de Jacobson',
      subtitle: 'Subtítulo 3',
      onPress: () => {
        navigation.navigate('VideoPage', { videos: ['C2hFGeJj48k'] });
      },
    },
  ];

  return (
    <ScrollView>
      <OptionsList options={options} />
    </ScrollView>
  );
};

export default EmotionsAndBreastfeeding;
