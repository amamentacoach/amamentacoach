import React, { useState } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';

import OptionsList, { Options } from '../../../components/OptionList';

import {
  ScrollView,
  PageHeader,
  Header,
  Text,
  VideoContainer,
  LoadingContainer,
} from './styles';

import ErlenmeyerPrimary from '../../../../assets/images/erlenmeyer_primary.svg';
import ErlenmeyerYellow from '../../../../assets/images/erlenmeyer_yellow.svg';
import ErlenmeyerGreen from '../../../../assets/images/erlenmeyer_green.svg';
import ErlenmeyerPink from '../../../../assets/images/erlenmeyer_pink.svg';

const Resilience: React.FC = () => {
  const { height } = Dimensions.get('window');
  const navigation = useNavigation();
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);

  const options: Options[] = [
    {
      image: ErlenmeyerPrimary,
      title: '1. Manter expectativas realistas',
      onPress: () => navigation.navigate('ManageExpectations'),
    },
    {
      image: ErlenmeyerYellow,
      title: '2. Buscar apoio social e conexão de grupo',
      onPress: () => navigation.navigate('Messages'),
    },
    {
      image: ErlenmeyerGreen,
      title: '3. Desenvolver uma maneira positiva de pensar',
      onPress: () => navigation.navigate('Diary'),
    },
    {
      image: ErlenmeyerPink,
      title: '4. Construir força e autoconfiança',
      onPress: () => navigation.navigate('UploadMotherPhoto'),
    },
  ];

  return (
    <ScrollView>
      <PageHeader>Você sabe o que é Resiliência?</PageHeader>
      {isLoadingVideo && (
        <LoadingContainer>
          <ActivityIndicator
            size="large"
            color="#7d5cd7"
            animating={isLoadingVideo}
          />
        </LoadingContainer>
      )}
      <VideoContainer display={!isLoadingVideo}>
        <YoutubePlayer
          height={height / 3}
          videoId="KGedLLSN0FU"
          initialPlayerParams={{ loop: false }}
          onReady={() => setIsLoadingVideo(false)}
          webViewProps={{
            injectedJavaScript: `
            var element = document.getElementsByClassName('container')[0];
            element.style.position = 'unset';
            true;
          `,
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
