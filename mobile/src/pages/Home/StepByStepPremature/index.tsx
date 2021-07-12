import React from 'react';
import { Dimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import theme from '../../../config/theme';
import InformationPages, {
  InfoModelProps,
  InfoPage,
} from '../../../components/InformationPages';
import ProgressDots from '../../../components/ProgressDots';

import {
  Foreground,
  ContentHeaderText,
  ContentText,
  ContentTitleText,
  ContentWrapper,
  ContinueButton,
  CurrentPageWrapper,
  Footer,
  Background,
  LastPageButtonWrapper,
  TextContinueButton,
} from './styles';

import BreastFeedPremature1 from '../../../../assets/images/breastfeed_premature_1.svg';
import BreastFeedPremature2 from '../../../../assets/images/breastfeed_premature_2.svg';
import BreastFeedPremature3 from '../../../../assets/images/breastfeed_premature_3.svg';
import BreastFeedPremature4 from '../../../../assets/images/breastfeed_premature_4.svg';
import BreastFeedPremature5 from '../../../../assets/images/breastfeed_premature_5.svg';
import BreastFeedPremature6 from '../../../../assets/images/breastfeed_premature_6.svg';

const pages: InfoPage[] = [
  {
    id: 1,
    title: '6 passos para amamentação do bebê prematuro',
    content: [
      {
        text: 'Com o nascimento prematuro, é comum que o bebê não consiga pegar o peito logo ao nascer e que ele precise ficar internado para receber alguns cuidados.\n\nApesar dos desafios, saiba que amamentar o bebê prematuro é possível, e que vale cada esforço!\n\n Os passos a seguir resumem a jornada rumo ao sucesso na amamentação do prematuro',
      },
    ],
  },
  {
    id: 2,
    Image: BreastFeedPremature1,
    title: '1.  Procure a serenidade',
    content: [
      {
        text: 'Parto prematuro: expectativas frustradas, incertezas, medo... quem espera que seu bebê nasça antes da hora?\nRecupere-se do susto, respire fundo, deixe a nova realidade se encaixar na sua cabeça e no seu coração, e então, abrace\u2011a!',
      },
    ],
  },
  {
    id: 3,
    title: '2. Estimule a produção láctea',
    Image: BreastFeedPremature2,
    content: [
      {
        text: 'Enquanto o bebê não puder pegar o peito, ou enquanto ele não mamar o suficiente, você vai precisar substituí-lo na tarefa de manter suas mamas produzindo leite. Para isso, precisa retirar o leite no mínimo a cada 3 horas.',
      },
    ],
  },
  {
    id: 4,
    title: '3. Estreite o vínculo',
    Image: BreastFeedPremature3,
    content: [
      {
        text: 'Permaneça o maior tempo possível na Unidade Neonatal, faça muito canguru, observe seu bebê, toque nele, fale com ele, cante pra ele...tudo isso também vai estimular seu corpo a produzir mais leite.',
      },
    ],
  },
  {
    id: 5,
    title: '4. Seja a protagonista',
    Image: BreastFeedPremature4,
    content: [
      {
        text: 'Cuide do seu bebê: faça a limpeza dos olhinhos e da boquinha, troque fraldas, dê banho; observe o jeitinho dele(a) e aprenda sobre seus costumes e preferências. Só você pode fazer seu papel de mãe!',
      },
    ],
  },
  {
    id: 6,
    title: '5. Invista em uma rede de apoio',
    Image: BreastFeedPremature5,
    content: [
      {
        text: 'Procure apoio nos profissionais do serviço (enfermeiros, técnicos, médicos, psicólogos, assistentes sociais...) e em pessoas de sua confiança que te façam bem. Lembre-se: você não está sozinha!',
      },
    ],
  },
  {
    id: 7,
    title: '6. Mantenha a paciência',
    Image: BreastFeedPremature6,
    content: [
      {
        text: 'Quando seu bebê começar a mamar, não se esqueça de que por ser prematuro, ele pode ser mais sonolento, mais “molinho”, e poderá precisar de mais tempo até conseguir dar conta do recado. ',
      },
    ],
  },
];

const StepByStepPremature: React.FC = () => {
  const navigation = useNavigation();
  const { height } = Dimensions.get('screen');
  const colors = [
    { foreground: '#fff', background: '#fff' },
    { foreground: '#F5E9EC', background: theme.babyPink },
    { foreground: '#F3EFFC', background: theme.babyPurple },
    { foreground: '#E5EEF1', background: theme.babyBlue },
    { foreground: '#E9EEEB', background: theme.babyGreen },
    { foreground: '#F5E9EC', background: theme.babyPink },
    { foreground: '#F3EFFC', background: theme.babyPurple },
  ];

  const InfoModel: React.FC<InfoModelProps> = ({
    index,
    pagesLength,
    title,
    content,
    Image,
    flatListRef,
  }) => (
    <Background color={colors[index].background}>
      {index === 0 && <ContentTitleText>{title}</ContentTitleText>}

      {index !== 0 && (
        <Foreground color={colors[index].foreground} height={height} />
      )}
      <ContentWrapper index={index}>
        {Image && typeof Image !== 'number' && <Image height={300} />}
        {index !== 0 && <ContentTitleText>{title}</ContentTitleText>}
        {content.map(({ sectionHeader, text }) => (
          <View key={text}>
            {sectionHeader && (
              <ContentHeaderText>{sectionHeader}</ContentHeaderText>
            )}
            <ContentText>{text}</ContentText>
          </View>
        ))}
      </ContentWrapper>

      <Footer index={index}>
        <CurrentPageWrapper>
          <ProgressDots
            flatlistRef={flatListRef}
            selectedIndex={index}
            length={pagesLength}
          />
        </CurrentPageWrapper>
        <LastPageButtonWrapper opacity={index === pagesLength - 1 ? 1 : 0}>
          <ContinueButton onPress={() => navigation.goBack()}>
            <TextContinueButton>Sair</TextContinueButton>
          </ContinueButton>
        </LastPageButtonWrapper>
      </Footer>
    </Background>
  );

  return <InformationPages pages={pages} PageModel={InfoModel} />;
};

export default StepByStepPremature;
