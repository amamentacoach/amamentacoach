import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import FormTextInput from '../../../components/FormTextInput';

import {
  ScrollView,
  Header,
  HeaderText,
  HeaderSubText,
  FormContainer,
  SubmitButtonContainer,
} from './styles';
import MainButton from '../../../components/MainButton';

interface FormValues {
  email: string;
  password: string;
  password_confirmation: string;
}

const FormSignUp: React.FC = () => {
  const navigation = useNavigation();
  const formInitialValues: FormValues = {
    email: '',
    password: '',
    password_confirmation: '',
  };
  const signUpSchema: Yup.ObjectSchema<FormValues> = Yup.object({
    email: Yup.string().email('Email Inválido').required('Campo obrigatório'),
    password: Yup.string()
      .min(8, 'A senha precisa ter pelo menos 8 caracteres')
      .required('Campo obrigatório')
      .matches(
        new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'),
        'Precisa ter letras minúsculas, letras maiúsculas e números',
      ),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password')], 'As senhas precisam ser iguais')
      .required('Campo obrigatório'),
  }).required();

  function handleFormSubmit({ email, password }: FormValues) {
    navigation.navigate('MotherForm', { email, password });
  }

  return (
    <ScrollView>
      <Header>
        <HeaderText>Passo 1 de 3</HeaderText>
        <HeaderSubText>
          Primeiro, precisamos dos seguintes dados para que você possa acessar
          nossa plataforma:
        </HeaderSubText>
      </Header>
      <Formik
        initialValues={formInitialValues}
        validationSchema={signUpSchema}
        validateOnChange={false}
        onSubmit={values => handleFormSubmit(values)}>
        {({ handleChange, handleSubmit, dirty, errors, values }) => (
          <FormContainer>
            <View>
              <FormTextInput
                label="Email"
                error={errors.email}
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder="Email"
                keyboardType="email-address"
              />

              <FormTextInput
                label="Senha"
                error={errors.password}
                onChangeText={handleChange('password')}
                value={values.password}
                placeholder="Senha"
                secureTextEntry
              />

              <FormTextInput
                label="Confirme sua senha"
                error={errors.password_confirmation}
                onChangeText={handleChange('password_confirmation')}
                value={values.password_confirmation}
                placeholder="Confirme sua senha"
                secureTextEntry
              />
            </View>

            <SubmitButtonContainer>
              <MainButton
                onPress={handleSubmit}
                disabled={!dirty}
                text="Próximo"
              />
            </SubmitButtonContainer>
          </FormContainer>
        )}
      </Formik>
    </ScrollView>
  );
};

export default FormSignUp;
