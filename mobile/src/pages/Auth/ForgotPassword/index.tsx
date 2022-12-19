import { Formik } from 'formik';
import i18n from 'i18n-js';
import React, { useState } from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';
import Modal from 'components/Modal';
import PaddedScrollView from 'components/PaddedScrollView';
import { Flex, Footer } from 'lib/sharedStyles';
import { forgotPassword } from 'services/forgotPassword';

import { HeaderText } from './styles';

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
    <PaddedScrollView>
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
        validateOnChange={false}
        validationSchema={signUpSchema}
        onSubmit={values => handleForgotPassword(values)}>
        {({ handleChange, handleSubmit, dirty, errors, values }) => (
          <Flex>
            <View>
              <FormTextInput
                error={errors.email}
                keyboardType="email-address"
                label={i18n.t('Email')}
                placeholder={i18n.t('Placeholder.Email')}
                value={values.email}
                onChangeText={handleChange('email')}
              />
            </View>

            <Footer>
              <MainButton
                disabled={!dirty || isSendingForm}
                text={i18n.t('Actions.Submit')}
                onPress={handleSubmit}
              />
            </Footer>
          </Flex>
        )}
      </Formik>
    </PaddedScrollView>
  );
};

export default ForgotPassword;
