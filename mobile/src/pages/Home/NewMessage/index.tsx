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
import { createMessage } from 'services/messages';
import { createTelemetryAction } from 'utils/telemetryAction';

import { FormContainer, HeaderText, SubmitButtonContainer } from './styles';

interface FormValues {
  message: string;
}

const NewMessage: React.FC = () => {
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [textInputText, setTextInputText] = useState('');

  const formInitialValues: FormValues = {
    message: '',
  };
  const newMessageSchema: Yup.SchemaOf<FormValues> = Yup.object({
    message: Yup.string().required(i18n.t('Yup.Required')),
  }).required();

  async function handleNewMessage({ message }: FormValues): Promise<void> {
    setIsSendingForm(true);
    const successfulRequest = await createMessage(message);

    if (successfulRequest) {
      createTelemetryAction({
        action: Action.Pressed,
        context: {
          screen: AppScreen.NewMessage,
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
      context: { screen: AppScreen.NewMessage },
    });
  }, []);

  return (
    <ScrollView>
      <Modal
        content={i18n.t('NewMessagePage.MessageSent')}
        options={[
          {
            text: i18n.t('Close'),
            isBold: true,
            onPress: () => setIsSubmitModalVisible(false),
          },
        ]}
        visible={isSubmitModalVisible}
      />

      <HeaderText>{i18n.t('NewMessagePage.Message')}</HeaderText>
      <Formik
        initialValues={formInitialValues}
        validateOnChange={false}
        validationSchema={newMessageSchema}
        onSubmit={values => handleNewMessage(values)}>
        {({ setFieldValue, handleSubmit, dirty, errors }) => (
          <FormContainer>
            <View>
              <FormTextInput
                error={errors.message}
                maxLength={255}
                numberOfLines={20}
                placeholder={i18n.t('Placeholder.Message')}
                textAlignVertical="top"
                value={textInputText}
                multiline
                onChangeText={(text: string) => {
                  setFieldValue('message', text);
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

export default NewMessage;
