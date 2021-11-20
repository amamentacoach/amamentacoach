import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { View } from 'react-native';
import * as Yup from 'yup';

import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';

import type { AuthStackProps } from 'routes/auth';

import {
  FormContainer,
  Header,
  HeaderSubText,
  HeaderText,
  ScrollView,
  SubmitButtonContainer,
} from './styles';

interface FormValues {
  email: string;
  password: string;
  password_confirmation: string;
}

const FormSignUp: React.FC = () => {
  const navigation = useNavigation<AuthStackProps>();
  const formInitialValues: FormValues = {
    email: '',
    password: '',
    password_confirmation: '',
  };
  const signUpSchema: Yup.SchemaOf<FormValues> = Yup.object({
    email: Yup.string()
      .email(i18n.t('Yup.InvalidEmail'))
      .required(i18n.t('Yup.Required')),
    password: Yup.string()
      .min(4, i18n.t('Yup.InvalidPassword'))
      .required(i18n.t('Yup.Required')),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password')], i18n.t('Yup.PasswordMustMatch'))
      .required(i18n.t('Yup.Required')),
  }).required();

  function handleFormSubmit({ email, password }: FormValues): void {
    navigation.navigate('MotherForm', { email, password });
  }

  return (
    <ScrollView>
      <Header>
        <HeaderText>
          {i18n.t('Auth.SignUpStep', { current: '1', max: '4' })}
        </HeaderText>
        <HeaderSubText>
          <HeaderSubText>{i18n.t('SignUpPage.Header')}</HeaderSubText>
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
                label={i18n.t('Email')}
                error={errors.email}
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder={i18n.t('Email')}
                keyboardType="email-address"
              />

              <FormTextInput
                label={i18n.t('Password')}
                error={errors.password}
                onChangeText={handleChange('password')}
                value={values.password}
                placeholder={i18n.t('Password')}
                secureTextEntry
              />

              <FormTextInput
                label={i18n.t('SignUpPage.ConfirmPassword')}
                error={errors.password_confirmation}
                onChangeText={handleChange('password_confirmation')}
                value={values.password_confirmation}
                placeholder={i18n.t('SignUpPage.ConfirmPassword')}
                secureTextEntry
              />
            </View>

            <SubmitButtonContainer>
              <MainButton
                onPress={handleSubmit}
                disabled={!dirty}
                text={i18n.t('Next')}
              />
            </SubmitButtonContainer>
          </FormContainer>
        )}
      </Formik>
    </ScrollView>
  );
};

export default FormSignUp;
