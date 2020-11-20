import React from 'react';
import { useNavigation } from '@react-navigation/native';

import OptionsList from '../../components/OptionList';

import ScrollView from './styles';

const ThePremature: React.FC = () => {
  const navigation = useNavigation();
  const options = [
    {
      image: require('../../../assets/images/ic_video.png'),
      title: 'Vídeo “Muito prazer, eu sou o prematuro”',
      subtitle: 'Subtítulo 1',
      onPress: () => {
        navigation.navigate('VideoPage', { videos: ['w2rbi3aW-rA'] });
      },
    },
    {
      image: require('../../../assets/images/premature_survey.png'),
      title: 'Enquete: Amamentar um prematuro',
      subtitle: 'Subtítulo 2',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/premature_breastfeed.png'),
      title: 'Infográfico: 6 passos para a amamentação',
      subtitle: 'Subtítulo 3',
      onPress: () => {
        navigation.navigate('StepByStepPremature');
      },
    },
  ];

  return (
    <ScrollView>
      <OptionsList options={options} />
    </ScrollView>
  );
};

export default ThePremature;
