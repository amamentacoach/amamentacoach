import React from 'react';

import { useNavigation } from '@react-navigation/native';
import InfoList from '../../components/InfoList';
import { ContinueButton, ButtonText } from './styles';

const pages = [
  {
    paragraph:
      'Bem vinda! O AmamentaCoach foi pensado para te auxiliar na desafiadora jornada de amamentar um bebê prematuro.',
  },
  {
    paragraph:
      'Você registrará seus avanços diários e terá acesso a conteúdos exclusivos para te instruir e te motivar!',
  },
  {
    paragraph:
      'Quanto mais você usar o AmamentaCoach , mais recursos terá para amamentar seu bebê prematuro!',
  },
  {
    paragraph: 'Explore cada ícone e faça do App seu grande aliado! ',
  },
];

const Introduction: React.FC = () => {
  const navigation = useNavigation();

  function continueButton() {
    return (
      <ContinueButton onPress={() => navigation.navigate('Cadastro')}>
        <ButtonText>Vamos começar!</ButtonText>
      </ContinueButton>
    );
  }

  return <InfoList pages={pages} lastPageButton={continueButton()} />;
};

export default Introduction;