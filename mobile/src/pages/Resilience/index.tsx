import React from 'react';
import { useNavigation } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';

import OptionsList from '../../components/OptionList';

import { ScrollView, PageHeader, Header, Text } from './styles';

const Resilience: React.FC = () => {
  const navigation = useNavigation();
  const options = [
    {
      image: require('../../../assets/images/erlenmeyer_primary.png'),
      title: '1. Manter expectativas realistas',
      onPress: () => {
        navigation.navigate('EmotionsAndBreastfeeding');
      },
    },
    {
      image: require('../../../assets/images/erlenmeyer_yellow.png'),
      title: '2. Buscar apoio social e conexão de grupo',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/erlenmeyer_green.png'),
      title: '3. Desenvolver uma maneira positiva de pensar',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/erlenmeyer_pink.png'),
      title: '4. Construir força e autoconfiança',
      onPress: () => {},
    },
  ];

  return (
    <ScrollView>
      <PageHeader>Você sabe o que é Resiliência?</PageHeader>
      <YoutubePlayer
        height={200}
        videoId="OodQ5ZBcAT4"
        initialPlayerParams={{ loop: false }}
      />
      <Header>Mamães mais resilientes!</Header>
      <Text>
        Cientistas afirmam que é possível AUMENTAR a RESILIÊNCIA adotando pelo
        menos 4 comportamentos favoráveis.{'\n'}Várias atividades do App
        contemplam um ou mais desses ingredientes poderosos! Aumente sua força,
        turbine sua resiliência: escolha por onde quer começar e aproveite todo
        o conteúdo!
      </Text>
      <OptionsList options={options} displayArrows />
    </ScrollView>
  );
};

export default Resilience;
