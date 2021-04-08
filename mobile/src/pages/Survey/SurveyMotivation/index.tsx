import React from 'react';
import { useNavigation } from '@react-navigation/native';

import DiaryForm from '../../../components/DiaryForm';
import createGenericDiaryFormPage from '../../../components/GenericDiaryFormPage';

const SurveyMotivation: React.FC = () => {
  const navigation = useNavigation();
  const onFormEnd = () => navigation.navigate('Survey');

  return (
    <DiaryForm
      title="Motivação"
      category={8}
      Page={createGenericDiaryFormPage(onFormEnd)}
    />
  );
};

export default SurveyMotivation;
