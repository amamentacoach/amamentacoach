import React from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  ScrollView,
  Header,
  HeaderText,
  HUButton,
  HUButtonText,
  ContentContainer,
  ContentHeader,
  ContentOption,
  HeaderBackground,
  BannerImage,
  ContentImage,
  ContentTitle,
  ContentSubtitle,
  ContentSeparator,
  Option,
  ContentTextContainer,
} from './styles';

import HUBanner from '../../../assets/images/banner_hu.png';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const options = [
    {
      image: require('../../../assets/images/home_baby.png'),
      title: 'Olá, sou o prematuro',
      subtitle: 'Subtítulo 1',
      onPress: () => {
        navigation.navigate('Premature');
      },
    },
    {
      image: require('../../../assets/images/home_breastfeed.png'),
      title: 'Passo a passo para amamentar o prematuro',
      subtitle: 'Subtítulo 2',
      onPress: () => {
        navigation.navigate('StepByStepPremature');
      },
    },
    {
      image: require('../../../assets/images/home_milk.png'),
      title: 'A retirada do leite',
      subtitle: 'Subtítulo 3',
      onPress: () => {
        navigation.navigate('HowToBreastfeed');
      },
    },
    {
      image: require('../../../assets/images/home_emotions.png'),
      title: 'Emoções e Amamentação ',
      subtitle: 'Subtítulo 4',
      onPress: () => {
        navigation.navigate('EmotionsAndBreastfeeding');
      },
    },
    {
      image: require('../../../assets/images/home_more_information.png'),
      title: 'Mais informações',
      subtitle: 'Subtítulo 5',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/home_message.png'),
      title: 'Depoimento das mamães',
      subtitle: 'Subtítulo 6',
      onPress: () => {},
    },
  ];

  return (
    <Container>
      <ScrollView>
        <Header>
          <HeaderBackground>
            <HeaderText>Início</HeaderText>
          </HeaderBackground>
          <BannerImage source={HUBanner}>
            <HUButton onPress={() => navigation.navigate('HU')}>
              <HUButtonText>Comece por aqui!</HUButtonText>
            </HUButton>
          </BannerImage>
        </Header>
        <ContentContainer>
          <ContentHeader>Conteúdo</ContentHeader>
          {options.map(({ image, title, subtitle, onPress }, index) => (
            <Option key={title}>
              <ContentOption activeOpacity={0.7} onPress={onPress}>
                <ContentImage source={image} />
                <ContentTextContainer>
                  <ContentTitle>{title}</ContentTitle>
                  <ContentSubtitle>{subtitle}</ContentSubtitle>
                </ContentTextContainer>
              </ContentOption>
              {index < options.length - 1 && <ContentSeparator />}
            </Option>
          ))}
        </ContentContainer>
      </ScrollView>
    </Container>
  );
};

export default Home;
