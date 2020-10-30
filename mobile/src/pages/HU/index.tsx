import React from 'react';

import OptionsList from '../../components/OptionList';

import { Container, ScrollView, Header, BannerImage } from './styles';

import HUBanner from '../../../assets/images/banner_hu.png';

const HU: React.FC = () => {
  const options = [
    {
      image: require('../../../assets/images/ic_video.png'),
      title: 'Vídeo AmamentaCoach',
      subtitle: 'Conheça o AmamentaCoach',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/ic_video.png'),
      title: 'Video HU Londrina',
      subtitle: 'Conheça o HU',
      onPress: () => {},
    },
  ];

  return (
    <Container>
      <ScrollView>
        <Header>
          <BannerImage source={HUBanner} />
        </Header>
        <OptionsList label="Vídeos" options={options} displayArrows />
      </ScrollView>
    </Container>
  );
};

export default HU;
