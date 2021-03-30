import React from 'react';
import { useNavigation } from '@react-navigation/native';

import OptionsList from '../../../components/OptionList';

import ScrollView from './styles';

const EmotionsAndBreastfeeding: React.FC = () => {
  const navigation = useNavigation();

  const options = [
    {
      image: require('../../../../assets/images/emotions_info.png'),
      title: 'Informação: emoções X amamentação',
      onPress: () => {},
    },
    {
      image: require('../../../../assets/images/emotions_box.png'),
      title: 'Caixinha da distração',
      onPress: () => navigation.navigate('Distractions'),
    },
    {
      image: require('../../../../assets/images/emotions_jacobson.png'),
      title: 'Técnica de Relaxamento de Jacobson',
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['C2hFGeJj48k'] }),
    },
  ];

  return (
    <ScrollView>
      <OptionsList options={options} />
    </ScrollView>
  );
};

export default EmotionsAndBreastfeeding;
