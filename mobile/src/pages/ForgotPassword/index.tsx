import React, { useState } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { forgotPassword } from '../../services/auth';
import FormTextInput from '../../components/FormTextInput';
import MainButton from '../../components/MainButton';

import {
  Container,
  ScrollView,
  FormContainer,
  SubmitButtonContainer,
  HeaderText,
} from './styles';
import Modal from '../../components/Modal';

interface IFormValues {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
  const [isSendingForm, setIsSendingForm] = useState(false);

  const formInitialValues: IFormValues = {
    email: '',
  };
  const SignUpSchema: Yup.ObjectSchema<IFormValues> = Yup.object({
    email: Yup.string().email('Email Inválido').required('Obrigatório'),
  }).required();

  async function handleForgotPassword({ email }: IFormValues) {
    setIsSendingForm(true);
    await forgotPassword(email);
    setIsSendingForm(false);
    setIsSubmitModalVisible(true);
  }

  return (
    <Container>
      <ScrollView>
        <Modal
          text="Cheque sua caixa de entrada do e-mail e acesse o link que enviamos para a redefinição de sua senha."
          visible={isSubmitModalVisible}
          closeModal={() => setIsSubmitModalVisible(false)}
        />

        <HeaderText>
          Preencha o campo abaixo com o seu e-mail de cadastro para que possamos
          enviar um link de redefinição de senha.
        </HeaderText>
        <Formik
          initialValues={formInitialValues}
          validationSchema={SignUpSchema}
          validateOnChange={false}
          onSubmit={(values) => handleForgotPassword(values)}>
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
                  buttonText="Enviar"
                  onPress={handleSubmit}
                  disabled={!dirty || isSendingForm}
                />
              </SubmitButtonContainer>
            </FormContainer>
          )}
        </Formik>
      </ScrollView>
    </Container>
  );
};

export default ForgotPassword;
