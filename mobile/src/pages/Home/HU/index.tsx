import { Action, AppScreen } from '@common/Telemetria';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';

import OptionsList from 'components/OptionList';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { OptionListEntry } from 'components/OptionList';
import type { RootStackProps } from 'routes/app';

import { BannerImage, Header, ScrollView } from './styles';

import HUBanner from '@assets/images/banner_hu.png';
import IcVideo from '@assets/images/ic_video.svg';

const HU: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const options: OptionListEntry[] = [
    {
      image: IcVideo,
      title: i18n.t('HUPage.5'),
      subtitle: i18n.t('HUPage.6'),
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['z9V26A0Lipg'] }),
    },
    {
      image: IcVideo,
      title: i18n.t('HUPage.7'),
      subtitle: i18n.t('HUPage.8'),
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['CLOZL3N_QXs'] }),
    },
  ];

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.HU },
    });
  }, []);

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
