import React, { useRef } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Dimensions, FlatList } from 'react-native';

import ImageWrapper, {
  ImageWrapperSourcePropType,
} from '../../../components/ImageWrapper';
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

import MilkWithdrawalSeven from '../../../../assets/images/milk_withdrawal_seven.png';
import WhyMilkWithdrawalTwo from '../../../../assets/images/why_milk_withdrawal_two.png';

interface Content {
  id: number;
  title: string;
  image: ImageWrapperSourcePropType;
  content: {
    idText: number;
    text: JSX.Element;
  }[];
}

interface PageProps extends Content {
  index: number;
}

const pages: Content[] = [
  {
    id: 1,
    title: 'Por que fazer a retirada do leite?',
    image: MilkWithdrawalSeven,
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
    image: WhyMilkWithdrawalTwo,
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
    image: WhyMilkWithdrawalTwo,
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

const WhyBreastfeed: React.FC = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const flatListRef = useRef<FlatList>(null);

  const InfoModel: React.FC<PageProps> = ({ index, title, image, content }) => (
    <>
      <ContentTitleText>{title}</ContentTitleText>
      <ContentWrapper>
        <ImageWrapper source={image} resizeMode="contain" />
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
              <InfoModel
                index={index}
                id={item.id}
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
