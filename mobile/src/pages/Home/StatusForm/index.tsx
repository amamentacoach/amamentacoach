import { Action, AppScreen } from '@common/telemetria';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';

import Modal from 'components/Modal';
import theme from 'config/theme';
import { useAuth } from 'contexts/auth';
import { answerFeedingForm, answerStatusForm } from 'services/survey';
import SurveyQuestionsRepository from 'utils/surveyQuestionsRepository';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { StatusFormQuestion } from './StatusFormPage';
import type { RootRouteProp, RootStackProps } from 'routes/app';

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

  // Não exibe a questão de alimentação se for a primeira vez do usuário respondendo a escala.
  const displayFeedingForm = situation !== '1D';
  // Id da pergunta de alimentação.
  const feedingQuestionsIds = [6];

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.StatusForm },
    });
  }, []);

  // Envia as respostas do usuário.
  async function handleFormSubmit(values: FormValues): Promise<void> {
    if (displayFeedingForm) {
      const feedingAnswers = Object.keys(values)
        .filter(id => feedingQuestionsIds.includes(Number(id)))
        .map(id => values[id]);

      const status = await answerFeedingForm(situation, feedingAnswers);
      if (!status) {
        setIsErrorModalVisible(true);
        return;
      }
      feedingQuestionsIds.forEach(id => delete values[id]);
    }

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

  function fetchQuestions(): StatusFormQuestion[][] {
    const surveyQuestionsRepo = new SurveyQuestionsRepository(motherInfo);
    const questions: StatusFormQuestion[] = surveyQuestionsRepo
      .findByCategory(7)
      .map(question => ({ ...question, direction: 'row' }));

    let pages = [];
    // Separa 3 perguntas por página.
    for (let i = 0; i < questions.length; i += 3) {
      pages.push(questions.slice(i, i + 3));
    }
    // Adiciona a pergunta de alimentação caso necessário.
    if (displayFeedingForm) {
      const feedingQuestions: StatusFormQuestion[] = surveyQuestionsRepo
        .findByIds(feedingQuestionsIds)
        .map(question => ({ ...question, direction: 'column' }));

      pages[pages.length - 1] = [
        ...pages[pages.length - 1],
        ...feedingQuestions,
      ];
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
            onPress: () => navigation.navigate('Home'),
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
          <FlatList<StatusFormQuestion[]>
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
