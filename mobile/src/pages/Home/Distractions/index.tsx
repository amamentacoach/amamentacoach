import { Action, AppScreen } from '@common/telemetria';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';
import { Linking } from 'react-native';

import OptionsList from 'components/OptionList';
import { PaddedScrollView } from 'lib/sharedStyles';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { OptionListEntry } from 'components/OptionList';
import type { RootStackProps } from 'routes/app';

import { HeaderText } from './styles';

import Crosswords from '@assets/images/crosswords.svg';
import Music from '@assets/images/music.svg';
import Puzzle from '@assets/images/puzzle.svg';

const Distractions: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const options: OptionListEntry[] = [
    {
      image: Puzzle,
      title: i18n.t('DistractionsPage.1'),
      onPress: async () =>
        Linking.openURL('https://www.geniol.com.br/raciocinio/quebra-cabeca'),
    },
    {
      image: Crosswords,
      title: i18n.t('DistractionsPage.2'),
      onPress: async () =>
        Linking.openURL(
          'https://cruzadasclube.com.br/jogo/categoria/id/1/n/cruzadas-classicas',
        ),
    },
    {
      image: Music,
      title: i18n.t('DistractionsPage.3'),
      onPress: () => navigation.navigate('MusicPlaylists'),
    },
  ];

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.Distractions },
    });
  }, []);

  return (
    <PaddedScrollView>
      <HeaderText>{i18n.t('DistractionsPage.Header')}</HeaderText>
      <OptionsList options={options} displayArrows />
    </PaddedScrollView>
  );
};

export default Distractions;
