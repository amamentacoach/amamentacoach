import { Action, AppScreen } from '@common/Telemetria';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';

import FormRadioGroupInput from 'components/FormRadioGroup';
import {
  CurrentPageContainer,
  CurrentPageText,
  QuestionText,
} from 'components/GenericSurveyPage/styles';
import MainButton from 'components/MainButton';
import SecondaryButton from 'components/SecondaryButton';
import Survey from 'components/Survey';
import theme from 'config/theme';
import { dateFormatVerbose } from 'lib/date-fns';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { SurveyPage } from 'components/Survey';
import type { RootStackProps } from 'routes/app';

import { Container, Footer, SecondFooterButtonContainer } from './styles';

const Feelings: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const currentDate = dateFormatVerbose(new Date());

  // Marca o formulário como enviado no dia e registra uma ação de telemetria.
  async function setFormSent(target: string): Promise<void> {
    await createTelemetryAction({
      action: Action.Pressed,
      context: { screen: AppScreen.Feelings, target },
    });
    await AsyncStorage.setItem(
      '@AmamentaCoach:DiaryFeelingsLastDate',
      new Date().toISOString(),
    );
  }

  // Executada caso o usuário decida traçar suas metas.
  async function onFormEndGoals(): Promise<void> {
    await setFormSent('FeelingsPage.SaveGoals');
    navigation.dispatch(StackActions.replace('Goals'));
  }

  // Executada se o usuário decidir não traçar suas metas.
  async function onFormEndDiary(): Promise<void> {
    await setFormSent('Actions.SaveAndExit');
    navigation.navigate('Diary');
  }

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.Feelings },
    });
  }, []);

  const FormPage: React.FC<SurveyPage> = ({
    index,
    pagesLength,
    question,
    isFormValid,
    isDirty,
    isSendingForm,
    color,
    setFieldValue,
    handleChangePage,
  }) => (
    <Container>
      <CurrentPageContainer color={color}>
        <CurrentPageText>
          {index + 1}/{pagesLength}
        </CurrentPageText>
      </CurrentPageContainer>
      <QuestionText>{question.description}</QuestionText>

      <FormRadioGroupInput
        color={color}
        fieldName={`${question.id}`}
        options={question.options}
        multipleSelection={question.multipleSelection}
        displayOtherField={question.displayOther}
        error={isFormValid ? '' : i18n.t('Yup.AnswerRequired')}
        onChange={setFieldValue}
      />

      <Footer>
        <MainButton
          color={color}
          text={
            index === pagesLength - 1
              ? i18n.t('FeelingsPage.SaveGoals')
              : i18n.t('Next')
          }
          disabled={!isDirty || isSendingForm}
          onPress={() => handleChangePage(index + 1, onFormEndGoals)}
        />
        {index === pagesLength - 1 && (
          <SecondFooterButtonContainer>
            <SecondaryButton
              color={color}
              text={i18n.t('Actions.SaveAndExit')}
              disabled={!isDirty || isSendingForm}
              onPress={() => handleChangePage(index + 1, onFormEndDiary)}
            />
          </SecondFooterButtonContainer>
        )}
      </Footer>
    </Container>
  );

  return (
    <Survey
      title={currentDate}
      color={theme.babyPurple}
      category={2}
      Page={FormPage}
      onFeedbackAccepted={() => setFormSent('SurveyComponent.ReadFeedback')}
    />
  );
};

export default Feelings;
