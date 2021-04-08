import React, { useRef } from 'react';
import { Dimensions, FlatList } from 'react-native';

import { ListContainer, PageContainer, ScrollView } from './styles';

export interface IInfoPageProps {
  flatListRef: React.RefObject<FlatList<any>>;
  index: number;
  pagesLength: number;
  title?: string;
  image?: any;
  content: {
    sectionHeader?: string;
    text: string;
  }[];
  goToPage: (page: number) => void;
}

interface IInformationPagesProps {
  PageModel: React.FC<IInfoPageProps>;
  pages: {
    id: number;
    title?: string;
    image?: any;
    content: {
      sectionHeader?: string;
      text: string;
    }[];
  }[];
  scrollEnabled?: boolean;
}

const InformationPages: React.FC<IInformationPagesProps> = ({
  pages,
  PageModel,
  scrollEnabled,
}) => {
  const { width } = Dimensions.get('window');
  const flatListRef = useRef<FlatList>(null);

  function goToPage(page: number) {
    if (page >= pages.length || page < 0) {
      return;
    }
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: page,
    });
  }

  return (
    <ListContainer>
      <FlatList
        ref={flatListRef}
        data={pages}
        renderItem={({ item, index }) => (
          <PageContainer width={width}>
            <ScrollView>
              <PageModel
                index={index}
                pagesLength={pages.length}
                title={item.title}
                content={item.content}
                image={item.image}
                flatListRef={flatListRef}
                goToPage={goToPage}
              />
            </ScrollView>
          </PageContainer>
        )}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
      />
    </ListContainer>
  );
};

export default InformationPages;
