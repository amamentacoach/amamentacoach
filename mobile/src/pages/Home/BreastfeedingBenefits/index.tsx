import React from 'react';
import { useNavigation } from '@react-navigation/native';

import InformationPages, {
  InfoPage,
} from '../../../components/InformationPages';
import createGenericInfoPage from '../../../components/GenericInfoPage';

import BreastfeedBenefits1 from '../../../../assets/images/breastfeed_benefits_1.png';
import BreastfeedBenefits2 from '../../../../assets/images/breastfeed_benefits_2.png';
import BreastfeedBenefits3 from '../../../../assets/images/breastfeed_benefits_3.png';
import BreastfeedBenefits4 from '../../../../assets/images/breastfeed_benefits_4.png';
import BreastfeedBenefits5 from '../../../../assets/images/breastfeed_benefits_5.png';
import BreastfeedBenefits6 from '../../../../assets/images/breastfeed_benefits_6.png';

const pages: InfoPage[] = [
  {
    id: 1,
    image: BreastfeedBenefits1,
    title: 'Benefícios da amamentação para a mãe e o bebê',
    content: [
      {
        text:
          'A amamentação ajuda na formação do vínculo desde muito cedo.\n\nO leite materno é o alimento mais completo para o bebê, além de oferecer muitas outras vantagens.\n\nNão há nada melhor do que amamentar o bebê somente no peito até o 6º mês de vida, e manter o aleitamento junto com alimentos saudáveis até 2 anos ou mais.',
      },
    ],
  },
  {
    id: 2,
    image: BreastfeedBenefits2,
    title: 'Benefícios da amamentação para o bebê',
    content: [
      {
        sectionHeader: 'SISTEMA IMUNOLÓGICO',
        text:
          'O leite materno ajuda a defender o organismo de várias doenças. O efeito das vacinas é melhor em crianças amamentadas. Diminui o risco de câncer infantil.',
      },
    ],
  },
  {
    id: 3,
    image: BreastfeedBenefits3,
    title: 'Benefícios da amamentação para o bebê',
    content: [
      {
        sectionHeader: 'BOCA',
        text: 'Favorece o desenvolvimento da face, da boca e da dentição.',
      },
      {
        sectionHeader: 'INTELIGÊNCIA',
        text:
          'Crianças amamentadas por mais de um ano têm coeficiente de inteligência (QI) maior.',
      },
    ],
  },
  {
    id: 4,
    image: BreastfeedBenefits4,
    title: 'Benefícios da amamentação para o bebê',
    content: [
      {
        sectionHeader: 'PROTEÇÃO',
        text:
          'Protege contra uma série de doenças, infecções e problemas como diarreia e prisão de ventre.',
      },
      {
        sectionHeader: 'QUANDO ADULTOS...',
        text: 'Reduz o risco de ter problemas como diabetes e colesterol.',
      },
    ],
  },
  {
    id: 5,
    image: BreastfeedBenefits5,
    title: 'Benefícios da amamentação para a mãe',
    content: [
      {
        sectionHeader: 'REDUZ O RISCO',
        text:
          'Pesquisas defendem que reduz o risco de câncer de mama, do ovário e de osteoporose.',
      },
    ],
  },
  {
    id: 6,
    image: BreastfeedBenefits6,
    title: 'Benefícios da amamentação para a mãe',
    content: [
      {
        sectionHeader: 'AJUDA',
        text: 'Recuperar o peso anterior à gravidez.',
      },
      {
        sectionHeader: 'PREVINE',
        text: 'Hemorragias no pós-parto.',
      },
      {
        sectionHeader: 'PROMOVE',
        text:
          'A involução uterina promove o retorno do útero ao seu tamanho normal.',
      },
    ],
  },
];

const BreastfeedingBenefits: React.FC = () => {
  const navigation = useNavigation();
  const onEnd = () => navigation.goBack();

  return (
    <InformationPages pages={pages} PageModel={createGenericInfoPage(onEnd)} />
  );
};

export default BreastfeedingBenefits;
