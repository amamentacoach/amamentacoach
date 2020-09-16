import React, { useRef } from 'react';
import { SafeAreaView, FlatList, Dimensions, Image } from 'react-native';

import {
  Container,
  Header,
  SkipButton,
  ButtonText,
  ContentWrapper,
  ContentParagraph,
  Footer,
} from './styles';

import ProgressDots from '../ProgressDots/index';

import placeholderImage from '../../../assets/images/placeholder.png';

interface InfoPage {
  index: number;
  paragraph: string;
}

interface PageListProps {
  pages: {
    paragraph: string;
  }[];
}

const InfoList: React.FC<PageListProps> = ({ pages }) => {
  const { width, height } = Dimensions.get('window');

  const pageFlatList = useRef<FlatList>(null);

  function goToPage(page: number) {
    if (page >= pages.length) {
      return;
    }
    pageFlatList.current?.scrollToIndex({
      animated: true,
      index: page,
    });
  }

  function InfoPage({ index, paragraph }: InfoPage) {
    return (
      <Container height={height} width={width}>
        <Header>
          {index < pages.length - 1 ? (
            <SkipButton onPress={() => goToPage(pages.length - 1)}>
              <ButtonText>Pular</ButtonText>
            </SkipButton>
          ) : null}
        </Header>
        <ContentWrapper>
          <Image source={placeholderImage} />
          <ContentParagraph>{paragraph}</ContentParagraph>
        </ContentWrapper>
        <Footer>
          <ProgressDots
            navigateToPage={(page: number) => goToPage(page)}
            selectedIndex={index}
            length={pages.length}
          />
        </Footer>
      </Container>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        ref={pageFlatList}
        data={pages}
        renderItem={({ item, index }) => (
          <InfoPage index={index} paragraph={item.paragraph} />
        )}
        keyExtractor={(item) => item.paragraph}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default InfoList;
