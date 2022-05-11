import { Action, AppScreen } from '@common/telemetria';
import i18n from 'i18n-js';
import { useEffect } from 'react';
import { Linking } from 'react-native';

import OptionsList from 'components/OptionList';
import { getBestLocale } from 'utils/localize';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { OptionListEntry } from 'components/OptionList';

import ScrollView from './styles';

import Music from '@assets/images/music.svg';

const MusicPlaylists: React.FC = () => {
  const { languageTag } = getBestLocale();

  const ptLinks = [
    {
      image: { source: Music },
      title: i18n.t('MusicPlaylistsPage.3'),
      onPress: () =>
        Linking.openURL(
          'https://youtube.com/playlist?list=PLK7oeiGgzDtitdfAYT5bQNWTpsBOqiWc7',
        ),
    },
    {
      image: { source: Music },
      title: i18n.t('MusicPlaylistsPage.4'),
      onPress: () =>
        Linking.openURL(
          'https://youtube.com/playlist?list=PLK7oeiGgzDtj2PhNH_958pOx30vfuZ8ZS',
        ),
    },
  ];
  const enLinks = [
    {
      image: { source: Music },
      title: i18n.t('MusicPlaylistsPage.3'),
      onPress: () =>
        Linking.openURL(
          'https://www.youtube.com/watch?v=LoV5F_FwbBM&list=PLK7oeiGgzDtjvPIh49VD8m7TLJihv5-iU',
        ),
    },
  ];
  const links = languageTag === 'pt' ? ptLinks : enLinks;

  const options: OptionListEntry[] = [
    {
      image: { source: Music },
      title: i18n.t('MusicPlaylistsPage.1'),
      onPress: () =>
        Linking.openURL(
          'https://youtube.com/playlist?list=PLK7oeiGgzDtiNeJduFPY8Kep7mq9wRQ7l',
        ),
    },
    {
      image: { source: Music },
      title: i18n.t('MusicPlaylistsPage.2'),
      onPress: () =>
        Linking.openURL(
          'https://youtube.com/playlist?list=PLK7oeiGgzDthw88gK7lCBtoYxdX4XhqvJ',
        ),
    },
    ...links,
  ];

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.MusicPlaylists },
    });
  }, []);

  return (
    <ScrollView>
      <OptionsList options={options} displayArrows />
    </ScrollView>
  );
};

export default MusicPlaylists;
