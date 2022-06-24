import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { View } from 'react-native';
import * as Yup from 'yup';

import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';
import PaddedScrollView from 'components/PaddedScrollView';
import { Flex } from 'lib/sharedStyles';

import type { AuthStackProps } from 'routes/auth';
import type { MotherSignUpInfo } from 'services/signUp';

import {
  Header,
  HeaderSubText,
  HeaderText,
  QuestionContainer,
  SubmitButtonContainer,
} from './styles';

type FilteredMotherValues = Pick<MotherSignUpInfo, 'email' | 'password'>;

interface FormValues extends FilteredMotherValues {
  password_confirmation: FilteredMotherValues['password'];
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
    <PaddedScrollView>
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
        validateOnChange={false}
        validationSchema={signUpSchema}
        onSubmit={values => handleFormSubmit(values)}>
        {({ handleChange, handleSubmit, dirty, errors, values }) => (
          <Flex>
            <View>
              <QuestionContainer>
                <FormTextInput
                  error={errors.email}
                  keyboardType="email-address"
                  label={i18n.t('Email')}
                  placeholder={i18n.t('Email')}
                  value={values.email}
                  onChangeText={handleChange('email')}
                />
              </QuestionContainer>

              <QuestionContainer>
                <FormTextInput
                  error={errors.password}
                  label={i18n.t('Password')}
                  placeholder={i18n.t('Password')}
                  value={values.password}
                  secureTextEntry
                  onChangeText={handleChange('password')}
                />
              </QuestionContainer>
              <QuestionContainer>
                <FormTextInput
                  error={errors.password_confirmation}
                  label={i18n.t('SignUpPage.ConfirmPassword')}
                  placeholder={i18n.t('SignUpPage.ConfirmPassword')}
                  value={values.password_confirmation}
                  secureTextEntry
                  onChangeText={handleChange('password_confirmation')}
                />
              </QuestionContainer>
            </View>

            <SubmitButtonContainer>
              <MainButton
                disabled={!dirty}
                text={i18n.t('Next')}
                onPress={handleSubmit}
              />
            </SubmitButtonContainer>
          </Flex>
        )}
      </Formik>
    </PaddedScrollView>
  );
};

export default FormSignUp;
