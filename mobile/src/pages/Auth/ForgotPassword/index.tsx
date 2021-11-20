import { Formik } from 'formik';
import i18n from 'i18n-js';
import { useState } from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';
import Modal from 'components/Modal';
import { forgotPassword } from 'services/auth';

import {
  FormContainer,
  HeaderText,
  ScrollView,
  SubmitButtonContainer,
} from './styles';

interface FormValues {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
  const [isSendingForm, setIsSendingForm] = useState(false);

  const formInitialValues: FormValues = {
    email: '',
  };
  const signUpSchema: Yup.SchemaOf<FormValues> = Yup.object({
    email: Yup.string()
      .email(i18n.t('Yup.InvalidEmail'))
      .required(i18n.t('Yup.Required')),
  }).required();

  async function handleForgotPassword({ email }: FormValues): Promise<void> {
    setIsSendingForm(true);
    const successfulRequest = await forgotPassword(email);
    setIsSendingForm(false);
    if (successfulRequest) {
      setIsSubmitModalVisible(true);
    }
  }

  return (
    <ScrollView>
      <Modal
        content={i18n.t('ForgotPasswordPage.PopUp')}
        options={[
          {
            text: i18n.t('Close'),
            isBold: true,
            onPress: () => setIsSubmitModalVisible(false),
          },
        ]}
        visible={isSubmitModalVisible}
      />
      <HeaderText>{i18n.t('ForgotPasswordPage.Header')}</HeaderText>
      <Formik
        initialValues={formInitialValues}
        validationSchema={signUpSchema}
        validateOnChange={false}
        onSubmit={values => handleForgotPassword(values)}>
        {({ handleChange, handleSubmit, dirty, errors, values }) => (
          <FormContainer>
            <View>
              <FormTextInput
                label={i18n.t('Email')}
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder={i18n.t('Placeholder.Email')}
                keyboardType="email-address"
                error={errors.email}
              />
            </View>

            <SubmitButtonContainer>
              <MainButton
                text={i18n.t('Actions.Send')}
                onPress={handleSubmit}
                disabled={!dirty || isSendingForm}
              />
            </SubmitButtonContainer>
          </FormContainer>
        )}
      </Formik>
    </ScrollView>
  );
};

export default ForgotPassword;
