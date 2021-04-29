import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNBootSplash from 'react-native-bootsplash';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Modal from '../../../components/Modal';
import FormTextInput from '../../../components/FormTextInput';
import MainButton from '../../../components/MainButton';
import { LoginStatus } from '../../../services/auth';
import { useAuth } from '../../../contexts/auth';

import {
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

import logo from '../../../../assets/images/logo_primary.png';

interface IFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const [isWrongDataModalVisible, setIsWrongDataModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSendingForm, setIsSendingForm] = useState(false);

  const formInitialValues: IFormValues = {
    email: '',
    password: '',
  };
  const loginSchema: Yup.ObjectSchema<IFormValues> = Yup.object({
    email: Yup.string().email('Email Inválido').required('Campo obrigatório'),
    password: Yup.string()
      .min(6, 'A senha precisa ter pelo menos 6 caracteres!')
      .required('Campo obrigatório'),
  }).required();

  useEffect(() => {
    RNBootSplash.hide({ duration: 250 });
  }, []);

  async function handleSignIn({ email, password }: IFormValues) {
    setIsSendingForm(true);
    const status = await signIn(email, password);
    if (status === LoginStatus.FailedToConnect) {
      setIsErrorModalVisible(true);
      setIsSendingForm(false);
    } else if (status === LoginStatus.IncorrectLogin) {
      setIsWrongDataModalVisible(true);
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
    <>
      <Modal
        content="E-mail ou senha incorretos!"
        visible={isWrongDataModalVisible}
        options={[
          {
            text: 'Fechar',
            isBold: true,
            onPress: () => setIsWrongDataModalVisible(false),
          },
        ]}
      />
      <Modal
        content={
          'Erro ao realizar login.\nPor favor tente novamente mais tarde.'
        }
        visible={isErrorModalVisible}
        options={[
          {
            text: 'Fechar',
            isBold: true,
            onPress: () => setIsErrorModalVisible(false),
          },
        ]}
      />

      <ScrollView>
        <Header>
          <HeaderImage source={logo} />
          <HeaderText>Amamenta Coach</HeaderText>
        </Header>
        <Formik
          initialValues={formInitialValues}
          validationSchema={loginSchema}
          validateOnChange={false}
          onSubmit={values => handleSignIn(values)}>
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
                  text={isSendingForm ? 'Entrando...' : 'Entrar'}
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
    </>
  );
};

export default Login;
