import { useRef } from 'react';
import { Dimensions, FlatList } from 'react-native';

import type { ImageWrapperSourcePropType } from 'components/ImageWrapper';
import type { FlatListProps } from 'react-native';

import { PageContainer } from './styles';

interface InfoPage {
  title?: string | JSX.Element;
  image?: ImageWrapperSourcePropType;
  content: {
    id: string;
    sectionHeader?: string | JSX.Element;
    text: string | JSX.Element;
  }[];
}

export interface InfoPageItem extends InfoPage {
  id: string;
}

export interface InfoPageModelProps extends InfoPage {
  flatListRef: React.RefObject<FlatList<InfoPageItem>>;
  index: number;
  pagesLength: number;
  goToPage: (page: number) => void;
}

interface InformationPagesProps
  extends Omit<FlatListProps<InfoPageItem>, 'renderItem' | 'data'> {
  PageModel: React.FC<InfoPageModelProps>;
  data: InfoPageItem[];
}

const InformationPages: React.FC<InformationPagesProps> = ({
  data: pages,
  PageModel,
  ...props
}) => {
  const { width } = Dimensions.get('window');
  const flatListRef = useRef<FlatList>(null);

  function goToPage(page: number): void {
    if (page >= pages.length || page < 0) {
      return;
    }
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: page,
    });
  }

  return (
    <FlatList
      data={pages}
      keyExtractor={item => item.id}
      keyboardShouldPersistTaps="handled"
      ref={flatListRef}
      renderItem={({ item, index }) => (
        <PageContainer width={width}>
          <PageModel
            content={item.content}
            flatListRef={flatListRef}
            goToPage={goToPage}
            image={item.image}
            index={index}
            pagesLength={pages.length}
            title={item.title}
          />
        </PageContainer>
      )}
      showsHorizontalScrollIndicator={false}
      horizontal
      nestedScrollEnabled
      pagingEnabled
      {...props}
    />
  );
};

export default InformationPages;
