import React from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';
import InfoList from '../../components/InfoList';
import MainButton from '../../components/MainButton';
import { useIsFirstRun } from '../../contexts/firstRun';

const pages = [
  {
    paragraph:
      'Bem vinda! O AmamentaCoach foi pensado para te auxiliar na desafiadora jornada de amamentar um bebê prematuro.',
    image: require('../../../assets/images/intro_mother.png'),
  },
  {
    paragraph:
      'Você registrará seus avanços diários e terá acesso a conteúdos exclusivos para te instruir e te motivar!',
    image: require('../../../assets/images/intro_diary_diary.png'),
  },
  {
    paragraph:
      'Quanto mais você usar o AmamentaCoach , mais recursos terá para amamentar seu bebê prematuro!',
    image: require('../../../assets/images/intro_chart.png'),
  },
  {
    paragraph: 'Explore cada ícone e faça do App seu grande aliado! ',
    image: require('../../../assets/images/intro_mobile.png'),
  },
];

const Introduction: React.FC = () => {
  const { setNotFirstRun } = useIsFirstRun();

  async function handleSkip() {
    setNotFirstRun();
  }

  function continueButton() {
    return <MainButton buttonText="Vamos começar!" onPress={handleSkip} />;
  }

  return (
    <InfoList
      pages={pages}
      LastPageButton={continueButton()}
      skipIntroduction={handleSkip}
    />
  );
};

export default Introduction;
