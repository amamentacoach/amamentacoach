import { Action, AppScreen } from '@common/telemetria';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';

import OptionsList from 'components/OptionList';
import { PaddedScrollView } from 'lib/SharedStyles';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { OptionListEntry } from 'components/OptionList';
import type { RootStackProps } from 'routes/app';

import { Header, HeaderTitle } from './styles';

import IcVideo from '@assets/images/ic_video.svg';

const VideosMenu: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();

  let options: OptionListEntry[] = [
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
    {
      image: IcVideo,
      title: i18n.t('EmotionsAndBreastfeedingPage.2'),
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['C2hFGeJj48k'] }),
    },
    {
      image: IcVideo,
      title: i18n.t('ThePrematurePage.Option1'),
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['w2rbi3aW-rA'] }),
    },
    {
      image: IcVideo,
      title: i18n.t('HUPage.5'),
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['z9V26A0Lipg'] }),
    },
    {
      image: IcVideo,
      title: i18n.t('HUPage.7'),
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['CLOZL3N_QXs'] }),
    },
  ];

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.VideosMenu },
    });
  }, []);

  return (
    <PaddedScrollView>
      <Header>
        <HeaderTitle>{i18n.t('Video', { count: 2 })}</HeaderTitle>
      </Header>
      <OptionsList options={options} />
    </PaddedScrollView>
  );
};

export default VideosMenu;
