import React from 'react';
import { Linking } from 'react-native';

import OptionsList from '../../../components/OptionList';

import ScrollView from './styles';

const MusicPlaylists: React.FC = () => {
  const options = [
    {
      image: require('../../../../assets/images/music.png'),
      title: 'Pop Instrumental',
      onPress: async () => {
        await Linking.openURL(
          'https://youtube.com/playlist?list=PLK7oeiGgzDtiNeJduFPY8Kep7mq9wRQ7l',
        );
      },
    },
    {
      image: require('../../../../assets/images/music.png'),
      title: 'Calma',
      onPress: async () => {
        await Linking.openURL(
          'https://youtube.com/playlist?list=PLK7oeiGgzDthw88gK7lCBtoYxdX4XhqvJ',
        );
      },
    },
    {
      image: require('../../../../assets/images/music.png'),
      title: 'Sertanejo',
      onPress: async () => {
        await Linking.openURL(
          'https://youtube.com/playlist?list=PLK7oeiGgzDtitdfAYT5bQNWTpsBOqiWc7',
        );
      },
    },
    {
      image: require('../../../../assets/images/music.png'),
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
