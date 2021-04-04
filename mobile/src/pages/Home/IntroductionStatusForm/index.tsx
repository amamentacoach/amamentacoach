import React, { useRef } from 'react';
import { Dimensions, FlatList, Image } from 'react-native';

import { useIsFirstRun } from '../../../contexts/firstRun';
import MainButton from '../../../components/MainButton';
import ProgressDots from '../../../components/ProgressDots';

import {
  Header,
  ContentWrapper,
  ContentText,
  Footer,
  LastPageButtonWrapper,
  ListContainer,
  PageContainer,
  ScrollView,
  CurrentPageWrapper,
  ImageContainer,
  LastPageBox,
  ColoredText,
  HeaderLastPageBox,
} from './styles';

interface IInfoPageProps {
  index: number;
  text: string;
  image: any;
}

const pages = [
  {
    text:
      'Como você se sente com relação à sua autoconfiança para amamentar?\n\nPara cada uma das afirmações a seguir, por favor, escolha a resposta que melhor descreve sua autoconfiança em amamentar seu bebê.',
    image: require('../../../../assets/images/icons/survey_primary.png'),
  },
  {
    text:
      'Por favor, marque sua resposta circulando o número que melhor descreve como você se sente. Não há respostas certas ou erradas.',
    image: require('../../../../assets/images/icons/survey_primary.png'),
  },
  {
    text: '',
    image: require('../../../../assets/images/icons/survey_primary.png'),
  },
];

const IntroductionStatusForm: React.FC = () => {
  const { setPersistentNotFirstRun } = useIsFirstRun();
  const { width } = Dimensions.get('window');
  const pageFlatListRef = useRef<FlatList>(null);

  async function handleEndIntroduction() {
    await setPersistentNotFirstRun('statusFormIntroduction');
  }

  function InfoPage({ index, text, image }: IInfoPageProps) {
    return (
      <PageContainer width={width}>
        <ScrollView>
          <Header>
            <ContentText>Autoconfiança para amamentar</ContentText>
          </Header>
          <ContentWrapper>
            <ImageContainer>
              <Image source={image} />
            </ImageContainer>
            {index === pages.length - 1 ? (
              <LastPageBox>
                <HeaderLastPageBox>Escala</HeaderLastPageBox>
                <ContentText>
                  <ColoredText>1</ColoredText> = nada confiante
                </ContentText>
                <ContentText>
                  <ColoredText>2</ColoredText> = muito pouco confiante
                </ContentText>
                <ContentText>
                  <ColoredText>3</ColoredText> = às vezes confiante
                </ContentText>
                <ContentText>
                  <ColoredText>4</ColoredText> = confiante
                </ContentText>
                <ContentText>
                  <ColoredText>5</ColoredText> = muito confiante
                </ContentText>
              </LastPageBox>
            ) : (
              <ContentText>{text}</ContentText>
            )}
          </ContentWrapper>
          <Footer>
            <CurrentPageWrapper>
              <ProgressDots
                flatlistRef={pageFlatListRef}
                selectedIndex={index}
                length={pages.length}
              />
            </CurrentPageWrapper>
            <LastPageButtonWrapper opacity={index === pages.length - 1 ? 1 : 0}>
              <MainButton
                text="Vamos começar!"
                onPress={handleEndIntroduction}
                disabled={index !== pages.length - 1}
              />
            </LastPageButtonWrapper>
          </Footer>
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
          <InfoPage index={index} text={item.text} image={item.image} />
        )}
        keyExtractor={item => item.text}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </ListContainer>
  );
};

export default IntroductionStatusForm;
