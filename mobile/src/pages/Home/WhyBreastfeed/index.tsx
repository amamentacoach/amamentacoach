import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { Dimensions, FlatList, Image } from 'react-native';

import ProgressDots from '../../../components/ProgressDots';

import {
  ContinueButton,
  TextContinueButton,
  ContentWrapper,
  Footer,
  LastPageButtonWrapper,
  CurrentPageWrapper,
  ContentTitleText,
  PageContainer,
  ScrollView,
  ListContainer,
  TextContainer,
  ContentText,
  ColoredContentText,
} from './styles';

const pages = [
  {
    id: 1,
    title: 'Por que fazer a retirada do leite?',
    image: require('../../../../assets/images/why_milk_withdrawal_one.png'),
    content: [
      {
        idText: 1,
        text: (
          <ContentText>
            Sabe aqueles inúmeros benefícios do leite materno pro bebê
            prematuro?
          </ContentText>
        ),
      },
      {
        idText: 2,
        text: (
          <ContentText>
            A retirada frequente do leite é o caminho para
            <ColoredContentText> evitar que o leite seque </ColoredContentText>
            enquanto o bebê não suga.
          </ContentText>
        ),
      },
    ],
  },
  {
    id: 2,
    title: 'Por que fazer a retirada do leite?',
    image: require('../../../../assets/images/why_milk_withdrawal_two.png'),
    content: [
      {
        idText: 1,
        text: (
          <ContentText>
            Leite parado na mama faz o corpo entender que não precisa produzir
            mais!
          </ContentText>
        ),
      },
    ],
  },
  {
    id: 3,
    title: 'Por que fazer a retirada do leite?',
    image: require('../../../../assets/images/why_milk_withdrawal_two.png'),
    content: [
      {
        idText: 1,
        text: (
          <ContentText>
            Então, ao contrário...
            <ColoredContentText>
              quanto mais você esvazia sua mama
            </ColoredContentText>
            , mais ela produz! Pois ela entende que o leite está sendo
            necessário!
          </ContentText>
        ),
      },
    ],
  },
];

interface PageProps {
  index: number;
  title: string;
  image: any;
  content: {
    idText: number;
    text: JSX.Element;
  }[];
}

const WhyBreastfeed: React.FC = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const flatListRef = useRef<FlatList>(null);

  const InfoPage: React.FC<PageProps> = ({ index, title, image, content }) => (
    <>
      <ContentTitleText>{title}</ContentTitleText>
      <ContentWrapper>
        <Image source={image} resizeMode="contain" />
        {content.map(({ idText, text }) => (
          <TextContainer key={idText}>{text}</TextContainer>
        ))}
      </ContentWrapper>
      <Footer>
        <CurrentPageWrapper>
          <ProgressDots
            flatlistRef={flatListRef}
            selectedIndex={index}
            length={pages.length}
          />
        </CurrentPageWrapper>
        <LastPageButtonWrapper opacity={index === pages.length - 1 ? 1 : 0}>
          <ContinueButton onPress={() => navigation.goBack()}>
            <TextContinueButton>Sair</TextContinueButton>
          </ContinueButton>
        </LastPageButtonWrapper>
      </Footer>
    </>
  );

  return (
    <ListContainer>
      <FlatList
        ref={flatListRef}
        data={pages}
        renderItem={({ item, index }) => (
          <PageContainer width={width}>
            <ScrollView>
              <InfoPage
                index={index}
                title={item.title}
                content={item.content}
                image={item.image}
              />
            </ScrollView>
          </PageContainer>
        )}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </ListContainer>
  );
};

export default WhyBreastfeed;
