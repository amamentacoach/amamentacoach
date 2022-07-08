import { Action, AppScreen } from '@common/telemetria';
import { useNavigation, useRoute } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect, useState } from 'react';

import Modal from 'components/Modal';
import theme from 'config/theme';
import { ScrollView } from 'lib/sharedStyles';
import { answerFeedingForm, answerStatusForm } from 'services/survey';
import { getBestLocale } from 'utils/localize';
import { createTelemetryAction } from 'utils/telemetryAction';

import { ContentContainer } from '../StatusForm/styles';

import type { FormikHelpers } from 'formik';
import type { RootRouteProp, RootStackProps } from 'routes/app';

import EnglishStatusForm from './EnglishForm';
import PortugueseStatusForm from './PortugueseForm';

export interface GenericFeedingFormProps {
  handleSubmitAnswers: (
    feedingFormAnswers: string[],
    { setSubmitting }: FormikHelpers<any>,
  ) => Promise<void>;
}

const FeedingForm: React.FC = () => {
  const { situation, statusFormAnswers } =
    useRoute<RootRouteProp<'FeedingForm'>>().params;
  const navigation = useNavigation<RootStackProps>();
  const { languageTag } = getBestLocale();
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.FeedingForm },
    });
  }, []);

  function displayFeedbackForm(statusFormScore: number): void {
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
  }

  // Envia as respostas recebidas da página anterior (StatusForm.tsx) para o servidor.
  async function handleSubmitAnswers(
    feedingFormAnswers: string[],
    { setSubmitting }: FormikHelpers<unknown>,
  ): Promise<void> {
    setSubmitting(true);
    const responses = await Promise.all([
      answerStatusForm(situation, statusFormAnswers),
      answerFeedingForm(situation, feedingFormAnswers),
    ]);
    setSubmitting(false);

    const [statusFormScore, feedingFormReqStatus] = responses;
    if (statusFormScore === null || !feedingFormReqStatus) {
      setIsErrorModalVisible(true);
      return;
    }
    displayFeedbackForm(statusFormScore);
  }

  function handleFeedbackModalClose(): void {
    setFeedbackMessage('');
    navigation.navigate('Home');
  }

  return (
    <>
      <Modal
        color={theme.babyBlue}
        content={feedbackMessage}
        options={[
          {
            text: i18n.t('Close'),
            isBold: true,
            onPress: handleFeedbackModalClose,
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
      <ScrollView>
        <ContentContainer>
          {languageTag === 'pt' ? (
            <PortugueseStatusForm handleSubmitAnswers={handleSubmitAnswers} />
          ) : (
            <EnglishStatusForm handleSubmitAnswers={handleSubmitAnswers} />
          )}
        </ContentContainer>
      </ScrollView>
    </>
  );
};

export default FeedingForm;
