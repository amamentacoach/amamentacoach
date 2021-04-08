import React from 'react';

import { useNavigation } from '@react-navigation/native';
import MainButton from '../../../components/MainButton';
import SecondaryButton from '../../../components/SecondaryButton';
import InformationPages, {
  IInfoPageProps,
} from '../../../components/InformationPages';

import {
  ContentImage,
  HeaderBackground,
  ContentContainer,
  ContentText,
  ContentHeader,
  Footer,
  FirstButtonContainer,
  SecondButtonContainer,
} from './styles';

const pages = [
  {
    id: 1,
    header: 'Parto prematuro:\nNão era isso que eu esperava',
    image: require('../../../../assets/images/expectation_vc_reality.png'),
    content: [
      {
        text:
          'O nascimento prematuro é algo que sempre mexe com a estrutura da família. Em geral, a realidade não tem muito a ver com aquilo que foi sonhado durante a gravidez...',
      },
    ],
  },
  {
    id: 2,
    header: 'Parto prematuro:\nNão era isso que eu esperava',
    image: require('../../../../assets/images/sad.png'),
    content: [
      {
        text:
          'Não há nada de errado com você caso esteja sentindo uma mistura de medo, frustração, insegurança, ansiedade, estresse...',
      },
    ],
  },
  {
    id: 3,
    header: 'Parto prematuro:\nNão era isso que eu esperava',
    image: require('../../../../assets/images/mom_premature.png'),
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

  const InfoPage: React.FC<IInfoPageProps> = ({
    pagesLength,
    index,
    title,
    image,
    content,
    goToPage,
  }) => (
    <>
      <HeaderBackground />
      <ContentContainer>
        <ContentHeader>{title}</ContentHeader>
        <ContentImage source={image} />
        {content.map(({ text }) => (
          <ContentText key={text}>{text}</ContentText>
        ))}
        <Footer>
          {index > 0 && (
            <FirstButtonContainer>
              <SecondaryButton
                text="Voltar"
                onPress={() => goToPage(index - 1)}
              />
            </FirstButtonContainer>
          )}
          <SecondButtonContainer>
            {(index === pagesLength - 1 && (
              <MainButton text="Sair" onPress={() => navigation.goBack()} />
            )) || (
              <MainButton text="Próximo" onPress={() => goToPage(index + 1)} />
            )}
          </SecondButtonContainer>
        </Footer>
      </ContentContainer>
    </>
  );

  return (
    <InformationPages
      pages={pages}
      PageModel={InfoPage}
      scrollEnabled={false}
    />
  );
};

export default NotWhatIExpected;
