import { Action, AppScreen } from '@common/telemetria';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';
import { View } from 'react-native';

import ImageWrapper from 'components/ImageWrapper';
import OptionsList from 'components/OptionList';
import PaddedScrollView from 'components/PaddedScrollView';
import { getBestLocale } from 'utils/localize';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { OptionListEntry } from 'components/OptionList';
import type { RootStackProps } from 'routes/app';

import { Container, Text } from './styles';

import Banner from '@assets/images/banner_canguru.webp';
import IcVideo from '@assets/images/ic_video.svg';

const BabySling: React.FC = () => {
  const { languageTag } = getBestLocale();
  const navigation = useNavigation<RootStackProps>();

  const options: OptionListEntry[] = [
    {
      image: { source: IcVideo },
      title: i18n.t('BabySlingPage.1'),
      onPress: () =>
        navigation.navigate('VideoPage', {
          videos:
            languageTag === 'pt'
              ? ['IhKyaqGX_MQ']
              : ['TpMlfCph8P4', 'VOjGhwMuWFU'],
        }),
    },
    {
      image: { source: IcVideo },
      title: i18n.t('BabySlingPage.2'),
      onPress: () =>
        navigation.navigate('VideoPage', {
          videos: languageTag === 'pt' ? ['rdTTyKGrq_s'] : ['svNB3yz2v8E'],
        }),
    },
    {
      image: { source: IcVideo },
      title: i18n.t('BabySlingPage.3'),
      onPress: () =>
        navigation.navigate('VideoPage', {
          videos: languageTag === 'pt' ? ['wx1ofoCZw9w'] : ['JGAoHkkrGnk'],
        }),
    },
  ];

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.BabySling },
    });
  }, []);

  return (
    <PaddedScrollView>
      <Container>
        <View>
          <ImageWrapper
            height={200}
            resizeMode="contain"
            source={Banner}
            width={200}
          />
        </View>
        <Text>{i18n.t('BabySlingPage.Header')}</Text>
      </Container>
      <OptionsList options={options} displayArrows />
    </PaddedScrollView>
  );
};

export default BabySling;
