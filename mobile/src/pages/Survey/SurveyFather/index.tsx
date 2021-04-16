import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import 'moment/locale/pt-br';

import DiaryForm from '../../../components/DiaryForm';
import createGenericDiaryFormPage from '../../../components/GenericDiaryFormPage';

const SurveyFather: React.FC = () => {
  const navigation = useNavigation();

  // Marca o formulário como enviado no dia.
  async function setFormSent() {
    await AsyncStorage.setItem(
      '@AmamentaCoach:DiarySurveyFatherLastDate',
      moment().format('YYYY-MM-DD'),
    );
  }

  async function onFormEnd() {
    await setFormSent();
    navigation.navigate('Survey');
  }

  return (
    <DiaryForm
      title="Participação do Pai"
      category={5}
      Page={createGenericDiaryFormPage(onFormEnd)}
      onFeedbackAccepted={setFormSent}
    />
  );
};

export default SurveyFather;
