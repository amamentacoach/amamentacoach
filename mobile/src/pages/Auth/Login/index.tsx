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
import { Flex } from 'lib/sharedStyles';
import { LoginStatus } from 'services/auth';

import type { AuthStackProps } from 'routes/auth';

import {
  ForgotPasswordText,
  FormContainer,
  Header,
  NoAccountText,
  ScrollView,
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
      .min(4, i18n.t('Yup.MinLengthError', { min: 4 }))
      .required(i18n.t('Yup.Required')),
  }).required();

  useEffect(() => {
    hide({ duration: 250 });
  }, []);

  async function handleSignIn({ email, password }: FormValues): Promise<void> {
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

  function handleForgotPassword(): void {
    navigation.navigate('ForgotPassword');
  }

  function handleSignUp(): void {
    navigation.navigate('SignUp');
  }

  return (
    <>
      {!!errorModalMessage && (
        <Modal
          content={errorModalMessage}
          options={[
            {
              text: i18n.t('Close'),
              isBold: true,
              onPress: () => setErrorModalMessage(null),
            },
          ]}
          visible={!!errorModalMessage}
        />
      )}

      <ScrollView>
        <Header resizeMode="contain" source={Logo} />
        <Formik
          initialValues={formInitialValues}
          validateOnChange={false}
          validationSchema={loginSchema}
          onSubmit={values => handleSignIn(values)}>
          {({ handleChange, handleSubmit, dirty, errors, values }) => (
            <FormContainer>
              <View>
                <FormTextInput
                  error={errors.email}
                  keyboardType="email-address"
                  label={i18n.t('Email')}
                  placeholder={i18n.t('Placeholder.Email')}
                  value={values.email}
                  onChangeText={handleChange('email')}
                />

                <FormTextInput
                  error={errors.password}
                  label={i18n.t('Password')}
                  placeholder={i18n.t('LoginPage.PasswordPlaceholder')}
                  value={values.password}
                  secureTextEntry
                  onChangeText={handleChange('password')}
                />
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleForgotPassword}>
                <ForgotPasswordText>
                  {i18n.t('LoginPage.ForgotPassword')}
                </ForgotPasswordText>
              </TouchableOpacity>

              <SubmitButtonContainer>
                <MainButton
                  disabled={!dirty || isSendingForm}
                  text={
                    isSendingForm
                      ? i18n.t('Status.SignIn')
                      : i18n.t('Actions.SignIn')
                  }
                  onPress={handleSubmit}
                />
              </SubmitButtonContainer>

              <Flex>
                <NoAccountText>{i18n.t('LoginPage.NoAccount')}</NoAccountText>
                <TouchableOpacity activeOpacity={0.7} onPress={handleSignUp}>
                  <SignUpText>{i18n.t('LoginPage.SignUp')}</SignUpText>
                </TouchableOpacity>
              </Flex>
            </FormContainer>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};

export default Login;
