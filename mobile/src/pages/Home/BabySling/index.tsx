import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import ImageWrapper from '../../../components/ImageWrapper';
import OptionsList, { Options } from '../../../components/OptionList';

import { Container, ScrollView, Text } from './styles';

import Banner from '../../../../assets/images/banner_canguru.png';
import IcVideo from '../../../../assets/images/ic_video.svg';

const BabySling: React.FC = () => {
  const navigation = useNavigation();

  const options: Options[] = [
    {
      image: IcVideo,
      title: 'Video 1',
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['IhKyaqGX_MQ'] }),
    },
    {
      image: IcVideo,
      title: 'Video 2',
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['rdTTyKGrq_s'] }),
    },
    {
      image: IcVideo,
      title: 'Video 3',
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['wx1ofoCZw9w'] }),
    },
  ];

  return (
    <ScrollView>
      <Container>
        <View>
          <ImageWrapper
            source={Banner}
            resizeMode="contain"
            width={200}
            height={200}
          />
        </View>
        <Text>
          Use e abuse do Canguru! Informe-se e inspire-se nos vídeos abaixo:
        </Text>
      </Container>
      <OptionsList options={options} displayArrows />
    </ScrollView>
  );
};

export default BabySling;
