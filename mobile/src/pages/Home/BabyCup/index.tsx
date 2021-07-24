import React, { useState } from 'react';

import { ActivityIndicator, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

import {
  Instruction,
  InstructionContainer,
  LoadingContainer,
  ScrollView,
  Step,
  VideoContainer,
  VideoLink,
} from './styles';

const BabyCup: React.FC = () => {
  const { height } = Dimensions.get('window');
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);

  const steps = [
    'Despertar o bebê, massagear os pés e a face. Não deixar que o bebê esteja agitado de fome ou outro desconforto, pois dificulta a manobra.',
    'Acomodar o bebê na posição sentada ou semi-sentada em seu colo, sendo que a cabeça forme um ângulo de 90º com o pescoço.',
    'Encostar a borda do copo no lábio inferior do bebê e deixar o leite materno tocar o lábio.',
    'O bebê fará movimentos de lambida do leite seguidos de deglutição, cuida para não despejar o leite na boca do bebê.',
  ];

  return (
    <ScrollView>
      <VideoLink>Demonstração</VideoLink>
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
          videoId="-VBk8v8TOrE"
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
      {steps.map((step, index) => (
        <InstructionContainer key={step}>
          <Step>{index + 1}.</Step>
          <Instruction>{step}</Instruction>
        </InstructionContainer>
      ))}
    </ScrollView>
  );
};

export default BabyCup;
