import React from 'react';
import { useNavigation } from '@react-navigation/native';

import OptionsList, { OptionList } from '../../../components/OptionList';

import ScrollView from './styles';

import PrematureBirth from '../../../../assets/images/premature_birth.svg';
import PrematureBaby from '../../../../assets/images/premature_baby.svg';
import PrematureHeart from '../../../../assets/images/premature_heart.svg';
import PrematureTrophy from '../../../../assets/images/premature_trophy.svg';

const Premature: React.FC = () => {
  const navigation = useNavigation();
  const options: OptionList[] = [
    {
      Image: PrematureBirth,
      title: 'Parto prematuro: não era isso que eu esperava',
      onPress: () => navigation.navigate('NotWhatIExpected'),
    },
    {
      Image: PrematureBaby,
      title: 'Muito prazer, eu sou o Prematuro',
      onPress: () => navigation.navigate('ThePremature'),
    },
    {
      Image: PrematureHeart,
      title: 'Minha maior motivação para amamentar',
      onPress: () => navigation.navigate('UploadBabyPhoto'),
    },
    {
      Image: PrematureTrophy,
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
