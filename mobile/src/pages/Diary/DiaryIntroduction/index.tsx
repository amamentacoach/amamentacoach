import React, { useRef } from 'react';
import { Dimensions, FlatList, Image } from 'react-native';

import { useIsFirstRun } from '../../../contexts/firstRun';
import ProgressDots from '../../../components/ProgressDots';
import MainButton from '../../../components/MainButton';

import {
  ContinueButton,
  TextContinueButton,
  ContentWrapper,
  ContentText,
  Footer,
  FooterButtonWrapper,
  ListContainer,
  PageContainer,
  ScrollView,
  CurrentPageWrapper,
} from './styles';

interface IInfoPageProps {
  index: number;
  text: string;
  image: any;
}

const DiaryIntroduction: React.FC = () => {
  const { setNotFirstRun } = useIsFirstRun();
  const { width } = Dimensions.get('window');
  const pageFlatListRef = useRef<FlatList>(null);

  const pages = [
    {
      image: require('../../../../assets/images/intro_diary_diary.png'),
      text:
        'Esse é o seu DIÁRIO! Um espaço para registrar seus avanços e oferecer recursos que poderão te ajudar nessa jornada!',
    },
    {
      image: require('../../../../assets/images/intro_diary_calendar.png'),
      title: '1.  Procure a serenidade',
      text:
        'Será muito importante que você o acesse todos os dias e informe sobre você, o seu bebê e a produção de leite.',
    },
  ];

  async function handleEndDiaryIntroduction() {
    await setNotFirstRun('diary');
  }

  function InfoPage({ index, text, image }: IInfoPageProps) {
    return (
      <PageContainer width={width}>
        <ScrollView>
          <ContentWrapper>
            <Image source={image} />
            <ContentText>{text}</ContentText>
          </ContentWrapper>
          <Footer>
            <CurrentPageWrapper>
              <ProgressDots
                flatlistRef={pageFlatListRef}
                selectedIndex={index}
                length={pages.length}
              />
            </CurrentPageWrapper>
            <FooterButtonWrapper>
              {index === pages.length - 1 ? (
                <MainButton
                  onPress={handleEndDiaryIntroduction}
                  text="Vamos começar!"
                />
              ) : (
                <ContinueButton
                  activeOpacity={0.7}
                  onPress={handleEndDiaryIntroduction}>
                  <TextContinueButton>Pular</TextContinueButton>
                </ContinueButton>
              )}
            </FooterButtonWrapper>
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
        keyExtractor={item => item.text}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </ListContainer>
  );
};

export default DiaryIntroduction;
