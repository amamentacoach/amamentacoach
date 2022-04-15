import { Action, AppScreen } from '@common/telemetria';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';
import Modal from 'components/Modal';
import { ScrollView } from 'lib/sharedStyles';
import { createUserQuestion } from 'services/questions';
import { createTelemetryAction } from 'utils/telemetryAction';

import { FormContainer, HeaderText, SubmitButtonContainer } from './styles';

interface FormValues {
  question: string;
}

const NewQuestion: React.FC = () => {
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [textInputText, setTextInputText] = useState('');

  const formInitialValues: FormValues = {
    question: '',
  };
  const newPasswordSchema: Yup.SchemaOf<FormValues> = Yup.object({
    question: Yup.string().required(i18n.t('Yup.Required')),
  }).required();

  async function handleNewQuestion({ question }: FormValues): Promise<void> {
    setIsSendingForm(true);
    const successfulRequest = await createUserQuestion(question);

    if (successfulRequest) {
      createTelemetryAction({
        action: Action.Pressed,
        context: {
          screen: AppScreen.NewQuestion,
          target: 'Actions.Send',
        },
      });

      setIsSendingForm(false);
      setIsSubmitModalVisible(true);
      setTextInputText('');
    }
  }

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.NewQuestion },
    });
  }, []);

  return (
    <ScrollView>
      <Modal
        content={i18n.t('NewQuestionPage.QuestionSent')}
        options={[
          {
            text: i18n.t('Close'),
            isBold: true,
            onPress: () => setIsSubmitModalVisible(false),
          },
        ]}
        visible={isSubmitModalVisible}
      />

      <HeaderText>{i18n.t('NewQuestionPage.SubmitYourQuestion')}</HeaderText>
      <Formik
        initialValues={formInitialValues}
        validateOnChange={false}
        validationSchema={newPasswordSchema}
        onSubmit={values => handleNewQuestion(values)}>
        {({ setFieldValue, handleSubmit, dirty, errors }) => (
          <FormContainer>
            <View>
              <FormTextInput
                error={errors.question}
                maxLength={255}
                numberOfLines={20}
                placeholder={i18n.t('NewQuestionPage.QuestionPlaceholder')}
                textAlignVertical="top"
                value={textInputText}
                multiline
                onChangeText={(text: string) => {
                  setFieldValue('question', text);
                  setTextInputText(text);
                }}
              />
            </View>

            <SubmitButtonContainer>
              <MainButton
                disabled={!dirty || isSendingForm}
                text={
                  isSendingForm
                    ? i18n.t('Status.Sending')
                    : i18n.t('Actions.Send')
                }
                onPress={handleSubmit}
              />
            </SubmitButtonContainer>
          </FormContainer>
        )}
      </Formik>
    </ScrollView>
  );
};

export default NewQuestion;
