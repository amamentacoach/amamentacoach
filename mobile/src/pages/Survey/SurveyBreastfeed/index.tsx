import React from 'react';
import { useNavigation } from '@react-navigation/native';

import DiaryForm from '../../../components/DiaryForm';
import createGenericDiaryFormPage from '../../../components/GenericDiaryFormPage';

const SurveyBreastfeed: React.FC = () => {
  const navigation = useNavigation();
  const onFormEnd = () => navigation.navigate('SurveyStatistics');

  return (
    <DiaryForm
      title="Amamentar um prematuro"
      category={1}
      InfoPage={createGenericDiaryFormPage(onFormEnd)}
    />
  );
};

export default SurveyBreastfeed;
