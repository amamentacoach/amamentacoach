import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { hide } from 'react-native-bootsplash';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Yup from 'yup';

import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';
import Modal from 'components/Modal';
import { useAuth } from 'contexts/auth';
import { LoginStatus } from 'services/auth';

import type { AuthStackProps } from 'routes/auth';

import {
  ForgotPasswordText,
  FormContainer,
  Header,
  NoAccountText,
  ScrollView,
  SignUpContainer,
  SignUpText,
  SubmitButtonContainer,
} from './styles';

import Logo from '@assets/images/logo_primary.png';

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigation = useNavigation<AuthStackProps>();
  const { signIn } = useAuth();

  const [errorModalMessage, setErrorModalMessage] = useState<string | null>(
    null,
  );
  const [isSendingForm, setIsSendingForm] = useState(false);

  const formInitialValues: FormValues = {
    email: '',
    password: '',
  };
  const loginSchema: Yup.SchemaOf<FormValues> = Yup.object({
    email: Yup.string()
      .email(i18n.t('Yup.InvalidEmail'))
      .required(i18n.t('Yup.Required')),
    password: Yup.string()
      .min(8, i18n.t('Yup.MinLengthError', { min: 8 }))
      .matches(
        new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'),
        i18n.t('Yup.InvalidPassword'),
      )
      .required(i18n.t('Yup.Required')),
  }).required();

  useEffect(() => {
    hide({ duration: 250 });
  }, []);

  async function handleSignIn({ email, password }: FormValues) {
    setIsSendingForm(true);
    const status = await signIn(email, password);
    if (status === LoginStatus.FailedToConnect) {
      setErrorModalMessage(i18n.t('LoginPage.GenericError'));
      setIsSendingForm(false);
    } else if (status === LoginStatus.IncorrectLogin) {
      setErrorModalMessage(i18n.t('LoginPage.WrongInfoError'));
      setIsSendingForm(false);
    } else if (status === LoginStatus.AccountNotAuthorized) {
      setErrorModalMessage(i18n.t('LoginPage.NotAuthorizedError'));
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
      {!!errorModalMessage && (
        <Modal
          content={errorModalMessage}
          visible={!!errorModalMessage}
          options={[
            {
              text: i18n.t('Close'),
              isBold: true,
              onPress: () => setErrorModalMessage(null),
            },
          ]}
        />
      )}

      <ScrollView>
        <Header source={Logo} resizeMode="contain" />
        <Formik
          initialValues={formInitialValues}
          validationSchema={loginSchema}
          validateOnChange={false}
          onSubmit={values => handleSignIn(values)}>
          {({ handleChange, handleSubmit, dirty, errors, values }) => (
            <FormContainer>
              <View>
                <FormTextInput
                  label={i18n.t('Email')}
                  error={errors.email}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  placeholder={i18n.t('Placeholder.Email')}
                  keyboardType="email-address"
                />

                <FormTextInput
                  label={i18n.t('Password')}
                  error={errors.password}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  placeholder={i18n.t('LoginPage.PasswordPlaceholder')}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                onPress={handleForgotPassword}
                activeOpacity={0.7}>
                <ForgotPasswordText>
                  {i18n.t('LoginPage.ForgotPassword')}
                </ForgotPasswordText>
              </TouchableOpacity>

              <SubmitButtonContainer>
                <MainButton
                  onPress={handleSubmit}
                  disabled={!dirty || isSendingForm}
                  text={
                    isSendingForm
                      ? i18n.t('Status.SignIn')
                      : i18n.t('Actions.SignIn')
                  }
                />
              </SubmitButtonContainer>

              <SignUpContainer>
                <NoAccountText>{i18n.t('LoginPage.NoAccount')}</NoAccountText>
                <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
                  <SignUpText>{i18n.t('LoginPage.SignUp')}</SignUpText>
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
