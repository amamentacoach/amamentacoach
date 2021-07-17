import React from 'react';

import { useNavigation } from '@react-navigation/native';

import OptionsList, { Options } from '../../../components/OptionList';

import ScrollView from './styles';

import Change from '../../../../assets/images/change.svg';
import DiarySmile from '../../../../assets/images/diary_smile.svg';
import EmotionsInfo from '../../../../assets/images/emotions_info.svg';
import PrematureBaby from '../../../../assets/images/premature_baby.svg';
import PrematureBreastfeed from '../../../../assets/images/premature_breastfeed.svg';

const AdditionalInformation: React.FC = () => {
  const navigation = useNavigation();
  const options: Options[] = [
    {
      image: PrematureBreastfeed,
      title: 'Como meu leite é produzido?',
      subtitle: 'Saiba como seu corpo produz o leite',
      onPress: () => navigation.navigate('MilkAdditionalInformation'),
    },
    {
      image: PrematureBaby,
      title: 'Benefícios do Canguru',
      subtitle: 'Como o canguru pode ajudar',
      onPress: () => navigation.navigate('BabySling'),
    },
    {
      image: DiarySmile,
      title: 'Você sabe o que é Resiliência?',
      subtitle: 'Explicamos pra você!',
      onPress: () => navigation.navigate('Resilience'),
    },
    {
      image: Change,
      title: 'Reformulando as expectativas',
      subtitle: 'Troque expectativas que são improváveis por realistas',
      onPress: () => navigation.navigate('ManageExpectations'),
    },
    {
      image: EmotionsInfo,
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
