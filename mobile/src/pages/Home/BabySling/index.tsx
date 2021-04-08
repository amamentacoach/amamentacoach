import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Image } from 'react-native';
import OptionsList from '../../../components/OptionList';

import { ScrollView, Text, Container } from './styles';

import Banner from '../../../../assets/images/banner_canguru.png';

const BabySling: React.FC = () => {
  const navigation = useNavigation();

  const options = [
    {
      image: require('../../../../assets/images/ic_video.png'),
      title: 'Video 1',
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['IhKyaqGX_MQ'] }),
    },
    {
      image: require('../../../../assets/images/ic_video.png'),
      title: 'Video 2',
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['rdTTyKGrq_s'] }),
    },
    {
      image: require('../../../../assets/images/ic_video.png'),
      title: 'Video 3',
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['wx1ofoCZw9w'] }),
    },
  ];

  return (
    <ScrollView>
      <Container>
        <Image source={Banner} resizeMode="contain" />
        <Text>
          Use e abuse do Canguru! Informe-se e inspire-se nos vídeos abaixo:
        </Text>
      </Container>
      <OptionsList options={options} displayArrows />
    </ScrollView>
  );
};

export default BabySling;
