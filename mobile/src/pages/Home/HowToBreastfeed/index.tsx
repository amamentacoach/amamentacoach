import React from 'react';

import { useNavigation } from '@react-navigation/native';

import ImageWrapper from '../../../components/ImageWrapper';
import InformationPages, {
  InfoModelProps,
  InfoPage,
} from '../../../components/InformationPages';
import ProgressDots from '../../../components/ProgressDots';

import {
  ContentText,
  ContentTitleText,
  ContentWrapper,
  ContinueButton,
  CurrentPageContainer,
  CurrentPageText,
  CurrentPageWrapper,
  Footer,
  LastPageButtonWrapper,
  TextContinueButton,
} from './styles';

import MilkWithdrawalEight from '../../../../assets/images/milk_withdrawal_eight.png';
import MilkWithdrawalFive from '../../../../assets/images/milk_withdrawal_five.png';
import MilkWithdrawalFour from '../../../../assets/images/milk_withdrawal_four.png';
import MilkWithdrawalNine from '../../../../assets/images/milk_withdrawal_nine.png';
import MilkWithdrawalOne from '../../../../assets/images/milk_withdrawal_one.png';
import MilkWithdrawalSeven from '../../../../assets/images/milk_withdrawal_seven.png';
import MilkWithdrawalSix from '../../../../assets/images/milk_withdrawal_six.png';
import MilkWithdrawalThree from '../../../../assets/images/milk_withdrawal_three.png';
import MilkWithdrawalTwo from '../../../../assets/images/milk_withdrawal_two.png';

const pages: InfoPage[] = [
  {
    id: 1,
    title: 'Como fazer a retirada do leite?',
    image: MilkWithdrawalOne,
    content: [
      {
        text: 'Prenda os cabelos e use uma touca de banho ou pano molhado.',
      },
    ],
  },
  {
    id: 2,
    title: 'Como fazer a retirada do leite?',
    image: MilkWithdrawalTwo,
    content: [
      {
        text: 'Escolha um lugar limpo e tranquilo.',
      },
    ],
  },
  {
    id: 3,
    title: 'Como fazer a retirada do leite?',
    image: MilkWithdrawalThree,
    content: [
      {
        text:
          'Massageie o peito com a ponta de dois dedos, iniciando na região mais próxima da aréola indo até a mais distante do peito, apoiando-o com a outra mão.',
      },
    ],
  },
  {
    id: 4,
    title: 'Como fazer a retirada do leite?',
    image: MilkWithdrawalFour,
    content: [
      {
        text: 'Massageie por mais tempo as áreas mais doloridas.',
      },
    ],
  },
  {
    id: 5,
    title: 'Como fazer a retirada do leite?',
    image: MilkWithdrawalFive,
    content: [
      {
        text:
          'Apoie a ponta dos dedos (polegar e indicador) acima e abaixo da aréola, apertando o peito contra o tórax.',
      },
    ],
  },
  {
    id: 6,
    title: 'Como fazer a retirada do leite?',
    image: MilkWithdrawalSix,
    content: [
      {
        text:
          'Aperte o peito com movimentos rítmicos como se tentasse aproximar as pontas dos dedos, sem deslizar na pele. ',
      },
    ],
  },
  {
    id: 7,
    title: 'Como fazer a retirada do leite?',
    image: MilkWithdrawalSeven,
    content: [
      {
        text: 'Jogue fora as primeiras gotas e guarde o restante no frasco.',
      },
    ],
  },
  {
    id: 8,
    title: 'Como fazer a retirada do leite?',
    image: MilkWithdrawalEight,
    content: [
      {
        text:
          'Se não tiver como guardar imediatamente na geladeira, o leite pode permanecer em local fresco e usado até seis horas após a coleta.',
      },
    ],
  },
  {
    id: 9,
    title: 'Como fazer a retirada do leite?',
    image: MilkWithdrawalNine,
    content: [
      {
        text:
          'Em geladeira, o leite ordenhado pode ser guardado com segurança por até 12 horas ou congelado por até 15 dias. Antes de alimentar o bebê com o leite guardado, aqueça-o em banho-maria.',
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
    image,
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
        {image && <ImageWrapper source={image} />}
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
