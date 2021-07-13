import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import theme from '../../../config/theme';
import Survey from '../../../components/Survey';
import createGenericSurveyPage from '../../../components/GenericSurveyPage';

import HelpReceived1 from '../../../../assets/images/help_received_1.png';
import HelpReceived2 from '../../../../assets/images/help_received_2.png';

const HelpReceived: React.FC = () => {
  const navigation = useNavigation();

  const images = [HelpReceived1, HelpReceived2];

  // Marca o formulário como enviado no dia.
  async function setFormSent() {
    await AsyncStorage.setItem(
      '@AmamentaCoach:DiaryHelpReceivedLastDate',
      new Date().toISOString(),
    );
  }

  async function onFormEnd() {
    await setFormSent();
    navigation.navigate('Diary');
  }

  return (
    <Survey
      title="Minha rede de apoio"
      color={theme.babyPurple}
      category={4}
      Page={createGenericSurveyPage(onFormEnd, images)}
      onFeedbackAccepted={setFormSent}
    />
  );
};

export default HelpReceived;
