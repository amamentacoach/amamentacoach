import React from 'react';
import { useNavigation } from '@react-navigation/native';

import DiaryForm from '../../../components/DiaryForm';
import createGenericDiaryFormPage from '../../../components/GenericDiaryFormPage';

const SurveyHelp: React.FC = () => {
  const navigation = useNavigation();
  const onFormEnd = () => navigation.navigate('Survey');

  return (
    <DiaryForm
      title="Sobre ajuda"
      category={9}
      InfoPage={createGenericDiaryFormPage(onFormEnd)}
    />
  );
};

export default SurveyHelp;
