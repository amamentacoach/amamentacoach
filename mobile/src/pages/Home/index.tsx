import React from 'react';
import { useNavigation } from '@react-navigation/native';

import {
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
      onPress: () => navigation.navigate('Premature'),
    },
    {
      image: require('../../../assets/images/home_breastfeed.png'),
      title: 'Passo a passo para amamentar o prematuro',
      onPress: () => navigation.navigate('StepByStepPremature'),
    },
    {
      image: require('../../../assets/images/home_milk.png'),
      title: 'A retirada do leite',
      onPress: () => navigation.navigate('HowToBreastfeed'),
    },
    {
      image: require('../../../assets/images/home_emotions.png'),
      title: 'Emoções e Amamentação ',
      onPress: () => navigation.navigate('EmotionsAndBreastfeeding'),
    },
    {
      image: require('../../../assets/images/home_more_information.png'),
      title: 'Mais informações',
      onPress: () => navigation.navigate('AdditionalInformation'),
    },
    {
      image: require('../../../assets/images/home_message.png'),
      title: 'Depoimento das mamães',
      onPress: () => navigation.navigate('Messages'),
    },
    {
      image: require('../../../assets/images/home_message.png'),
      title: 'Perguntas',
      onPress: () => navigation.navigate('Questions'),
    },
  ];

  return (
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
        {options.map(({ image, title, onPress }, index) => (
          <Option key={title}>
            <ContentOption activeOpacity={0.7} onPress={onPress}>
              <ContentImage source={image} />
              <ContentTextContainer>
                <ContentTitle>{title}</ContentTitle>
              </ContentTextContainer>
            </ContentOption>
            {index < options.length - 1 && <ContentSeparator />}
          </Option>
        ))}
      </ContentContainer>
    </ScrollView>
  );
};

export default Home;
