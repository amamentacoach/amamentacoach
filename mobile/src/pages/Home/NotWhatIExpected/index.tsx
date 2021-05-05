import React from 'react';
import { useNavigation } from '@react-navigation/native';

import theme from '../../../config/theme';
import MainButton from '../../../components/MainButton';
import SecondaryButton from '../../../components/SecondaryButton';
import InformationPages, {
  InfoModelProps,
  InfoPage,
} from '../../../components/InformationPages';

import ExpectationVsReality1 from '../../../../assets/images/expectation_vs_reality_1.svg';
import ExpectationVsReality2 from '../../../../assets/images/expectation_vs_reality_2.svg';
import ExpectationVsReality3 from '../../../../assets/images/expectation_vs_reality_3.svg';

import {
  HeaderBackground,
  ContentContainer,
  ContentText,
  ContentHeader,
  Footer,
  FirstButtonContainer,
  SecondButtonContainer,
} from './styles';

const pages: InfoPage[] = [
  {
    id: 1,
    title: 'Parto prematuro:\nNão era isso que eu esperava',
    Image: ExpectationVsReality1,
    content: [
      {
        text:
          'O nascimento prematuro é algo que sempre mexe com a estrutura da família. Em geral, a realidade não tem muito a ver com aquilo que foi sonhado durante a gravidez...',
      },
    ],
  },
  {
    id: 2,
    title: 'Parto prematuro:\nNão era isso que eu esperava',
    Image: ExpectationVsReality2,
    content: [
      {
        text:
          'Não há nada de errado com você caso esteja sentindo uma mistura de medo, frustração, insegurança, ansiedade, estresse...',
      },
    ],
  },
  {
    id: 3,
    title: 'Parto prematuro:\nNão era isso que eu esperava',
    Image: ExpectationVsReality3,
    content: [
      {
        text:
          'Tenha paciência com você mesma! Respire fundo... escolha alguém para se abrir e falar sobre como você está se sentindo... e então, tome posse do seu bebê do jeitinho que ele é. Decida abraçar essa nova situação!',
      },
    ],
  },
];

const NotWhatIExpected: React.FC = () => {
  const navigation = useNavigation();

  const InfoModel: React.FC<InfoModelProps> = ({
    pagesLength,
    index,
    title,
    Image,
    content,
    goToPage,
  }) => (
    <>
      <HeaderBackground />
      <ContentContainer>
        <ContentHeader>{title}</ContentHeader>
        {Image && typeof Image !== 'number' && <Image />}
        {content.map(({ text }) => (
          <ContentText key={text}>{text}</ContentText>
        ))}
        <Footer>
          {index > 0 && (
            <FirstButtonContainer>
              <SecondaryButton
                color={theme.black}
                text="Voltar"
                onPress={() => goToPage(index - 1)}
              />
            </FirstButtonContainer>
          )}
          <SecondButtonContainer>
            <MainButton
              color={theme.babyGreen}
              text={index === pagesLength - 1 ? 'Sair' : 'Próximo'}
              onPress={() =>
                index === pagesLength - 1
                  ? navigation.goBack()
                  : goToPage(index + 1)
              }
            />
          </SecondButtonContainer>
        </Footer>
      </ContentContainer>
    </>
  );

  return (
    <InformationPages
      pages={pages}
      PageModel={InfoModel}
      scrollEnabled={false}
    />
  );
};

export default NotWhatIExpected;
