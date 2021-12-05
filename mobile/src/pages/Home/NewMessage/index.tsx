import { Action, AppScreen } from '@common/telemetria';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';
import Modal from 'components/Modal';
import { ScrollView } from 'lib/SharedStyles';
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
      await createTelemetryAction({
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
        visible={isSubmitModalVisible}
        options={[
          {
            text: i18n.t('Close'),
            isBold: true,
            onPress: () => setIsSubmitModalVisible(false),
          },
        ]}
      />

      <HeaderText>{i18n.t('NewMessagePage.Message')}</HeaderText>
      <Formik
        initialValues={formInitialValues}
        validationSchema={newMessageSchema}
        validateOnChange={false}
        onSubmit={values => handleNewMessage(values)}>
        {({ setFieldValue, handleSubmit, dirty, errors }) => (
          <FormContainer>
            <View>
              <FormTextInput
                onChangeText={(text: string) => {
                  setFieldValue('message', text);
                  setTextInputText(text);
                }}
                value={textInputText}
                placeholder={i18n.t('Placeholder.Message')}
                error={errors.message}
                multiline
                numberOfLines={20}
                maxLength={255}
                textAlignVertical="top"
              />
            </View>

            <SubmitButtonContainer>
              <MainButton
                onPress={handleSubmit}
                disabled={!dirty || isSendingForm}
                text={
                  isSendingForm
                    ? i18n.t('Status.Sending')
                    : i18n.t('Actions.Send')
                }
              />
            </SubmitButtonContainer>
          </FormContainer>
        )}
      </Formik>
    </ScrollView>
  );
};

export default NewMessage;
