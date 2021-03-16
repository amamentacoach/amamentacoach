import React, { useRef } from 'react';
import { Dimensions, FlatList, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ProgressDots from '../../components/ProgressDots';

import {
  ContinueButton,
  TextContinueButton,
  ContentWrapper,
  ContentText,
  Footer,
  LastPageButtonWrapper,
  ListContainer,
  PageContainer,
  ScrollView,
  CurrentPageWrapper,
  ContentTitleText,
  ContentHeaderText,
} from './styles';

interface IInfoPageProps {
  index: number;
  image: any;
  title: string;
  topics: {
    header: string;
    text: string;
  }[];
}

const BreastfeedingBenefits: React.FC = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const pageFlatListRef = useRef<FlatList>(null);

  const pages = [
    {
      id: '1',
      image: require('../../../assets/images/info_mother_baby.png'),
      title: 'Benefícios da amamentação para a mãe e o bebê',
      topics: [
        {
          text:
            'A amamentação contribui para estabelecer um vínculo afetivo desde muito cedo.\nO leite materno é o mais completo alimento para o bebê e tem muitas outras vantagens.\nÉ desejável que seja feito o aleitamento materno exclusivo durante, pelo menos, os primeiros 6 meses de vida do bebê.',
        },
      ],
    },
    {
      id: '2',
      image: require('../../../assets/images/info_baby.png'),
      title: 'Benefícios da amamentação para o bebê',
      topics: [
        {
          header: 'SISTEMA IMUNOLÓGICO',
          text:
            'O leite materno ajuda a defender o organismo de várias doenças. O efeito das vacinas é melhor em crianças amamentadas. Diminui o risco de câncer infantil.',
        },
      ],
    },
    {
      id: '3',
      image: require('../../../assets/images/info_baby_tubes.png'),
      title: 'Benefícios da amamentação para o bebê',
      topics: [
        {
          header: 'BOCA',
          text: 'Favorece o desenvolvimento da face, da boca e da dentição.',
        },
        {
          header: 'INTELIGÊNCIA',
          text: 'Crianças amamentadas por mais de um ano tem QI maior.',
        },
      ],
    },
    {
      id: '4',
      image: require('../../../assets/images/info_father_baby.png'),
      title: 'Benefícios da amamentação para o bebê',
      topics: [
        {
          header: 'PROTEÇÃO',
          text:
            'Protege contra uma série de doenças, infecções e problemas como diarreia e prisão de ventre.',
        },
        {
          header: 'QUANDO ADULTOS...',
          text: 'Reduz o risco de ter problemas como diabetes e colesterol.',
        },
      ],
    },
    {
      id: '5',
      image: require('../../../assets/images/info_supermom.png'),
      title: 'Benefícios da amamentação para a mãe',
      topics: [
        {
          header: 'REDUZ O RISCO',
          text:
            'Pesquisas defendem que reduz o risco de câncer de mama, do ovário e de osteoporose.',
        },
      ],
    },
    {
      id: '6',
      image: require('../../../assets/images/info_nurse_baby.png'),
      title: 'Benefícios da amamentação para a mãe',
      topics: [
        {
          header: 'AJUDA',
          text: 'Recuperar o peso anterior à gravidez.',
        },
        {
          header: 'PREVINE',
          text: 'Hemorragias no pós-parto.',
        },
        {
          header: 'PROMOVE',
          text: 'A involução uterina.',
        },
      ],
    },
  ];

  function InfoPage({ index, title, image, topics }: IInfoPageProps) {
    return (
      <PageContainer width={width}>
        <ScrollView>
          <ContentTitleText>{title}</ContentTitleText>
          <ContentWrapper>
            <Image source={image} />
            {topics.map(({ header, text }) => (
              <View key={text}>
                <ContentHeaderText>{header}</ContentHeaderText>
                <ContentText>{text}</ContentText>
              </View>
            ))}
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
              <ContinueButton onPress={() => navigation.goBack()}>
                <TextContinueButton>Sair</TextContinueButton>
              </ContinueButton>
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
          <InfoPage
            index={index}
            title={item.title}
            image={item.image}
            topics={item.topics}
          />
        )}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </ListContainer>
  );
};

export default BreastfeedingBenefits;
