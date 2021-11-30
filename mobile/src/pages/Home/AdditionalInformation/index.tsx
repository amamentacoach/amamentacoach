import { Action, AppScreen } from '@common/telemetria';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';

import OptionsList from 'components/OptionList';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { OptionListEntry } from 'components/OptionList';
import type { RootStackProps } from 'routes/app';

import ScrollView from './styles';

import Change from '@assets/images/change.svg';
import DiarySmile from '@assets/images/diary_smile.svg';
import EmotionsInfo from '@assets/images/emotions_info.svg';
import PrematureBaby from '@assets/images/premature_baby.svg';
import PrematureBreastfeed from '@assets/images/premature_breastfeed.svg';

const AdditionalInformation: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const options: OptionListEntry[] = [
    {
      image: PrematureBreastfeed,
      title: i18n.t('AdditionalInformationPage.1'),
      subtitle: i18n.t('AdditionalInformationPage.2'),
      onPress: () => navigation.navigate('MilkAdditionalInformation'),
    },
    {
      image: PrematureBaby,
      title: i18n.t('BabySlingPage.PageName'),
      subtitle: i18n.t('AdditionalInformationPage.4'),
      onPress: () => navigation.navigate('BabySling'),
    },
    {
      image: DiarySmile,
      title: i18n.t('AdditionalInformationPage.5'),
      subtitle: i18n.t('AdditionalInformationPage.6'),
      onPress: () => navigation.navigate('Resilience'),
    },
    {
      image: Change,
      title: i18n.t('AdditionalInformationPage.7'),
      subtitle: i18n.t('AdditionalInformationPage.8'),
      onPress: () => navigation.navigate('ManageExpectations'),
    },
    {
      image: EmotionsInfo,
      title: i18n.t('AdditionalInformationPage.9'),
      subtitle: i18n.t('AdditionalInformationPage.10'),
      onPress: () => navigation.navigate('BabyCup'),
    },
  ];

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.AdditionalInformation },
    });
  }, []);

  return (
    <ScrollView>
      <OptionsList options={options} />
    </ScrollView>
  );
};

export default AdditionalInformation;
