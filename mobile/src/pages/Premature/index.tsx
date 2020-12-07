import React from 'react';
import { useNavigation } from '@react-navigation/native';

import OptionsList from '../../components/OptionList';

import ScrollView from './styles';

const Premature: React.FC = () => {
  const navigation = useNavigation();
  const options = [
    {
      image: require('../../../assets/images/premature_birth.png'),
      title: 'Parto prematuro: não era isso que eu esperava',
      onPress: () => {
        navigation.navigate('NotWhatIExpected');
      },
    },
    {
      image: require('../../../assets/images/premature_baby.png'),
      title: 'Muito prazer, eu sou o Prematuro',
      onPress: () => {
        navigation.navigate('ThePremature');
      },
    },
    {
      image: require('../../../assets/images/premature_heart.png'),
      title: 'Minha maior motivação para amamentar',
      onPress: () => {
        navigation.navigate('UploadBabyPhoto');
      },
    },
    {
      image: require('../../../assets/images/premature_trophy.png'),
      title: 'Um período de luta, toda uma vida de resultados',
      subtitle: 'Benefícios da amamentação',
      onPress: () => {
        navigation.navigate('BreastfeedingBenefits');
      },
    },
  ];

  return (
    <ScrollView>
      <OptionsList options={options} />
    </ScrollView>
  );
};

export default Premature;
