import React from 'react';
import { Linking } from 'react-native';

import OptionsList, { OptionList } from '../../../components/OptionList';

import ScrollView from './styles';

import Music from '../../../../assets/images/music.svg';

const MusicPlaylists: React.FC = () => {
  const options: OptionList[] = [
    {
      Image: Music,
      title: 'Pop Instrumental',
      onPress: async () => {
        await Linking.openURL(
          'https://youtube.com/playlist?list=PLK7oeiGgzDtiNeJduFPY8Kep7mq9wRQ7l',
        );
      },
    },
    {
      Image: Music,
      title: 'Calma',
      onPress: async () => {
        await Linking.openURL(
          'https://youtube.com/playlist?list=PLK7oeiGgzDthw88gK7lCBtoYxdX4XhqvJ',
        );
      },
    },
    {
      Image: Music,
      title: 'Sertanejo',
      onPress: async () => {
        await Linking.openURL(
          'https://youtube.com/playlist?list=PLK7oeiGgzDtitdfAYT5bQNWTpsBOqiWc7',
        );
      },
    },
    {
      Image: Music,
      title: 'Funk',
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
