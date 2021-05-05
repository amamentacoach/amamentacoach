import React from 'react';
import { useNavigation } from '@react-navigation/native';

import OptionsList, { OptionList } from '../../../components/OptionList';

import { ScrollView, Text, Container } from './styles';

import Banner from '../../../../assets/images/banner_canguru.svg';
import IcVideo from '../../../../assets/images/ic_video.svg';

const BabySling: React.FC = () => {
  const navigation = useNavigation();

  const options: OptionList[] = [
    {
      Image: IcVideo,
      title: 'Video 1',
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['IhKyaqGX_MQ'] }),
    },
    {
      Image: IcVideo,
      title: 'Video 2',
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['rdTTyKGrq_s'] }),
    },
    {
      Image: IcVideo,
      title: 'Video 3',
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['wx1ofoCZw9w'] }),
    },
  ];

  return (
    <ScrollView>
      <Container>
        <Banner />
        <Text>
          Use e abuse do Canguru! Informe-se e inspire-se nos vídeos abaixo:
        </Text>
      </Container>
      <OptionsList options={options} displayArrows />
    </ScrollView>
  );
};

export default BabySling;
