import React from 'react';

import { useNavigation } from '@react-navigation/native';

import OptionsList, { Options } from '../../../components/OptionList';

import ScrollView from './styles';

import PrematureBaby from '../../../../assets/images/premature_baby.svg';
import PrematureBirth from '../../../../assets/images/premature_birth.svg';
import PrematureHeart from '../../../../assets/images/premature_heart.svg';
import PrematureTrophy from '../../../../assets/images/premature_trophy.svg';

const Premature: React.FC = () => {
  const navigation = useNavigation();
  const options: Options[] = [
    {
      image: PrematureBirth,
      title: 'Parto prematuro: não era isso que eu esperava',
      onPress: () => navigation.navigate('NotWhatIExpected'),
    },
    {
      image: PrematureBaby,
      title: 'Muito prazer, eu sou o Prematuro',
      onPress: () => navigation.navigate('ThePremature'),
    },
    {
      image: PrematureHeart,
      title: 'Minha maior motivação para amamentar',
      onPress: () => navigation.navigate('UploadBabyPhoto'),
    },
    {
      image: PrematureTrophy,
      title: 'Um período de luta, toda uma vida de resultados',
      subtitle: 'Benefícios da amamentação',
      onPress: () => navigation.navigate('BreastfeedingBenefits'),
    },
  ];

  return (
    <ScrollView>
      <OptionsList options={options} />
    </ScrollView>
  );
};

export default Premature;
