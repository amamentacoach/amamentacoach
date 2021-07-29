import React, { useState } from 'react';

import { Formik } from 'formik';
import { View } from 'react-native';
import * as Yup from 'yup';

import FormTextInput from '../../../components/FormTextInput';
import MainButton from '../../../components/MainButton';
import Modal from '../../../components/Modal';
import { newPassword } from '../../../services/auth';

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
      .min(6, 'A senha precisa ter pelo menos 6 caracteres!')
      .required('Campo obrigatório'),
    password_confirmation: Yup.string()
      .min(6, 'A senha precisa ter pelo menos 6 caracteres!')
      .oneOf([Yup.ref('password')], 'As senhas precisam ser iguais!')
      .required('Campo obrigatório'),
  }).required();

  async function handleNewPassword({ password }: FormValues) {
    setIsSendingForm(true);
    const successfulRequest = await newPassword(password);
    setIsSendingForm(false);
    if (successfulRequest) {
      setIsSubmitModalVisible(true);
    }
  }

  return (
    <ScrollView>
      <Modal
        content="Senha alterada com sucesso!"
        visible={isSubmitModalVisible}
        options={[
          {
            text: 'Fechar',
            isBold: true,
            onPress: () => setIsSubmitModalVisible(false),
          },
        ]}
      />

      <HeaderText>Insira e confirme a nova senha</HeaderText>
      <Formik
        initialValues={formInitialValues}
        validationSchema={newPasswordSchema}
        validateOnChange={false}
        onSubmit={values => handleNewPassword(values)}>
        {({ handleChange, handleSubmit, dirty, errors, values }) => (
          <FormContainer>
            <View>
              <FormTextInput
                label="Nova senha"
                onChangeText={handleChange('password')}
                value={values.password}
                placeholder="Inserir nova senha"
                error={errors.password}
                secureTextEntry
              />
              <FormTextInput
                label="Confirme nova senha"
                onChangeText={handleChange('password_confirmation')}
                value={values.password_confirmation}
                placeholder="Confirme sua nova senha"
                error={errors.password_confirmation}
                secureTextEntry
              />
            </View>

            <SubmitButtonContainer>
              <MainButton
                onPress={handleSubmit}
                disabled={!dirty || isSendingForm}
                text={isSendingForm ? 'Salvando...' : 'Salvar'}
              />
            </SubmitButtonContainer>
          </FormContainer>
        )}
      </Formik>
    </ScrollView>
  );
};

export default NewPassword;
