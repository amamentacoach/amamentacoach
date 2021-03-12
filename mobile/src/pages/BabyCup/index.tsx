import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';

import {
  Step,
  ScrollView,
  Instruction,
  InstructionContainer,
  VideoLink,
} from './styles';

const HowToBreastFeed: React.FC = () => {
  const steps = [
    'Despertar o bebê, massagear os pés e a face. Não deixar que o bebê esteja agitado de fome ou outro desconforto, pois dificulta a manobra.',
    'Acomodar o bebê na posição sentada ou semi-sentada em seu colo, sendo que a cabeça forme um ângulo de 90º com o pescoço.',
    'Encostar a borda do copo no lábio inferior do bebê e deixar o leite materno tocar o lábio.',
    'O bebê fará movimentos de lambida do leite seguidos de deglutição, cuida para não despejar o leite na boca do bebê.',
  ];

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={async () => {
          await Linking.openURL(
            'https://www.facebook.com/bancodeleitehumanodemaringa/videos/1023462897842307/',
          );
        }}>
        <VideoLink>Demonstração</VideoLink>
      </TouchableOpacity>
      {steps.map((step, index) => (
        <InstructionContainer key={step}>
          <Step>{index + 1}.</Step>
          <Instruction>{step}</Instruction>
        </InstructionContainer>
      ))}
    </ScrollView>
  );
};

export default HowToBreastFeed;
