import 'yup-phone';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { getCountry } from 'react-native-localize';
import * as Yup from 'yup';

import FormDateInput from 'components/FormDateInput';
import FormPickerInput from 'components/FormPickerInput';
import FormRadioGroupInput from 'components/FormRadioGroup';
import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';
import PaddedScrollView from 'components/PaddedScrollView';
import SecondaryButton from 'components/SecondaryButton';
import { Flex } from 'lib/sharedStyles';

import type { AuthRouteProp, AuthStackProps } from 'routes/auth';

import {
  FirstSubOptionContainer,
  HeaderText,
  SubmitButtonContainer,
} from './styles';

interface FormValues {
  birthday?: Date;
  currentGestationCount: string;
  hasPartner?: boolean;
  birthLocation: string;
  name: string;
  phone: string;
  userType: string;
  socialMedia: string;
  origin: string;
  weeksPregnant: string;
  possibleBirthDate?: Date;
  birthWeeks: string;
  birthDate?: Date;
}

const MotherForm: React.FC = () => {
  const navigation = useNavigation<AuthStackProps>();
  const { email, password } = useRoute<AuthRouteProp<'MotherForm'>>().params;

  const formInitialValues: FormValues = {
    birthday: undefined,
    currentGestationCount: '',
    birthLocation: '',
    name: '',
    hasPartner: undefined,
    phone: '',
    userType: '',
    origin: '',
    socialMedia: '',
    weeksPregnant: '',
    possibleBirthDate: undefined,
    birthWeeks: '',
    birthDate: undefined,
  };

  const formSchema = Yup.object({
    name: Yup.string().required(i18n.t('Yup.Required')),
    birthday: Yup.date().required(i18n.t('Yup.Required')),
    phone: Yup.string()
      .required(i18n.t('Yup.Required'))
      .phone(getCountry(), true, i18n.t('Yup.Phone')),
    userType: Yup.string().required(i18n.t('Yup.Required')),
    origin: Yup.string().required(i18n.t('Yup.Required')),
    socialMedia: Yup.string().when('origin', {
      is: i18n.t('MotherFormPage.OriginOptions.SocialMedia'),
      then: Yup.string().required(i18n.t('Yup.Required')),
      otherwise: Yup.string(),
    }),
    // Caso seja gestante.
    weeksPregnant: Yup.number()
      .min(0, i18n.t('Yup.MinError', { num: 0 }))
      .when('userType', {
        is: i18n.t('MotherFormPage.UserTypeOptions.Pregnant'),
        then: Yup.number().required(i18n.t('Yup.Required')),
        otherwise: Yup.number(),
      }),
    possibleBirthDate: Yup.date().when('userType', {
      is: i18n.t('MotherFormPage.UserTypeOptions.Pregnant'),
      then: Yup.date().required(i18n.t('Yup.Required')),
      otherwise: Yup.date(),
    }),
    // Caso seja mãe de prematuro.
    birthWeeks: Yup.string().when('userType', {
      is: i18n.t('MotherFormPage.UserTypeOptions.Mother'),
      then: Yup.string().required(i18n.t('Yup.Required')),
      otherwise: Yup.string(),
    }),
    birthDate: Yup.string().when('userType', {
      is: i18n.t('MotherFormPage.UserTypeOptions.Mother'),
      then: Yup.string().required(i18n.t('Yup.Required')),
      otherwise: Yup.string(),
    }),
    currentGestationCount: Yup.number().when('userType', {
      is: i18n.t('MotherFormPage.UserTypeOptions.Mother'),
      then: Yup.number()
        .integer(i18n.t('Yup.MustBeIntegerError'))
        .typeError(i18n.t('Yup.MustBeIntegerError'))
        .min(1, i18n.t('Yup.MinEqualError', { num: 1 }))
        .required(i18n.t('Yup.Required')),
      otherwise: Yup.number(),
    }),
    hasPartner: Yup.boolean().when('userType', {
      is: i18n.t('MotherFormPage.UserTypeOptions.Mother'),
      then: Yup.boolean().required(i18n.t('Yup.Required')),
      otherwise: Yup.boolean(),
    }),
    birthLocation: Yup.string().when('userType', {
      is: i18n.t('MotherFormPage.UserTypeOptions.Mother'),
      then: Yup.string().required(i18n.t('Yup.Required')),
      otherwise: Yup.string(),
    }),
  }).required();

  // Avança para a próxima página passando as informações do usuário.
  function handleFormSubmit(formValues: FormValues): void {
    const motherInfo = {
      ...formValues,
      birthday: formValues.birthday!.toISOString(),
      possibleBirthDate: formValues.possibleBirthDate
        ? formValues.possibleBirthDate.toISOString()
        : null,
      birthDate: formValues.birthDate
        ? formValues.birthDate.toISOString()
        : null,
      currentGestationCount: Number(formValues.currentGestationCount),
      hasPartner: formValues.hasPartner!,
      email,
      password,
    };
    if (
      motherInfo.userType === i18n.t('MotherFormPage.UserTypeOptions.Mother')
    ) {
      navigation.navigate('BabyForm', { motherInfo });
    } else {
      navigation.navigate('AcceptTermsOfService', {
        motherInfo,
        babiesInfo: [],
      });
    }
  }

  return (
    <PaddedScrollView>
      <HeaderText>
        {i18n.t('Auth.SignUpStep', { current: '2', max: '4' })}
      </HeaderText>
      <Formik
        initialValues={formInitialValues}
        validateOnChange={false}
        validationSchema={formSchema}
        onSubmit={values => handleFormSubmit(values)}>
        {({
          handleChange,
          setFieldValue,
          handleSubmit,
          dirty,
          errors,
          values,
        }) => (
          <Flex>
            <FormTextInput
              error={errors.name}
              label={i18n.t('MotherFormPage.Name')}
              placeholder={i18n.t('Name')}
              value={values.name}
              onChangeText={handleChange('name')}
            />

            <FormTextInput
              error={errors.phone}
              keyboardType="phone-pad"
              label={i18n.t('MotherFormPage.Phone')}
              placeholder={i18n.t('MotherFormPage.Phone')}
              value={values.phone}
              onChangeText={handleChange('phone')}
            />

            <FormDateInput
              error={errors.birthday}
              label={i18n.t('MotherFormPage.Birthday')}
              placeholder={i18n.t('MotherFormPage.BirthdayPlaceholder')}
              onChange={date => setFieldValue('birthday', date)}
            />

            <Flex>
              <FormPickerInput
                error={errors.origin}
                label={i18n.t('MotherFormPage.Origin')}
                options={[
                  i18n.t('MotherFormPage.OriginOptions.HU'),
                  i18n.t('MotherFormPage.OriginOptions.HMDI'),
                  i18n.t('MotherFormPage.OriginOptions.AHC'),
                  i18n.t('MotherFormPage.OriginOptions.SocialMedia'),
                ]}
                onChange={handleChange('origin')}
              />
            </Flex>

            {values.origin ===
              i18n.t('MotherFormPage.OriginOptions.SocialMedia') && (
              <FormPickerInput
                error={errors.socialMedia}
                label={i18n.t('MotherFormPage.SocialMedia')}
                options={[
                  'Facebook',
                  'Instagram',
                  'Whatsapp',
                  i18n.t('MotherFormPage.SocialMediaOptions.TVOrRadio'),
                  'Folder',
                  i18n.t('Other'),
                ]}
                onChange={handleChange('socialMedia')}
              />
            )}

            <Flex>
              <FormPickerInput
                error={errors.userType}
                label={i18n.t('MotherFormPage.UserType')}
                options={[
                  i18n.t('MotherFormPage.UserTypeOptions.Pregnant'),
                  i18n.t('MotherFormPage.UserTypeOptions.Mother'),
                  i18n.t('MotherFormPage.UserTypeOptions.HealthcareWorker'),
                  i18n.t('Other'),
                ]}
                onChange={newValue => {
                  setFieldValue('userType', newValue);
                  if (newValue !== values.userType) {
                    setFieldValue('hasPartner', '');
                    setFieldValue('location', '');
                    setFieldValue('currentGestationCount', '');
                    setFieldValue('weeksPregnant', '');
                    setFieldValue('possibleBirthDate', '');
                  }
                }}
              />
            </Flex>

            {values.userType ===
              i18n.t('MotherFormPage.UserTypeOptions.Mother') && (
              <>
                <FormTextInput
                  error={errors.birthWeeks}
                  keyboardType="numeric"
                  // TODO
                  label="Seu parto ocorreu com quantas semanas de gestação?"
                  placeholder={i18n.t('Week', { count: 2 })}
                  value={values.birthWeeks}
                  onChangeText={handleChange('birthWeeks')}
                />
                <FormDateInput
                  error={errors.birthDate}
                  // TODO Mover para a página da mãe.
                  label={i18n.t('BabyFormPage.BirthDate')}
                  // TODO Mover para a página da mãe.
                  placeholder={i18n.t('BabyFormPage.Placeholder.BirthDate')}
                  onChange={date => setFieldValue('birthDate', date)}
                />
                <FormRadioGroupInput
                  error={errors.hasPartner}
                  label={i18n.t('MotherFormPage.Partner')}
                  options={[i18n.t('Yes'), i18n.t('No')]}
                  onChange={fieldValues =>
                    setFieldValue(
                      'hasPartner',
                      fieldValues[0] === i18n.t('Yes'),
                    )
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
              </>
            )}

            {values.userType ===
              i18n.t('MotherFormPage.UserTypeOptions.Pregnant') && (
              <>
                <FormTextInput
                  error={errors.weeksPregnant}
                  keyboardType="numeric"
                  // TODO
                  label="De quantas semanas está gestante?"
                  placeholder={i18n.t('Week', { count: 2 })}
                  value={values.weeksPregnant}
                  onChangeText={handleChange('weeksPregnant')}
                />

                <FormDateInput
                  error={errors.possibleBirthDate}
                  label={i18n.t('MotherFormPage.PossibleBirthDate')}
                  placeholder={i18n.t('Date')}
                  onChange={date => setFieldValue('possibleBirthDate', date)}
                />
              </>
            )}

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
          </Flex>
        )}
      </Formik>
    </PaddedScrollView>
  );
};

export default MotherForm;
