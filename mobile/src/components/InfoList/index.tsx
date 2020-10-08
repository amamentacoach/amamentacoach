import React, { useRef } from 'react';
import { FlatList, Dimensions } from 'react-native';

import {
  Header,
  SkipButton,
  ButtonText,
  ContentWrapper,
  ContentParagraph,
  Footer,
  LastPageButtonWrapper,
  ListContainer,
  PageContainer,
  CurrentPageWrapper,
  ContentImage,
} from './styles';

import ProgressDots from '../ProgressDots/index';

interface IInfoListProps {
  pages: {
    paragraph: string;
    image: any;
  }[];
  LastPageButton?: React.ReactElement;
  skipIntroduction?: (() => void) | null;
}

interface IInfoPageProps {
  index: number;
  paragraph: string;
  image: any;
}

const InfoList: React.FC<IInfoListProps> = ({
  pages,
  LastPageButton = null,
  skipIntroduction = null,
}) => {
  const { width } = Dimensions.get('window');

  const pageFlatListRef = useRef<FlatList>(null);

  function goToPage(page: number) {
    if (page >= pages.length) {
      return;
    }
    pageFlatListRef.current?.scrollToIndex({
      animated: true,
      index: page,
    });
  }

  function InfoPage({ index, paragraph, image }: IInfoPageProps) {
    return (
      <PageContainer width={width}>
        <Header>
          {skipIntroduction && index < pages.length - 1 ? (
            <SkipButton onPress={() => skipIntroduction()}>
              <ButtonText>Pular</ButtonText>
            </SkipButton>
          ) : null}
        </Header>
        <ContentWrapper>
          <ContentImage source={image} resizeMode="contain" />
          <ContentParagraph>{paragraph}</ContentParagraph>
        </ContentWrapper>
        <Footer>
          <CurrentPageWrapper>
            <ProgressDots
              navigateToPage={(page: number) => goToPage(page)}
              selectedIndex={index}
              length={pages.length}
            />
          </CurrentPageWrapper>
          <LastPageButtonWrapper>
            {index === pages.length - 1 ? LastPageButton : null}
          </LastPageButtonWrapper>
        </Footer>
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
            paragraph={item.paragraph}
            image={item.image}
          />
        )}
        keyExtractor={(item) => item.paragraph}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </ListContainer>
  );
};

export default InfoList;
