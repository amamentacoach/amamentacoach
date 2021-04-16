import React from 'react';
import { useNavigation } from '@react-navigation/native';

import OptionsList from '../../../components/OptionList';

import ScrollView from './styles';

const AdditionalInformation: React.FC = () => {
  const navigation = useNavigation();
  const options = [
    {
      image: require('../../../../assets/images/premature_breastfeed.png'),
      title: 'Como meu leite é produzido?',
      subtitle: 'Saiba como seu corpo produz o leite',
      onPress: () => navigation.navigate('MilkAdditionalInformation'),
    },
    {
      image: require('../../../../assets/images/premature_baby.png'),
      title: 'Benefícios do Canguru',
      subtitle: 'Como o canguru pode ajudar',
      onPress: () => navigation.navigate('BabySling'),
    },
    {
      image: require('../../../../assets/images/diary_smile.png'),
      title: 'Você sabe o que é Resiliência?',
      subtitle: 'Explicamos pra você!',
      onPress: () => navigation.navigate('Resilience'),
    },
    {
      image: require('../../../../assets/images/change.png'),
      title: 'Reformulando as expectativas',
      subtitle: 'Troque expectativas que são improváveis por realistas',
      onPress: () => navigation.navigate('ManageExpectations'),
    },
    {
      image: require('../../../../assets/images/emotions_info.png'),
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
