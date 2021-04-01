import React from 'react';
import { useNavigation } from '@react-navigation/native';

import DiaryForm from '../../../components/DiaryForm';
import createGenericDiaryFormPage from '../../../components/GenericDiaryFormPage';

const SurveyFather: React.FC = () => {
  const navigation = useNavigation();
  const onFormEnd = () => navigation.navigate('Survey');

  return (
    <DiaryForm
      title="Participação do Pai"
      category={5}
      InfoPage={createGenericDiaryFormPage(onFormEnd)}
    />
  );
};

export default SurveyFather;
