import { Action, AppScreen } from '@common/telemetria';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';
import { Linking } from 'react-native';

import OptionsList from 'components/OptionList';
import { getBestLocale } from 'utils/localize';
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
  const { languageTag } = getBestLocale();
  const navigation = useNavigation<RootStackProps>();
  const options: OptionListEntry[] = [
    {
      image: { source: PrematureBreastfeed },
      title: i18n.t('AdditionalInformationPage.1'),
      subtitle: i18n.t('AdditionalInformationPage.2'),
      onPress: () => navigation.navigate('MilkAdditionalInformation'),
    },
    {
      image: { source: PrematureBaby },
      title: i18n.t('BabySlingPage.PageName'),
      subtitle: i18n.t('AdditionalInformationPage.4'),
      onPress: () => navigation.navigate('BabySling'),
    },
    {
      image: { source: DiarySmile },
      title: i18n.t('AdditionalInformationPage.5'),
      subtitle: i18n.t('AdditionalInformationPage.6'),
      onPress: () => navigation.navigate('Resilience'),
    },
    {
      image: { source: Change },
      title: i18n.t('AdditionalInformationPage.7'),
      subtitle: i18n.t('AdditionalInformationPage.8'),
      onPress: () => navigation.navigate('ManageExpectations'),
    },
    {
      image: { source: EmotionsInfo },
      title: i18n.t('AdditionalInformationPage.9'),
      subtitle: i18n.t('AdditionalInformationPage.10'),
      onPress: () => navigation.navigate('BabyCup'),
    },
  ];
  if (languageTag === 'en') {
    options.push({
      image: { source: EmotionsInfo },
      title: i18n.t('AdditionalInformationPage.11'),
      onPress: () =>
        Linking.openURL(
          'https://www.canada.ca/content/dam/hc-sc/documents/services/publications/drugs-health-products/is-cannabis-safe-during-preconception-pregnancy-breastfeeding/is-cannabis-safe-during-preconception-pregnancy-breastfeeding.pdf',
        ),
    });
  }

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
