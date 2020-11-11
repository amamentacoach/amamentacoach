import React from 'react';
import { useNavigation } from '@react-navigation/native';

import OptionsList from '../../components/OptionList';

import { ScrollView, Header, BannerImage } from './styles';

import HUBanner from '../../../assets/images/banner_hu.png';

const HU: React.FC = () => {
  const navigation = useNavigation();
  const options = [
    {
      image: require('../../../assets/images/ic_video.png'),
      title: 'Vídeo AmamentaCoach',
      subtitle: 'Conheça o AmamentaCoach',
      onPress: () => {
        navigation.navigate('VideoPage', { videos: ['OodQ5ZBcAT4'] });
      },
    },
    {
      image: require('../../../assets/images/ic_video.png'),
      title: 'Video HU Londrina',
      subtitle: 'Conheça o HU',
      onPress: () => {
        navigation.navigate('VideoPage', { videos: ['OodQ5ZBcAT4'] });
      },
    },
  ];

  return (
    <ScrollView>
      <Header>
        <BannerImage source={HUBanner} />
      </Header>
      <OptionsList label="Vídeos" options={options} displayArrows />
    </ScrollView>
  );
};

export default HU;
