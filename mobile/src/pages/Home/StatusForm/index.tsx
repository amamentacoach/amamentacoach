import { Action, AppScreen } from '@common/telemetria';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import FormRadioGroup from 'components/FormRadioGroup';
import MainButton from 'components/MainButton';
import Modal from 'components/Modal';
import theme from 'config/theme';
import { useAuth } from 'contexts/auth';
import { Flex, ScrollView } from 'lib/sharedStyles';
import { answerStatusForm } from 'services/survey';
import { UserTypes } from 'services/user';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { FormikHelpers } from 'formik';
import type { RootRouteProp, RootStackProps } from 'routes/app';

import {
  CenterAlignedText,
  ContentContainer,
  Footer,
  HeaderBackground,
  HeaderText,
  HighlightedText,
  TextContainer,
  ValuesInfoText,
} from './styles';

type FormValues = {
  [key: string]: string;
};

type FormValuesKey = keyof FormValues;

const StatusForm: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const { userInfo } = useAuth();
  const { situation } = useRoute<RootRouteProp<'StatusForm'>>().params;
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Perguntas da escala possuem id entre 17-34 (veja perguntas.ts).
  const questionsIds = Array.from(new Array(18), (_, i) => i + 17);
  // Inicia todas as respostas vazias.
  const initialValues: FormValues = questionsIds.reduce(
    (previous, current) => ({
      ...previous,
      [current]: '',
    }),
    {},
  );
  // Todas as perguntas da escala são obrigatórias.
  const validationSchema = Yup.object().shape(
    questionsIds.reduce(
      (previous, current) => ({
        ...previous,
        [current]: Yup.string().required(i18n.t('Yup.Required')),
      }),
      {},
    ),
  );

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.StatusForm },
    });
  }, []);

  // Envia as respostas do usuário.
  async function handleFormSubmit(
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ): Promise<void> {
    setSubmitting(true);

    // Envia as respostas do usuário para cada a pergunta.
    const answers = Object.keys(values).map(id => ({
      id: Number(id),
      content: values[id as unknown as FormValuesKey],
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
    setSubmitting(false);
    setFeedbackMessage(feedback);

    createTelemetryAction({
      action: Action.Pressed,
      context: {
        screen: AppScreen.StatusForm,
        target: 'Actions.End',
      },
    });
  }

  function handleFeedbackModalClose(): void {
    setFeedbackMessage('');
    if (userInfo.type === UserTypes.PREGNANT) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('FeedingForm', { situation });
    }
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

      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}>
        {({ errors, isSubmitting, submitForm, setFieldValue }) => (
          <ScrollView>
            <HeaderBackground />
            <HeaderText>{i18n.t('StatusFormPage.Header')}</HeaderText>
            <ContentContainer>
              <ValuesInfoText>{i18n.t('StatusFormPage.Intro')}</ValuesInfoText>
              <ValuesInfoText>
                <HighlightedText>1</HighlightedText> ={' '}
                {i18n.t('StatusFormPage.InfoValue1')}
              </ValuesInfoText>
              <ValuesInfoText>
                <HighlightedText>2</HighlightedText> ={' '}
                {i18n.t('StatusFormPage.InfoValue2')}
              </ValuesInfoText>
              <ValuesInfoText>
                <HighlightedText>3</HighlightedText> ={' '}
                {i18n.t('StatusFormPage.InfoValue3')}
              </ValuesInfoText>
              <ValuesInfoText>
                <HighlightedText>4</HighlightedText> ={' '}
                {i18n.t('StatusFormPage.InfoValue4')}
              </ValuesInfoText>
              <ValuesInfoText>
                <HighlightedText>5</HighlightedText> ={' '}
                {i18n.t('StatusFormPage.InfoValue5')}
              </ValuesInfoText>

              <Flex>
                {Object.keys(initialValues)
                  .slice(0, 7)
                  .map((questionId, index) => (
                    <FormRadioGroup
                      color={theme.babyBlue}
                      direction="row"
                      displayOtherField={false}
                      error={errors[questionId as unknown as FormValuesKey]}
                      key={questionId}
                      label={`${index + 1} - ${i18n.t(
                        `StatusFormPage.Questions.${index + 1}.Description`,
                      )}`}
                      options={['1', '2', '3', '4', '5']}
                      onChange={fieldValues =>
                        setFieldValue(questionId, fieldValues[0])
                      }
                    />
                  ))}

                <TextContainer>
                  <CenterAlignedText>
                    {i18n.t('StatusFormPage.WhenMyBaby')}
                  </CenterAlignedText>
                </TextContainer>

                {Object.keys(initialValues)
                  .slice(7, 18)
                  .map((questionId, index) => (
                    <FormRadioGroup
                      color={theme.babyBlue}
                      direction="row"
                      displayOtherField={false}
                      error={errors[questionId as unknown as FormValuesKey]}
                      key={questionId}
                      label={`${index + 8} - ${i18n.t(
                        `StatusFormPage.Questions.${index + 8}.Description`,
                      )}`}
                      options={['1', '2', '3', '4', '5']}
                      onChange={fieldValues =>
                        setFieldValue(questionId, fieldValues[0])
                      }
                    />
                  ))}
              </Flex>

              <Footer>
                <MainButton
                  color={theme.babyBlue}
                  disabled={isSubmitting}
                  text={i18n.t('Next')}
                  onPress={submitForm}
                />
              </Footer>
            </ContentContainer>
          </ScrollView>
        )}
      </Formik>
    </>
  );
};

export default StatusForm;
