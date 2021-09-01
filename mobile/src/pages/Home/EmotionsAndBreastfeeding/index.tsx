import React from 'react';

import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';

import OptionsList, { Options } from '../../../components/OptionList';

import ScrollView from './styles';

import EmotionsBox from '../../../../assets/images/emotions_box.svg';
import EmotionsJacobson from '../../../../assets/images/emotions_jacobson.svg';

const EmotionsAndBreastfeeding: React.FC = () => {
  const navigation = useNavigation();

  const options: Options[] = [
    {
      image: EmotionsBox,
      title: i18n.t('EmotionsAndBreastfeedingPage.1'),
      onPress: () => navigation.navigate('Distractions'),
    },
    {
      image: EmotionsJacobson,
      title: i18n.t('EmotionsAndBreastfeedingPage.2'),
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['C2hFGeJj48k'] }),
    },
  ];

  return (
    <ScrollView>
      <OptionsList options={options} />
    </ScrollView>
  );
};

export default EmotionsAndBreastfeeding;
