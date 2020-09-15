import React from 'react';
import { StatusBar } from 'react-native';

import InfoList from './pages/InfoList';

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

// TODO Adicionar fontes.
const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <InfoList pages={pages} />
    </>
  );
};

export default App;
