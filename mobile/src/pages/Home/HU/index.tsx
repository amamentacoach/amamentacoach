import React from 'react';

import { useNavigation } from '@react-navigation/native';

import OptionsList, { Options } from '../../../components/OptionList';

import { ScrollView, Header, BannerImage } from './styles';

import HUBanner from '../../../../assets/images/banner_hu.png';
import IcVideo from '../../../../assets/images/ic_video.svg';

const HU: React.FC = () => {
  const navigation = useNavigation();
  const options: Options[] = [
    {
      image: IcVideo,
      title: 'Vídeo AmamentaCoach',
      subtitle: 'Conheça o AmamentaCoach',
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['z9V26A0Lipg'] }),
    },
    {
      image: IcVideo,
      title: 'Video HU Londrina',
      subtitle: 'Conheça o HU',
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['CLOZL3N_QXs'] }),
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
