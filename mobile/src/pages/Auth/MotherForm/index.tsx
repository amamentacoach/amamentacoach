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
import { Flex, Row, Spacer } from 'lib/sharedStyles';
import { getCountryStates } from 'utils/localize';

import type { AuthRouteProp, AuthStackProps } from 'routes/auth';

import {
  HeaderText,
  QuestionContainer,
  StatePicker,
  StateQuestion,
  SubmitButtonContainer,
} from './styles';

interface FormValues {
  birthDate?: Date;
  birthday?: Date;
  birthWeeks: string;
  city: string;
  currentGestationCount: string;
  hasPartner?: boolean;
  name: string;
  institution: string;
  phone: string;
  possibleBirthDate?: Date;
  socialMedia: string;
  state: string;
  userType: string;
  weeksPregnant: string;
}

const MotherForm: React.FC = () => {
  const navigation = useNavigation<AuthStackProps>();
  const { email, password } = useRoute<AuthRouteProp<'MotherForm'>>().params;

  const availableStates = getCountryStates();
  const formInitialValues: FormValues = {
    birthday: undefined,
    currentGestationCount: '',
    name: '',
    hasPartner: undefined,
    phone: '',
    userType: '',
    institution: '',
    socialMedia: '',
    weeksPregnant: '',
    possibleBirthDate: undefined,
    birthWeeks: '',
    birthDate: undefined,
    city: '',
    state: '',
  };

  function requiredWhen<T extends Yup.BaseSchema>(
    field: string,
    condition: string,
    schema: T,
  ): T {
    return schema.when(field, {
      is: condition,
      then: schema.required(i18n.t('Yup.Required')),
      otherwise: schema,
    });
  }

  const formSchema = Yup.object({
    name: Yup.string().required(i18n.t('Yup.Required')),
    birthday: Yup.date().required(i18n.t('Yup.Required')),
    phone: Yup.string()
      .required(i18n.t('Yup.Required'))
      .phone(getCountry(), true, i18n.t('Yup.Phone')),
    userType: Yup.string().required(i18n.t('Yup.Required')),
    socialMedia: requiredWhen(
      'institution',
      i18n.t('MotherFormPage.InstitutionOptions.SocialMedia'),
      Yup.string(),
    ),
    // Caso seja gestante.
    weeksPregnant: requiredWhen(
      'userType',
      i18n.t('MotherFormPage.UserTypeOptions.Pregnant'),
      Yup.number(),
    ).min(0, i18n.t('Yup.MinError', { num: 0 })),
    possibleBirthDate: requiredWhen(
      'userType',
      i18n.t('MotherFormPage.UserTypeOptions.Pregnant'),
      Yup.date(),
    ),
    // Caso seja mãe de prematuro.
    birthWeeks: requiredWhen(
      'userType',
      i18n.t('MotherFormPage.UserTypeOptions.Mother'),
      Yup.string(),
    ),
    birthDate: requiredWhen(
      'userType',
      i18n.t('MotherFormPage.UserTypeOptions.Mother'),
      Yup.string(),
    ),
    city: requiredWhen(
      'userType',
      i18n.t('MotherFormPage.UserTypeOptions.Mother'),
      Yup.string(),
    ),
    currentGestationCount: Yup.number().when('userType', {
      is: i18n.t('MotherFormPage.UserTypeOptions.Mother'),
      then: Yup.number()
        .integer(i18n.t('Yup.MustBeIntegerError'))
        .typeError(i18n.t('Yup.MustBeIntegerError'))
        .min(1, i18n.t('Yup.MinEqualError', { num: 1 }))
        .required(i18n.t('Yup.Required')),
      otherwise: Yup.number(),
    }),
    hasPartner: requiredWhen(
      'userType',
      i18n.t('MotherFormPage.UserTypeOptions.Mother'),
      Yup.boolean(),
    ),
    state: requiredWhen(
      'userType',
      i18n.t('MotherFormPage.UserTypeOptions.Mother'),
      Yup.string(),
    ),
  }).required();

  // Avança para a próxima página passando as informações do usuário.
  function handleFormSubmit(formValues: FormValues): void {
    const userInfo = {
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
      babies: [],
    };
    if (userInfo.userType === i18n.t('MotherFormPage.UserTypeOptions.Mother')) {
      navigation.navigate('BabyForm', { userInfo });
    } else {
      navigation.navigate('AcceptTermsOfService', {
        userInfo,
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
            <QuestionContainer>
              <FormTextInput
                error={errors.name}
                label={i18n.t('MotherFormPage.Name')}
                placeholder={i18n.t('Name')}
                value={values.name}
                onChangeText={handleChange('name')}
              />
            </QuestionContainer>

            <QuestionContainer>
              <FormTextInput
                error={errors.phone}
                keyboardType="phone-pad"
                label={i18n.t('MotherFormPage.Phone')}
                placeholder={i18n.t('MotherFormPage.Phone')}
                value={values.phone}
                onChangeText={handleChange('phone')}
              />
            </QuestionContainer>

            <QuestionContainer>
              <FormDateInput
                error={errors.birthday}
                label={i18n.t('MotherFormPage.Birthday')}
                maxDate={new Date()}
                placeholder={i18n.t('MotherFormPage.BirthdayPlaceholder')}
                onChange={date => setFieldValue('birthday', date)}
              />
            </QuestionContainer>

            <QuestionContainer>
              <FormPickerInput
                error={errors.institution}
                label={i18n.t('MotherFormPage.Institution')}
                options={[
                  i18n.t('MotherFormPage.InstitutionOptions.HU'),
                  i18n.t('MotherFormPage.InstitutionOptions.HMDI'),
                  i18n.t('MotherFormPage.InstitutionOptions.AHC'),
                  i18n.t('MotherFormPage.InstitutionOptions.SocialMedia'),
                ]}
                onChange={handleChange('institution')}
              />
            </QuestionContainer>

            {values.institution ===
              i18n.t('MotherFormPage.InstitutionOptions.SocialMedia') && (
              <QuestionContainer>
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
              </QuestionContainer>
            )}

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

            {values.userType ===
              i18n.t('MotherFormPage.UserTypeOptions.Mother') && (
              <>
                <QuestionContainer>
                  <FormTextInput
                    error={errors.birthWeeks}
                    keyboardType="numeric"
                    label={i18n.t('MotherFormPage.BirthWeeks')}
                    placeholder={i18n.t('Week', { count: 2 })}
                    value={values.birthWeeks}
                    onChangeText={handleChange('birthWeeks')}
                  />
                </QuestionContainer>

                <QuestionContainer>
                  <FormDateInput
                    error={errors.birthDate}
                    label={i18n.t('MotherFormPage.BirthDate')}
                    maxDate={new Date()}
                    placeholder={i18n.t('MotherFormPage.Placeholder.BirthDate')}
                    onChange={date => setFieldValue('birthDate', date)}
                  />
                </QuestionContainer>

                <QuestionContainer>
                  <StateQuestion>
                    {i18n.t('MotherFormPage.BirthCityStateHeader')}
                  </StateQuestion>
                  <Row>
                    <Flex>
                      <FormTextInput
                        error={errors.city}
                        label={i18n.t('City')}
                        placeholder={i18n.t('City')}
                        onChangeText={handleChange('city')}
                      />
                    </Flex>
                    {availableStates.length > 0 && (
                      <>
                        <Spacer width={4} />
                        <Flex>
                          <StatePicker
                            error={errors.state}
                            label={i18n.t('State')}
                            options={availableStates}
                            onChange={handleChange('state')}
                          />
                        </Flex>
                      </>
                    )}
                  </Row>
                </QuestionContainer>

                <FormRadioGroupInput
                  error={errors.hasPartner}
                  label={i18n.t('MotherFormPage.Partner')}
                  options={[i18n.t('Yes'), i18n.t('No')]}
                  onChange={fieldValues => {
                    let value;
                    if (fieldValues[0]) {
                      value = fieldValues[0] === i18n.t('Yes');
                    }
                    setFieldValue('hasPartner', value);
                  }}
                />
                <QuestionContainer>
                  <FormTextInput
                    error={errors.currentGestationCount}
                    keyboardType="numeric"
                    label={i18n.t('MotherFormPage.CurrentGestationCount')}
                    placeholder={i18n.t('MotherFormPage.CountPlaceholder')}
                    value={values.currentGestationCount}
                    onChangeText={handleChange('currentGestationCount')}
                  />
                </QuestionContainer>
              </>
            )}

            {values.userType ===
              i18n.t('MotherFormPage.UserTypeOptions.Pregnant') && (
              <>
                <FormTextInput
                  error={errors.weeksPregnant}
                  keyboardType="numeric"
                  label={i18n.t('MotherFormPage.WeeksPregnant')}
                  placeholder={i18n.t('Week', { count: 2 })}
                  value={values.weeksPregnant}
                  onChangeText={handleChange('weeksPregnant')}
                />

                <FormDateInput
                  error={errors.possibleBirthDate}
                  label={i18n.t('MotherFormPage.PossibleBirthDate')}
                  minDate={new Date()}
                  placeholder={i18n.t('Date')}
                  onChange={date => setFieldValue('possibleBirthDate', date)}
                />
              </>
            )}

            <SubmitButtonContainer>
              <Flex>
                <SecondaryButton
                  text={i18n.t('GoBack')}
                  onPress={() => navigation.goBack()}
                />
              </Flex>
              <Spacer width={4} />
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
