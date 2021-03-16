import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../contexts/auth';
import OptionsList from '../../components/OptionList';

import ScrollView from './styles';

const AdditionalInformation: React.FC = () => {
  const { motherInfo } = useAuth();

  const navigation = useNavigation();
  let options = [
    {
      image: require('../../../assets/images/premature_breastfeed.png'),
      title: 'Como meu leite é produzido?',
      subtitle: 'Saiba como seu corpo produz o leite',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/premature_baby.png'),
      title: 'Benefícios do Canguru',
      subtitle: 'Como o canguru pode ajudar',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/diary_smile.png'),
      title: 'Você sabe o que é Resiliência?',
      subtitle: 'Explicamos pra você!',
      onPress: () => {
        navigation.navigate('Resilience');
      },
    },
    {
      image: require('../../../assets/images/change.png'),
      title: 'Reformulando as expectativas',
      subtitle: 'Troque expectativas que são improváveis por realistas',
      onPress: () => {
        navigation.navigate('Expectations');
      },
    },
    {
      image: require('../../../assets/images/emotions_info.png'),
      title: 'Oferta de leite pelo copinho',
      subtitle: 'Vídeo Demonstrativo',
      onPress: () => {
        navigation.navigate('BabyCup');
      },
    },
  ];

  // Exibe o upload de imagem do pai apenas se a mãe tem um companheiro.
  if (motherInfo.partner) {
    options = [
      ...options,
      {
        image: require('../../../assets/images/father.png'),
        title: 'Participação do Pai',
        subtitle: 'Registre e acompanhe a participação do papai',
        onPress: () => {
          navigation.navigate('UploadFatherPhoto');
        },
      },
    ];
  }

  return (
    <ScrollView>
      <OptionsList options={options} />
    </ScrollView>
  );
};

export default AdditionalInformation;
