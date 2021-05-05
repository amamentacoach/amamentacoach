import React from 'react';
import { useNavigation } from '@react-navigation/native';

import OptionsList, { OptionList } from '../../../components/OptionList';

import ScrollView from './styles';

import PrematureBreastfeed from '../../../../assets/images/premature_breastfeed.svg';
import PrematureBaby from '../../../../assets/images/premature_baby.svg';
import DiarySmile from '../../../../assets/images/diary_smile.svg';
import Change from '../../../../assets/images/change.svg';
import EmotionsInfo from '../../../../assets/images/emotions_info.svg';

const AdditionalInformation: React.FC = () => {
  const navigation = useNavigation();
  const options: OptionList[] = [
    {
      Image: PrematureBreastfeed,
      title: 'Como meu leite é produzido?',
      subtitle: 'Saiba como seu corpo produz o leite',
      onPress: () => navigation.navigate('MilkAdditionalInformation'),
    },
    {
      Image: PrematureBaby,
      title: 'Benefícios do Canguru',
      subtitle: 'Como o canguru pode ajudar',
      onPress: () => navigation.navigate('BabySling'),
    },
    {
      Image: DiarySmile,
      title: 'Você sabe o que é Resiliência?',
      subtitle: 'Explicamos pra você!',
      onPress: () => navigation.navigate('Resilience'),
    },
    {
      Image: Change,
      title: 'Reformulando as expectativas',
      subtitle: 'Troque expectativas que são improváveis por realistas',
      onPress: () => navigation.navigate('ManageExpectations'),
    },
    {
      Image: EmotionsInfo,
      title: 'Oferta de leite pelo copinho',
      subtitle: 'Vídeo Demonstrativo',
      onPress: () => navigation.navigate('BabyCup'),
    },
  ];

  return (
    <ScrollView>
      <OptionsList options={options} />
    </ScrollView>
  );
};

export default AdditionalInformation;
