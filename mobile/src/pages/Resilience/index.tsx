import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';

import { ActivityIndicator } from 'react-native';
import OptionsList from '../../components/OptionList';

import {
  ScrollView,
  PageHeader,
  Header,
  Text,
  VideoContainer,
  LoadingContainer,
} from './styles';

const Resilience: React.FC = () => {
  const navigation = useNavigation();
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);

  const options = [
    {
      image: require('../../../assets/images/erlenmeyer_primary.png'),
      title: '1. Manter expectativas realistas',
      onPress: () => navigation.navigate('EmotionsAndBreastfeeding'),
    },
    {
      image: require('../../../assets/images/erlenmeyer_yellow.png'),
      title: '2. Buscar apoio social e conexão de grupo',
      onPress: () => navigation.navigate('Messages'),
    },
    {
      image: require('../../../assets/images/erlenmeyer_green.png'),
      title: '3. Desenvolver uma maneira positiva de pensar',
      onPress: () => navigation.navigate('Diary'),
    },
    {
      image: require('../../../assets/images/erlenmeyer_pink.png'),
      title: '4. Construir força e autoconfiança',
      onPress: () => navigation.navigate('UploadMotherPhoto'),
    },
  ];

  return (
    <ScrollView>
      <PageHeader>Você sabe o que é Resiliência?</PageHeader>
      {isLoadingVideo ? (
        <LoadingContainer>
          <ActivityIndicator
            size="large"
            color="#7d5cd7"
            animating={isLoadingVideo}
          />
        </LoadingContainer>
      ) : null}
      <VideoContainer display={!isLoadingVideo}>
        <YoutubePlayer
          height={200}
          videoId="KGedLLSN0FU"
          initialPlayerParams={{ loop: false }}
          onReady={() => {
            setIsLoadingVideo(false);
          }}
        />
      </VideoContainer>
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
