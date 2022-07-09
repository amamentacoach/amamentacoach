import { Action, AppScreen } from '@common/telemetria';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';

import OptionsList from 'components/OptionList';
import PaddedScrollView from 'components/PaddedScrollView';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { OptionListEntry } from 'components/OptionList';
import type { RootStackProps } from 'routes/app';

import { BannerImage, Header } from './styles';

import HUBanner from '@assets/images/banner_hu.webp';
import IcVideo from '@assets/images/ic_video.svg';

const HU: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const options: OptionListEntry[] = [
    {
      image: { source: IcVideo },
      title: i18n.t('HUPage.5'),
      subtitle: i18n.t('HUPage.6'),
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['-B6OZnuG8gw'] }),
    },
  ];

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.HU },
    });
  }, []);

  return (
    <PaddedScrollView>
      <Header>
        <BannerImage source={HUBanner} />
      </Header>
      <OptionsList label="Vídeos" options={options} displayArrows />
    </PaddedScrollView>
  );
};

export default HU;
