import React from 'react';
import { useNavigation } from '@react-navigation/native';

import InformationPages from '../../../components/InformationPages';
import createGenericInfoPage from '../../../components/GenericInfoPage';

const pages = [
  {
    id: 1,
    title: '6 passos para amamentação do bebê prematuro',
    content: [
      {
        text:
          'Com o nascimento prematuro, é comum que o bebê não consiga pegar o peito logo ao nascer e que ele precise ficar internado para receber alguns cuidados.\n\n Apesar dos desafios, saiba que amamentar o bebê prematuro é possível, e que vale cada esforço!\n\n Os passos a seguir resumem a jornada rumo ao sucesso na amamentação do prematuro',
      },
    ],
  },
  {
    id: 2,
    image: require('../../../../assets/images/meditation.png'),
    title: '1.  Procure a serenidade',
    content: [
      {
        text:
          'Parto prematuro: expectativas frustradas, incertezas, medo... quem espera que seu bebê nasça antes da hora?\nRecupere-se do susto, respire fundo, deixe a nova realidade se encaixar na sua cabeça e no seu coração, e então, abrace-a!',
      },
    ],
  },
  {
    id: 3,
    title: '2. Estimule a produção láctea',
    image: require('../../../../assets/images/milk.png'),
    content: [
      {
        text:
          'Enquanto o bebê não puder pegar o peito, ou enquanto ele não mamar o suficiente, você vai precisar substituí-lo na tarefa de manter suas mamas produzindo leite. Para isso, precisa retirar o leite no mínimo a cada 3 horas.',
      },
    ],
  },
  {
    id: 4,
    title: '3. Estreite o vínculo',
    image: require('../../../../assets/images/heart.png'),
    content: [
      {
        text:
          'Permaneça o maior tempo possível na Unidade Neonatal, faça muito canguru, observe seu bebê, toque nele, fale com ele, cante pra ele...tudo isso também vai estimular seu corpo a produzir mais leite.',
      },
    ],
  },
  {
    id: 5,
    title: '4. Seja a protagonista',
    image: require('../../../../assets/images/protagonist.png'),
    content: [
      {
        text:
          'Cuide do seu bebê: faça a limpeza dos olhinhos e da boquinha, troque fraldas, dê banho; observe o jeitinho dele(a) e aprenda sobre seus costumes e preferências. Só você pode fazer seu papel de mãe!',
      },
    ],
  },
  {
    id: 6,
    title: '5. Invista em uma rede de apoio',
    image: require('../../../../assets/images/community.png'),
    content: [
      {
        text:
          'Procure apoio nos profissionais do serviço (enfermeiros, técnicos, médicos, psicólogos, assistentes sociais...) e em pessoas de sua confiança que te façam bem. Lembre-se: você não está sozinha!',
      },
    ],
  },
  {
    id: 7,
    title: '6. Mantenha a paciência',
    image: require('../../../../assets/images/time.png'),
    content: [
      {
        text:
          'Quando seu bebê começar a mamar, não se esqueça de que por ser prematuro, ele pode ser mais sonolento, mais “molinho”, e poderá precisar de mais tempo até conseguir dar conta do recado. ',
      },
    ],
  },
];

const StepByStepPremature: React.FC = () => {
  const navigation = useNavigation();
  const onEnd = () => navigation.goBack();

  return (
    <InformationPages pages={pages} PageModel={createGenericInfoPage(onEnd)} />
  );
};

export default StepByStepPremature;
