import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';

import FormTextInput from '../../components/FormTextInput';
import MainButton from '../../components/MainButton';
import { useAuth } from '../../contexts/auth';

import {
  Container,
  ScrollView,
  Header,
  HeaderImage,
  FormContainer,
  SubmitButtonContainer,
  HeaderText,
  ForgotPasswordText,
  NoAccountText,
  SignUpText,
  SignUpContainer,
} from './styles';

import logo from '../../../assets/images/logo_primary.png';

interface IFormValues {
  email: string;
  password: string;
}

const FormLogin: React.FC = () => {
  const navigation = useNavigation();
  const { signIn } = useAuth();
  const [isSendingForm, setIsSendingForm] = useState(false);

  const formInitialValues: IFormValues = {
    email: '',
    password: '',
  };
  const SignUpSchema: Yup.ObjectSchema<IFormValues> = Yup.object({
    email: Yup.string().email('Email Inválido').required('Obrigatório'),
    password: Yup.string()
      .min(6, 'A senha precisa ter pelo menos 6 caracteres!')
      .required('Campo obrigatório'),
  }).required();

  function handleSignIn({ email, password }: IFormValues) {
    setIsSendingForm(true);
    signIn(email, password);
    setIsSendingForm(false);
  }

  function handleSignUp() {
    navigation.navigate('SignUp');
  }

  return (
    <Container>
      <ScrollView>
        <Header>
          <HeaderImage resizeMode="contain" source={logo} />
          <HeaderText>Amamenta Coach</HeaderText>
        </Header>
        <Formik
          initialValues={formInitialValues}
          validationSchema={SignUpSchema}
          validateOnChange={false}
          onSubmit={(values) => handleSignIn(values)}>
          {({ handleChange, handleSubmit, dirty, errors, values }) => (
            <FormContainer>
              <View>
                <FormTextInput
                  label="Email"
                  error={errors.email}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  placeholder="Insira seu email"
                  keyboardType="email-address"
                />

                <FormTextInput
                  label="Senha"
                  error={errors.password}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  placeholder="Insira sua senha"
                  secureTextEntry
                />
              </View>

              <ForgotPasswordText>Esqueceu a senha?</ForgotPasswordText>

              <SubmitButtonContainer>
                <MainButton
                  onPress={handleSubmit}
                  disabled={!dirty || isSendingForm}
                  buttonText="Entrar"
                />
              </SubmitButtonContainer>

              <SignUpContainer>
                <NoAccountText>Ainda não possui uma conta?</NoAccountText>
                <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
                  <SignUpText>Cadastrar-se</SignUpText>
                </TouchableOpacity>
              </SignUpContainer>
            </FormContainer>
          )}
        </Formik>
      </ScrollView>
    </Container>
  );
};

export default FormLogin;
