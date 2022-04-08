import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import * as Yup from 'yup';

import FormDateInput from 'components/FormDateInput';
import FormPickerInput from 'components/FormPickerInput';
import FormRadioGroupInput from 'components/FormRadioGroup';
import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';
import SecondaryButton from 'components/SecondaryButton';
import { Flex, PaddedScrollView } from 'lib/sharedStyles';

import type { AuthRouteProp, AuthStackProps } from 'routes/auth';
import type { MotherSignUpInfo } from 'services/signUp';

import {
  FirstSubOptionContainer,
  FormContainer,
  HeaderSubText,
  HeaderText,
  SubmitButtonContainer,
} from './styles';

interface FormValues {
  birthday: string;
  currentGestationCount: string;
  hasPartner: boolean | undefined;
  birthLocation: string;
  name: string;
}

const MotherForm: React.FC = () => {
  const navigation = useNavigation<AuthStackProps>();
  const { email, password } = useRoute<AuthRouteProp<'MotherForm'>>().params;

  const formInitialValues: FormValues = {
    birthday: '',
    currentGestationCount: '',
    birthLocation: '',
    name: '',
    hasPartner: undefined,
  };

  const motherFormSchema = Yup.object({
    birthday: Yup.string().required(i18n.t('Yup.Required')),
    currentGestationCount: Yup.number()
      .integer(i18n.t('Yup.MustBeIntegerError'))
      .typeError(i18n.t('Yup.MustBeIntegerError'))
      .min(1, i18n.t('Yup.MinEqualError', { num: 1 }))
      .required(i18n.t('Yup.Required')),
    hasPartner: Yup.boolean().required(i18n.t('Yup.Required')),
    birthLocation: Yup.string().required(i18n.t('Yup.Required')),
    name: Yup.string().required(i18n.t('Yup.Required')),
  }).required();

  // Avança para a próxima página passando as informações do usuário.
  function handleFormSubmit(formValues: FormValues): void {
    const motherInfo: MotherSignUpInfo = {
      birthday: formValues.birthday,
      currentGestationCount: Number(formValues.currentGestationCount),
      email,
      hasPartner: formValues.hasPartner!,
      birthLocation: formValues.birthLocation,
      name: formValues.name,
      password,
    };
    navigation.navigate('BabyForm', { motherInfo });
  }

  return (
    <PaddedScrollView>
      <HeaderText>
        {i18n.t('Auth.SignUpStep', { current: '2', max: '4' })}
      </HeaderText>
      <HeaderSubText>{i18n.t('MotherFormPage.HeaderSubText')}</HeaderSubText>
      <Formik
        initialValues={formInitialValues}
        validateOnChange={false}
        validationSchema={motherFormSchema}
        onSubmit={values => handleFormSubmit(values)}>
        {({
          handleChange,
          setFieldValue,
          handleSubmit,
          dirty,
          errors,
          values,
        }) => (
          <FormContainer>
            <FormTextInput
              error={errors.name}
              label={i18n.t('MotherFormPage.Name')}
              placeholder={i18n.t('Name')}
              value={values.name}
              onChangeText={handleChange('name')}
            />

            <FormDateInput
              error={errors.birthday}
              label={i18n.t('MotherFormPage.Birthday')}
              placeholder={i18n.t('MotherFormPage.BirthdayPlaceholder')}
              onChange={handleChange('birthday')}
            />

            <FormRadioGroupInput
              error={errors.hasPartner}
              label={i18n.t('MotherFormPage.Partner')}
              options={[i18n.t('Yes'), i18n.t('No')]}
              onChange={fieldValues =>
                setFieldValue('hasPartner', fieldValues[0] === i18n.t('Yes'))
              }
            />

            <Flex>
              <FormPickerInput
                error={errors.birthLocation}
                label={i18n.t('MotherFormPage.Location')}
                options={[
                  i18n.t('MotherFormPage.LocationOptions.HU'),
                  i18n.t('MotherFormPage.LocationOptions.Maternity'),
                ]}
                onChange={handleChange('birthLocation')}
              />
            </Flex>

            <FormTextInput
              error={errors.currentGestationCount}
              keyboardType="numeric"
              label={i18n.t('MotherFormPage.CurrentGestationCount')}
              placeholder={i18n.t('MotherFormPage.CountPlaceholder')}
              value={values.currentGestationCount}
              onChangeText={handleChange('currentGestationCount')}
            />

            <SubmitButtonContainer>
              <FirstSubOptionContainer>
                <SecondaryButton
                  text={i18n.t('GoBack')}
                  onPress={() => navigation.goBack()}
                />
              </FirstSubOptionContainer>
              <Flex>
                <MainButton
                  disabled={!dirty}
                  text={i18n.t('Next')}
                  onPress={handleSubmit}
                />
              </Flex>
            </SubmitButtonContainer>
          </FormContainer>
        )}
      </Formik>
    </PaddedScrollView>
  );
};

export default MotherForm;
