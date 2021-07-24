import React, { useState } from 'react';

import { Formik } from 'formik';
import { View } from 'react-native';
import * as Yup from 'yup';

import FormTextInput from '../../../components/FormTextInput';
import MainButton from '../../../components/MainButton';
import Modal from '../../../components/Modal';
import { forgotPassword } from '../../../services/auth';

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
    email: Yup.string().email('Email Inválido').required('Campo obrigatório'),
  }).required();

  async function handleForgotPassword({ email }: FormValues) {
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
        content="Cheque sua caixa de entrada do e-mail e acesse o link que enviamos para a redefinição de sua senha."
        options={[
          {
            text: 'Fechar',
            isBold: true,
            onPress: () => setIsSubmitModalVisible(false),
          },
        ]}
        visible={isSubmitModalVisible}
      />

      <HeaderText>
        Preencha o campo abaixo com o seu e-mail de cadastro para que possamos
        enviar um link de redefinição de senha.
      </HeaderText>
      <Formik
        initialValues={formInitialValues}
        validationSchema={signUpSchema}
        validateOnChange={false}
        onSubmit={values => handleForgotPassword(values)}>
        {({ handleChange, handleSubmit, dirty, errors, values }) => (
          <FormContainer>
            <View>
              <FormTextInput
                label="Email"
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder="Insira seu email"
                keyboardType="email-address"
                error={errors.email}
              />
            </View>

            <SubmitButtonContainer>
              <MainButton
                text="Enviar"
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
