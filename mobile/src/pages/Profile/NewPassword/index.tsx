import { Action, AppScreen } from '@common/Telemetria';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';
import Modal from 'components/Modal';
import { newPassword } from 'services/auth';
import { createTelemetryAction } from 'utils/telemetryAction';

import {
  FormContainer,
  HeaderText,
  ScrollView,
  SubmitButtonContainer,
} from './styles';

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
      await createTelemetryAction({
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
        visible={isSubmitModalVisible}
        options={[
          {
            text: i18n.t('Close'),
            isBold: true,
            onPress: () => setIsSubmitModalVisible(false),
          },
        ]}
      />

      <HeaderText>{i18n.t('NewPasswordPage.Header')}</HeaderText>
      <Formik
        initialValues={formInitialValues}
        validationSchema={newPasswordSchema}
        validateOnChange={false}
        onSubmit={values => handleNewPassword(values)}>
        {({ handleChange, handleSubmit, dirty, errors, values }) => (
          <FormContainer>
            <View>
              <FormTextInput
                label={i18n.t('NewPasswordPage.2')}
                onChangeText={handleChange('password')}
                value={values.password}
                placeholder={i18n.t('NewPasswordPage.5')}
                error={errors.password}
                secureTextEntry
              />
              <FormTextInput
                label={i18n.t('NewPasswordPage.4')}
                onChangeText={handleChange('password_confirmation')}
                value={values.password_confirmation}
                placeholder={i18n.t('NewPasswordPage.5')}
                error={errors.password_confirmation}
                secureTextEntry
              />
            </View>

            <SubmitButtonContainer>
              <MainButton
                onPress={handleSubmit}
                disabled={!dirty || isSendingForm}
                text={
                  isSendingForm
                    ? i18n.t('Status.Saving')
                    : i18n.t('Actions.Save')
                }
              />
            </SubmitButtonContainer>
          </FormContainer>
        )}
      </Formik>
    </ScrollView>
  );
};

export default NewPassword;
