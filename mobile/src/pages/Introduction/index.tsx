import React, { useRef } from 'react';
import { Dimensions, FlatList } from 'react-native';

import { useIsFirstRun } from '../../contexts/firstRun';
import MainButton from '../../components/MainButton';
import ProgressDots from '../../components/ProgressDots';

import {
  Header,
  SkipButton,
  SkipButtonText,
  ContentWrapper,
  ContentText,
  Footer,
  LastPageButtonWrapper,
  ListContainer,
  PageContainer,
  ContentImage,
  ScrollView,
  CurrentPageWrapper,
} from './styles';

interface IInfoPageProps {
  index: number;
  text: string;
  image: any;
}

const pages = [
  {
    text:
      'Bem vinda! O AmamentaCoach foi pensado para te auxiliar na desafiadora jornada de amamentar um bebê prematuro.',
    image: require('../../../assets/images/intro_mother.png'),
  },
  {
    text:
      'Você registrará seus avanços diários e terá acesso a conteúdos exclusivos para te instruir e te motivar!',
    image: require('../../../assets/images/intro_diary_diary.png'),
  },
  {
    text:
      'Quanto mais você usar o AmamentaCoach , mais recursos terá para amamentar seu bebê prematuro!',
    image: require('../../../assets/images/intro_chart.png'),
  },
  {
    text: 'Explore cada ícone e faça do App seu grande aliado! ',
    image: require('../../../assets/images/intro_mobile.png'),
  },
];

const Introduction: React.FC = () => {
  const { setNotFirstRun } = useIsFirstRun();
  const { width } = Dimensions.get('window');
  const pageFlatListRef = useRef<FlatList>(null);

  async function handleSkip() {
    await setNotFirstRun();
  }

  function goToPage(page: number) {
    if (page >= pages.length) {
      return;
    }
    pageFlatListRef.current?.scrollToIndex({
      animated: true,
      index: page,
    });
  }

  function InfoPage({ index, text, image }: IInfoPageProps) {
    return (
      <PageContainer width={width}>
        <ScrollView>
          <Header>
            <SkipButton onPress={handleSkip}>
              <SkipButtonText>Pular</SkipButtonText>
            </SkipButton>
          </Header>
          <ContentWrapper>
            <ContentImage source={image} />
            <ContentText>{text}</ContentText>
          </ContentWrapper>
          <Footer>
            <CurrentPageWrapper>
              <ProgressDots
                navigateToPage={(page: number) => goToPage(page)}
                selectedIndex={index}
                length={pages.length}
              />
            </CurrentPageWrapper>
            <LastPageButtonWrapper opacity={index === pages.length - 1 ? 1 : 0}>
              <MainButton
                buttonText="Vamos começar!"
                onPress={handleSkip}
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
        keyExtractor={(item) => item.text}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </ListContainer>
  );
};

export default Introduction;
