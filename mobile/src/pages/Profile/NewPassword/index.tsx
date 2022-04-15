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
import { newPassword } from 'services/forgotPassword';
import { createTelemetryAction } from 'utils/telemetryAction';

import { FormContainer, HeaderText, SubmitButtonContainer } from './styles';

interface FormValues {
  password: string;
  password_confirmation: string;
}

const NewPassword: React.FC = () => {
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
  const [isSendingForm, setIsSendingForm] = useState(false);

  const formInitialValues: FormValues = {
    password: '',
    password_confirmation: '',
  };
  const newPasswordSchema: Yup.SchemaOf<FormValues> = Yup.object({
    password: Yup.string()
      .min(6, i18n.t('Yup.MinLengthError', { num: 6 }))
      .required(i18n.t('Yup.Required')),
    password_confirmation: Yup.string()
      .min(6, i18n.t('Yup.MinLengthError', { num: 6 }))
      .oneOf([Yup.ref('password')], i18n.t('Yup.PasswordMustMatch'))
      .required(i18n.t('Yup.Required')),
  }).required();

  async function handleNewPassword({ password }: FormValues): Promise<void> {
    setIsSendingForm(true);
    const successfulRequest = await newPassword(password);
    setIsSendingForm(false);
    if (successfulRequest) {
      createTelemetryAction({
        action: Action.Pressed,
        context: {
          screen: AppScreen.NewPassword,
          target: 'Actions.Save',
        },
      });
      setIsSubmitModalVisible(true);
    }
  }

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.NewPassword },
    });
  }, []);

  return (
    <ScrollView>
      <Modal
        content={i18n.t('NewPasswordPage.PasswordChanged')}
        options={[
          {
            text: i18n.t('Close'),
            isBold: true,
            onPress: () => setIsSubmitModalVisible(false),
          },
        ]}
        visible={isSubmitModalVisible}
      />

      <HeaderText>{i18n.t('NewPasswordPage.Header')}</HeaderText>
      <Formik
        initialValues={formInitialValues}
        validateOnChange={false}
        validationSchema={newPasswordSchema}
        onSubmit={values => handleNewPassword(values)}>
        {({ handleChange, handleSubmit, dirty, errors, values }) => (
          <FormContainer>
            <View>
              <FormTextInput
                error={errors.password}
                label={i18n.t('NewPasswordPage.2')}
                placeholder={i18n.t('NewPasswordPage.5')}
                value={values.password}
                secureTextEntry
                onChangeText={handleChange('password')}
              />
              <FormTextInput
                error={errors.password_confirmation}
                label={i18n.t('NewPasswordPage.4')}
                placeholder={i18n.t('NewPasswordPage.5')}
                value={values.password_confirmation}
                secureTextEntry
                onChangeText={handleChange('password_confirmation')}
              />
            </View>

            <SubmitButtonContainer>
              <MainButton
                disabled={!dirty || isSendingForm}
                text={
                  isSendingForm
                    ? i18n.t('Status.Saving')
                    : i18n.t('Actions.Save')
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

export default NewPassword;
