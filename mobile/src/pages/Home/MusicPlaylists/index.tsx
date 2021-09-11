import i18n from 'i18n-js';
import { Linking } from 'react-native';

import OptionsList from '../../../components/OptionList';

import type { OptionListEntry } from '../../../components/OptionList';

import ScrollView from './styles';

import Music from '../../../../assets/images/music.svg';

const MusicPlaylists: React.FC = () => {
  const options: OptionListEntry[] = [
    {
      image: Music,
      title: i18n.t('MusicPlaylistsPage.1'),
      onPress: async () => {
        await Linking.openURL(
          'https://youtube.com/playlist?list=PLK7oeiGgzDtiNeJduFPY8Kep7mq9wRQ7l',
        );
      },
    },
    {
      image: Music,
      title: i18n.t('MusicPlaylistsPage.2'),
      onPress: async () => {
        await Linking.openURL(
          'https://youtube.com/playlist?list=PLK7oeiGgzDthw88gK7lCBtoYxdX4XhqvJ',
        );
      },
    },
    {
      image: Music,
      title: i18n.t('MusicPlaylistsPage.3'),
      onPress: async () => {
        await Linking.openURL(
          'https://youtube.com/playlist?list=PLK7oeiGgzDtitdfAYT5bQNWTpsBOqiWc7',
        );
      },
    },
    {
      image: Music,
      title: i18n.t('MusicPlaylistsPage.4'),
      onPress: async () => {
        await Linking.openURL(
          'https://youtube.com/playlist?list=PLK7oeiGgzDtj2PhNH_958pOx30vfuZ8ZS',
        );
      },
    },
  ];

  return (
    <ScrollView>
      <OptionsList options={options} displayArrows />
    </ScrollView>
  );
};

export default MusicPlaylists;
