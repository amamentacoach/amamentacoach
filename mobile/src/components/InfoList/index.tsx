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

import placeholderImage from '../../../assets/images/placeholder.png';

interface InfoListProps {
  pages: {
    paragraph: string;
  }[];
  lastPageButton?: React.ReactElement;
}

interface PageArguments {
  index: number;
  paragraph: string;
  ContinueButton: React.ReactElement | null;
}

const InfoList: React.FC<InfoListProps> = ({
  pages,
  lastPageButton = null,
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

  function InfoPage({
    index,
    paragraph,
    ContinueButton = null,
  }: PageArguments) {
    return (
      <PageContainer width={width}>
        <Header>
          {index < pages.length - 1 ? (
            <SkipButton onPress={() => goToPage(pages.length - 1)}>
              <ButtonText>Pular</ButtonText>
            </SkipButton>
          ) : null}
        </Header>
        <ContentWrapper>
          <ContentImage source={placeholderImage} resizeMode="contain" />
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
            {index === pages.length - 1 ? ContinueButton : null}
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
            ContinueButton={lastPageButton}
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
