import React from 'react';
import { Image as ReactImage } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ProgressDots from '../../../components/ProgressDots';
import InformationPages, {
  InfoModelProps,
  InfoPage,
} from '../../../components/InformationPages';

import {
  ContentWrapper,
  ContentText,
  Footer,
  CurrentPageWrapper,
  ContentTitleText,
  CurrentPageContainer,
  CurrentPageText,
  ContinueButton,
  TextContinueButton,
  LastPageButtonWrapper,
} from './styles';

import MilkWithdrawalOne from '../../../../assets/images/milk_withdrawal_one.png';
import MilkWithdrawalTwo from '../../../../assets/images/milk_withdrawal_two.png';
import MilkWithdrawalThree from '../../../../assets/images/milk_withdrawal_three.png';
import MilkWithdrawalFour from '../../../../assets/images/milk_withdrawal_four.png';
import MilkWithdrawalFive from '../../../../assets/images/milk_withdrawal_five.png';
import MilkWithdrawalSix from '../../../../assets/images/milk_withdrawal_six.png';
import MilkWithdrawalSeven from '../../../../assets/images/milk_withdrawal_seven.png';
import MilkWithdrawalEight from '../../../../assets/images/milk_withdrawal_eight.png';
import MilkWithdrawalNine from '../../../../assets/images/milk_withdrawal_nine.png';

const pages: InfoPage[] = [
  {
    id: 1,
    title: 'Como fazer a retirada do leite?',
    Image: MilkWithdrawalOne,
    content: [
      {
        text: 'Prenda os cabelos e use uma touca de banho ou pano molhado.',
      },
    ],
  },
  {
    id: 2,
    title: 'Como fazer a retirada do leite?',
    Image: MilkWithdrawalTwo,
    content: [
      {
        text: 'Escolha um lugar limpo e tranquilo.',
      },
    ],
  },
  {
    id: 3,
    title: 'Como fazer a retirada do leite?',
    Image: MilkWithdrawalThree,
    content: [
      {
        text: 'Massageie o peito com a ponta de dois dedos, iniciando na região mais próxima da aréola indo até a mais distante do peito, apoiando-o com a outra mão.',
      },
    ],
  },
  {
    id: 4,
    title: 'Como fazer a retirada do leite?',
    Image: MilkWithdrawalFour,
    content: [
      {
        text: 'Massageie por mais tempo as áreas mais doloridas.',
      },
    ],
  },
  {
    id: 5,
    title: 'Como fazer a retirada do leite?',
    Image: MilkWithdrawalFive,
    content: [
      {
        text: 'Apoie a ponta dos dedos (polegar e indicador) acima e abaixo da aréola, apertando o peito contra o tórax.',
      },
    ],
  },
  {
    id: 6,
    title: 'Como fazer a retirada do leite?',
    Image: MilkWithdrawalSix,
    content: [
      {
        text: 'Aperte o peito com movimentos rítmicos como se tentasse aproximar as pontas dos dedos, sem deslizar na pele. ',
      },
    ],
  },
  {
    id: 7,
    title: 'Como fazer a retirada do leite?',
    Image: MilkWithdrawalSeven,
    content: [
      {
        text: 'Jogue fora as primeiras gotas e guarde o restante no frasco.',
      },
    ],
  },
  {
    id: 8,
    title: 'Como fazer a retirada do leite?',
    Image: MilkWithdrawalEight,
    content: [
      {
        text: 'Se não tiver como guardar imediatamente na geladeira, o leite pode permanecer em local fresco e usado até seis horas após a coleta.',
      },
    ],
  },
  {
    id: 9,
    title: 'Como fazer a retirada do leite?',
    Image: MilkWithdrawalNine,
    content: [
      {
        text: 'Em geladeira, o leite ordenhado pode ser guardado com segurança por até 24 horas ou congelado por até 30 dias. Antes de alimentar o bebê com o leite guardado, aqueça-o em banho-maria.',
      },
    ],
  },
];

const HowToBreastfeed: React.FC = () => {
  const navigation = useNavigation();
  const onEnd = () => navigation.goBack();

  const InfoModel: React.FC<InfoModelProps> = ({
    flatListRef,
    pagesLength,
    index,
    title,
    Image,
    content,
  }) => (
    <>
      <ContentTitleText>{title}</ContentTitleText>
      <CurrentPageContainer>
        <CurrentPageText>
          {index + 1}/{pagesLength}
        </CurrentPageText>
      </CurrentPageContainer>
      <ContentWrapper>
        {Image &&
          (typeof Image === 'number' ? (
            <ReactImage source={Image} />
          ) : (
            <Image />
          ))}
        {content.map(({ text }) => (
          <ContentText key={text}>{text}</ContentText>
        ))}
      </ContentWrapper>
      <Footer>
        <CurrentPageWrapper>
          <ProgressDots
            flatlistRef={flatListRef}
            selectedIndex={index}
            length={pagesLength}
          />
        </CurrentPageWrapper>
        <LastPageButtonWrapper opacity={index === pagesLength - 1 ? 1 : 0}>
          <ContinueButton onPress={() => onEnd()}>
            <TextContinueButton>Sair</TextContinueButton>
          </ContinueButton>
        </LastPageButtonWrapper>
      </Footer>
    </>
  );

  return <InformationPages pages={pages} PageModel={InfoModel} />;
};

export default HowToBreastfeed;
