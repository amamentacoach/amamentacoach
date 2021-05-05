import React, { useRef } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { ListContainer, PageContainer, ScrollView } from './styles';

export interface InfoModelProps {
  flatListRef: React.RefObject<FlatList<any>>;
  index: number;
  pagesLength: number;
  title?: string;
  Image?: number | React.FC<SvgProps>;
  content: {
    sectionHeader?: string;
    text: string;
  }[];
  goToPage: (page: number) => void;
}

export interface InfoPage {
  id: number;
  title?: string;
  Image?: number | React.FC<SvgProps>;
  content: {
    sectionHeader?: string;
    text: string;
  }[];
}

interface InformationPagesProps {
  PageModel: React.FC<InfoModelProps>;
  pages: InfoPage[];
  scrollEnabled?: boolean;
}

const InformationPages: React.FC<InformationPagesProps> = ({
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
                Image={item.Image}
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
