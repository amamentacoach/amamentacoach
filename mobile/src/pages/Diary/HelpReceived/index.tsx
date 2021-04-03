import React from 'react';
import { useNavigation } from '@react-navigation/native';

import DiaryForm from '../../../components/DiaryForm';
import createGenericDiaryFormPage from '../../../components/GenericDiaryFormPage';

const HelpReceived: React.FC = () => {
  const navigation = useNavigation();
  const onFormEnd = () => navigation.navigate('Diary');

  return (
    <DiaryForm
      title="Minha rede de apoio"
      category={4}
      Page={createGenericDiaryFormPage(onFormEnd)}
    />
  );
};

export default HelpReceived;
