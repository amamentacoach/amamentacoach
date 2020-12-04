import React from 'react';
import { useNavigation } from '@react-navigation/native';

import OptionsList from '../../components/OptionList';

import ScrollView from './styles';

const AdditionalInformation: React.FC = () => {
  const navigation = useNavigation();
  const options = [
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
      image: require('../../../assets/images/father.png'),
      title: 'Participação do Pai',
      subtitle: 'Registre e acompanhe a participação do papai',
      onPress: () => {
        navigation.navigate('UploadFatherPhoto');
      },
    },
    {
      image: require('../../../assets/images/change.png'),
      title: 'Reformulando as expectativas',
      subtitle: 'Troque expectativas que são improváveis por realistas',
      onPress: () => {},
    },
  ];

  return (
    <ScrollView>
      <OptionsList options={options} />
    </ScrollView>
  );
};

export default AdditionalInformation;
