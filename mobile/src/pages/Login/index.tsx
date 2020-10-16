import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Modal from '../../components/Modal';
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

  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
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

  async function handleSignIn({ email, password }: IFormValues) {
    setIsSendingForm(true);
    const validLogin = await signIn(email, password);
    if (!validLogin) {
      setIsSubmitModalVisible(true);
      setIsSendingForm(false);
    }
  }

  function handleForgotPassword() {
    navigation.navigate('ForgotPassword');
  }

  function handleSignUp() {
    navigation.navigate('SignUp');
  }

  return (
    <Container>
      <Modal
        text="E-mail ou senha incorretos!"
        visible={isSubmitModalVisible}
        closeModal={() => setIsSubmitModalVisible(false)}
      />

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

              <TouchableOpacity
                onPress={handleForgotPassword}
                activeOpacity={0.7}>
                <ForgotPasswordText>Esqueceu a senha?</ForgotPasswordText>
              </TouchableOpacity>

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
