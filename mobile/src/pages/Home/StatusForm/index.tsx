import { Action, AppScreen } from '@common/telemetria';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';

import Modal from 'components/Modal';
import theme from 'config/theme';
import { useAuth } from 'contexts/auth';
import { answerStatusForm } from 'services/survey';
import SurveyQuestionsRepository from 'utils/surveyQuestionsRepository';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { RootRouteProp, RootStackProps } from 'routes/app';
import type { SurveyQuestion } from 'utils/surveyQuestionsRepository';

import StatusFormPage from './StatusFormPage';

type FormValues = {
  [key: string]: string;
};

const StatusForm: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const { motherInfo } = useAuth();
  const { situation } = useRoute<RootRouteProp<'StatusForm'>>().params;
  const pagesFlatListRef = useRef<FlatList>(null);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.StatusForm },
    });
  }, []);

  // Envia as respostas do usuário.
  async function handleFormSubmit(values: FormValues): Promise<void> {
    // Envia as respostas do usuário para cada a pergunta.
    const answers = Object.keys(values).map(id => ({
      id: Number(id),
      content: values[id],
    }));
    const statusFormScore = await answerStatusForm(situation, answers);
    if (statusFormScore === null) {
      setIsErrorModalVisible(true);
      return;
    }

    let meaning = '';
    if (statusFormScore <= 32) {
      meaning = i18n.t('StatusFormPage.LowEfficacy');
    } else if (statusFormScore > 32 && statusFormScore <= 51) {
      meaning = i18n.t('StatusFormPage.AverageEfficacy');
    } else {
      meaning = i18n.t('StatusFormPage.HighEfficacy');
    }
    const feedback = i18n.t('StatusFormPage.Score', {
      score: statusFormScore,
      meaning,
    });
    setFeedbackMessage(feedback);

    await createTelemetryAction({
      action: Action.Pressed,
      context: {
        screen: AppScreen.StatusForm,
        target: 'Actions.End',
      },
    });
  }

  function fetchQuestions(): SurveyQuestion[][] {
    const surveyQuestionsRepo = new SurveyQuestionsRepository(motherInfo);
    const questions = surveyQuestionsRepo.findByCategory(7);
    let pages = [];
    // Separa 3 perguntas por página.
    for (let i = 0; i < questions.length; i += 3) {
      pages.push(questions.slice(i, i + 3));
    }
    return pages;
  }

  const pagesQuestions = fetchQuestions();

  return (
    <>
      <Modal
        color={theme.babyBlue}
        content={feedbackMessage}
        options={[
          {
            text: i18n.t('Close'),
            isBold: true,
            onPress: () => navigation.navigate('FeedingForm', { situation }),
          },
        ]}
        visible={!!feedbackMessage}
      />
      <Modal
        color={theme.babyBlue}
        content={i18n.t('SurveyComponent.SubmitError')}
        options={[
          {
            text: i18n.t('Close'),
            isBold: true,
            onPress: () => setIsErrorModalVisible(false),
          },
        ]}
        visible={isErrorModalVisible}
      />

      <Formik
        initialValues={{}}
        validateOnChange={false}
        onSubmit={values => handleFormSubmit(values)}>
        {({ values, errors, setFieldError, submitForm, setFieldValue }) => (
          <FlatList<SurveyQuestion[]>
            data={pagesQuestions}
            keyExtractor={item => item[0].id.toString()}
            keyboardShouldPersistTaps="handled"
            ref={pagesFlatListRef}
            renderItem={({ item, index }) => (
              <StatusFormPage
                errors={errors}
                flatListRef={pagesFlatListRef}
                numberOfPages={pagesQuestions.length}
                pageIndex={index}
                questions={item}
                setFieldError={setFieldError}
                setFieldValue={setFieldValue}
                submitForm={submitForm}
                values={values}
              />
            )}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled
          />
        )}
      </Formik>
    </>
  );
};

export default StatusForm;
