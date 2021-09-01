import React from 'react';

import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';

import OptionsList, { Options } from '../../../components/OptionList';

import ScrollView from './styles';

import PrematureBaby from '../../../../assets/images/premature_baby.svg';
import PrematureBirth from '../../../../assets/images/premature_birth.svg';
import PrematureHeart from '../../../../assets/images/premature_heart.svg';
import PrematureTrophy from '../../../../assets/images/premature_trophy.svg';

const Premature: React.FC = () => {
  const navigation = useNavigation();
  const options: Options[] = [
    {
      image: PrematureBirth,
      title: i18n.t('PrematurePage.Header1'),
      onPress: () => navigation.navigate('NotWhatIExpected'),
    },
    {
      image: PrematureBaby,
      title: i18n.t('PrematurePage.Header2'),
      onPress: () => navigation.navigate('ThePremature'),
    },
    {
      image: PrematureHeart,
      title: i18n.t('PrematurePage.Header3'),
      onPress: () => navigation.navigate('UploadBabyPhoto'),
    },
    {
      image: PrematureTrophy,
      title: i18n.t('PrematurePage.Header4'),
      subtitle: i18n.t('PrematurePage.Subtitle5'),
      onPress: () => navigation.navigate('BreastfeedingBenefits'),
    },
  ];

  return (
    <ScrollView>
      <OptionsList options={options} />
    </ScrollView>
  );
};

export default Premature;
