import { Action, AppScreen } from '@common/telemetria';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';

import OptionsList from 'components/OptionList';
import { PaddedScrollView } from 'lib/sharedStyles';
import { getBestLocale } from 'utils/localize';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { OptionListEntry } from 'components/OptionList';
import type { RootStackProps } from 'routes/app';

import { Header, HeaderTitle } from './styles';

import IcVideo from '@assets/images/ic_video.svg';

const VideosMenu: React.FC = () => {
  const { languageTag } = getBestLocale();
  const navigation = useNavigation<RootStackProps>();

  let options: OptionListEntry[] = [
    {
      image: { source: IcVideo },
      title: i18n.t('BabySlingPage.1'),
      onPress: () =>
        navigation.navigate('VideoPage', {
          videos: languageTag === 'pt' ? ['IhKyaqGX_MQ'] : ['TpMlfCph8P4'],
        }),
    },
    {
      image: { source: IcVideo },
      title: i18n.t('BabySlingPage.2'),
      onPress: () =>
        navigation.navigate('VideoPage', {
          videos: languageTag === 'pt' ? ['rdTTyKGrq_s'] : ['KTm8mI26ro4'],
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
    {
      image: { source: IcVideo },
      title: i18n.t('EmotionsAndBreastfeedingPage.2'),
      onPress: () =>
        navigation.navigate('VideoPage', {
          videos: languageTag === 'pt' ? ['C2hFGeJj48k'] : ['nmJVBId9Uh8'],
        }),
    },
    {
      image: { source: IcVideo },
      title: i18n.t('ThePrematurePage.Option1'),
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['w2rbi3aW-rA'] }),
    },
    {
      image: { source: IcVideo },
      title: i18n.t('VideoMenuPage.Tutorial'),
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['-B6OZnuG8gw'] }),
    },
  ];

  if (languageTag === 'en') {
    options.push({
      image: { source: IcVideo },
      title: i18n.t('VideoMenuPage.NICU1'),
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['uNs_yauE8j8'] }),
    });
    options.push({
      image: { source: IcVideo },
      title: i18n.t('VideoMenuPage.NICU2'),
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['5c9uR1HKS2o'] }),
    });
    options.push({
      image: { source: IcVideo },
      title: i18n.t('VideoMenuPage.NICU3'),
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['WDhLULqdyG0'] }),
    });
    options.push({
      image: { source: IcVideo },
      title: i18n.t('VideoMenuPage.NICU4'),
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['WROguZyQDEw'] }),
    });
  }

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
