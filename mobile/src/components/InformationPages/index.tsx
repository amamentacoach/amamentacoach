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

export interface InfoPageModelProps extends InfoPage {
  flatListRef: React.RefObject<FlatList<any>>;
  index: number;
  pagesLength: number;
  goToPage: (page: number) => void;
}

export interface InfoPageItem extends InfoPage {
  id: string;
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
    <FlatList
      renderItem={({ item, index }) => (
        <PageContainer width={width}>
          <PageModel
            index={index}
            pagesLength={pages.length}
            title={item.title}
            content={item.content}
            image={item.image}
            flatListRef={flatListRef}
            goToPage={goToPage}
          />
        </PageContainer>
      )}
      ref={flatListRef}
      data={pages}
      keyExtractor={item => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled
      {...props}
    />
  );
};

export default InformationPages;
