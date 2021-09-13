import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import createGenericSurveyPage from 'components/GenericSurveyPage';
import Survey from 'components/Survey';
import theme from 'config/theme';

import type { RootStackProps } from 'routes/app';

const DiaryActions: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();

  // Marca o formulário como enviado no dia.
  async function setFormSent() {
    await AsyncStorage.setItem(
      '@AmamentaCoach:DiaryActionsLastDate',
      new Date().toISOString(),
    );
  }

  async function onFormEnd() {
    await setFormSent();
    navigation.navigate('Diary');
  }

  return (
    <Survey
      title="Ações Realizadas com o bebê"
      color={theme.babyPurple}
      category={6}
      Page={createGenericSurveyPage(onFormEnd)}
      onFeedbackAccepted={setFormSent}
    />
  );
};

export default DiaryActions;
