import { Action, AppScreen } from '@common/telemetria';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';
import { View } from 'react-native';

import ImageWrapper from 'components/ImageWrapper';
import OptionsList from 'components/OptionList';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { OptionListEntry } from 'components/OptionList';
import type { RootStackProps } from 'routes/app';

import { Container, ScrollView, Text } from './styles';

import Banner from '@assets/images/banner_canguru.png';
import IcVideo from '@assets/images/ic_video.svg';

const BabySling: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();

  const options: OptionListEntry[] = [
    {
      image: IcVideo,
      title: i18n.t('BabySlingPage.1'),
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['IhKyaqGX_MQ'] }),
    },
    {
      image: IcVideo,
      title: i18n.t('BabySlingPage.2'),
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['rdTTyKGrq_s'] }),
    },
    {
      image: IcVideo,
      title: i18n.t('BabySlingPage.3'),
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['wx1ofoCZw9w'] }),
    },
  ];

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.BabySling },
    });
  }, []);

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
        <Text>{i18n.t('BabySlingPage.Header')}</Text>
      </Container>
      <OptionsList options={options} displayArrows />
    </ScrollView>
  );
};

export default BabySling;
