import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import FormTextInput from '../../components/FormTextInput';

import {
  Container,
  ScrollView,
  Header,
  HeaderText,
  HeaderSubText,
  FormContainer,
  ButtonContainer,
} from './styles';
import MainButton from '../../components/MainButton';

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Email Inválido').required('Obrigatório'),
    password: Yup.string()
      .min(6, 'A senha precisa ter pelo menos 6 caracteres!')
      .required('Campo obrigatório'),
    password_confirmation: Yup.string()
      .min(6, 'A senha precisa ter pelo menos 6 caracteres!')
      .oneOf([Yup.ref('password')], 'As senhas precisam ser iguais!')
      .required('Campo obrigatório'),
  });

  return (
    <Container>
      <ScrollView>
        <Header>
          <HeaderText>Passo 1 de 3</HeaderText>
          <HeaderSubText>
            Primeiro, precisamos dos seguintes dados para que você possa acessar
            nossa plataforma:
          </HeaderSubText>
        </Header>
        <Formik
          initialValues={{ email: '', password: '', password_confirmation: '' }}
          validationSchema={SignUpSchema}
          onSubmit={(values) => {
            console.log(values);
            navigation.navigate('CadastroMae');
          }}>
          {({ handleChange, handleSubmit, dirty, isValid, errors, values }) => (
            <FormContainer>
              <FormTextInput
                label="Email"
                error={errors.email}
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder="Email"
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

              <ButtonContainer>
                <MainButton
                  onPress={handleSubmit}
                  disabled={!(isValid && dirty)}
                  buttonText="Próximo"
                />
              </ButtonContainer>
            </FormContainer>
          )}
        </Formik>
      </ScrollView>
    </Container>
  );
};

export default SignUp;
