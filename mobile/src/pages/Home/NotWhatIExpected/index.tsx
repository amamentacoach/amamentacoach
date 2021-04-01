import React, { useRef } from 'react';
import { Dimensions, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import MainButton from '../../../components/MainButton';

import {
  PageContainer,
  ListContainer,
  ScrollView,
  ContentImage,
  HeaderBackground,
  ContentContainer,
  ContentText,
  ContentHeader,
  Footer,
  FirstButtonContainer,
  SecondButtonContainer,
} from './styles';
import SecondaryButton from '../../../components/SecondaryButton';

interface IInfoPageProps {
  index: number;
  header: string;
  text: string;
  image: any;
}

const pages = [
  {
    header: 'Parto prematuro:\nNão era isso que eu esperava',
    text:
      'O nascimento prematuro é algo que sempre mexe com a estrutura da família. Em geral, a realidade não tem muito a ver com aquilo que foi sonhado durante a gravidez...',
    image: require('../../../../assets/images/expectation_vc_reality.png'),
  },
  {
    header: 'Parto prematuro:\nNão era isso que eu esperava',
    text:
      'Não há nada de errado com você caso esteja sentindo uma mistura de medo, frustração, insegurança, ansiedade, estresse...',
    image: require('../../../../assets/images/sad.png'),
  },
  {
    header: 'Parto prematuro:\nNão era isso que eu esperava',
    text:
      'Tenha paciência com você mesma! Respire fundo... escolha alguém para se abrir e falar sobre como você está se sentindo... e então, tome posse do seu bebê do jeitinho que ele é. Decida abraçar essa nova situação!',
    image: require('../../../../assets/images/mom_premature.png'),
  },
];

const NotWhatIExpected: React.FC = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const pageFlatListRef = useRef<FlatList>(null);

  function goToPage(page: number) {
    if (page >= pages.length || page < 0) {
      return;
    }
    pageFlatListRef.current?.scrollToIndex({
      animated: true,
      index: page,
    });
  }

  function InfoPage({ index, header, text, image }: IInfoPageProps) {
    return (
      <PageContainer width={width}>
        <ScrollView>
          <HeaderBackground />
          <ContentContainer>
            <ContentHeader>{header}</ContentHeader>
            <ContentImage source={image} />
            <ContentText>{text}</ContentText>
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
                {(index === pages.length - 1 && (
                  <MainButton text="Sair" onPress={() => navigation.goBack()} />
                )) || (
                  <MainButton
                    text="Próximo"
                    onPress={() => goToPage(index + 1)}
                  />
                )}
              </SecondButtonContainer>
            </Footer>
          </ContentContainer>
        </ScrollView>
      </PageContainer>
    );
  }

  return (
    <ListContainer>
      <FlatList
        ref={pageFlatListRef}
        data={pages}
        renderItem={({ item, index }) => (
          <InfoPage
            index={index}
            header={item.header}
            text={item.text}
            image={item.image}
          />
        )}
        keyExtractor={item => item.text}
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      />
    </ListContainer>
  );
};

export default NotWhatIExpected;
