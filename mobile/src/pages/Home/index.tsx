import React from 'react';

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
  const options = [
    {
      image: require('../../../assets/images/home_baby.png'),
      title: 'Olá, sou o prematuro',
      subtitle: 'Subtítulo 1',
    },
    {
      image: require('../../../assets/images/home_breastfeed.png'),
      title: 'Passo a passo para amamentar o prematuro',
      subtitle: 'Subtítulo 2',
    },
    {
      image: require('../../../assets/images/home_milk.png'),
      title: 'A retirada do leite',
      subtitle: 'Subtítulo 3',
    },
    {
      image: require('../../../assets/images/home_emotions.png'),
      title: 'Emoções e Amamentação ',
      subtitle: 'Subtítulo 4',
    },
    {
      image: require('../../../assets/images/home_more_information.png'),
      title: 'Mais informações',
      subtitle: 'Subtítulo 5',
    },
    {
      image: require('../../../assets/images/home_message.png'),
      title: 'Depoimento das mamães',
      subtitle: 'Subtítulo 6',
    },
  ];

  return (
    <Container>
      <ScrollView>
        <Header>
          <HeaderBackground>
            <HeaderText>Início</HeaderText>
            <BannerImage source={HUBanner} />
            <HUButton>
              <HUButtonText>Comece por aqui!</HUButtonText>
            </HUButton>
          </HeaderBackground>
        </Header>
        <ContentContainer>
          <ContentHeader>Conteúdo</ContentHeader>
          {options.map(({ image, title, subtitle }) => (
            <Option key={title}>
              <ContentOption>
                <ContentImage source={image} resizeMode="contain" />
                <ContentTextContainer>
                  <ContentTitle>{title}</ContentTitle>
                  <ContentSubtitle>{subtitle}</ContentSubtitle>
                </ContentTextContainer>
              </ContentOption>
              <ContentSeparator />
            </Option>
          ))}
        </ContentContainer>
      </ScrollView>
    </Container>
  );
};

export default Home;
