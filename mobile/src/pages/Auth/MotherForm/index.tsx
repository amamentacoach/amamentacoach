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
import type { MotherSignUpInfo } from 'services/auth';

import {
  DDDContainer,
  FirstSubOptionContainer,
  FormContainer,
  HeaderSubText,
  HeaderText,
  PhoneInputContainer,
  SubmitButtonContainer,
  SubOptionsContainer,
} from './styles';

interface FormValues {
  name: string;
  birthday: string;
  ddd: string;
  phone: string;
  pregnantCount: string;
  yearsSpentBreastFeeding: string;
  monthsSpentBreastFeeding: string;
  alreadyBreastfeed: boolean | null;
  partner: boolean | null;
  liveTogether: boolean | null;
  partnerTime: string;
  education: string;
  wage: string;
  plannedPregnancy: boolean | null;
  firstVisit: string;
  firstStimulus: string;
  timeFirstStimulus: string;
  childrenAlive: string;
  receivedPreNatalGuidance: boolean | null;
  occupation: boolean | null;
  maternityLeave: boolean | null;
  maternityLeaveCount: string;
}

const MotherForm: React.FC = () => {
  const navigation = useNavigation<AuthStackProps>();
  const { email, password } = useRoute<AuthRouteProp<'MotherForm'>>().params;

  const formInitialValues: FormValues = {
    name: '',
    birthday: '',
    ddd: '',
    phone: '',
    pregnantCount: '',
    yearsSpentBreastFeeding: '',
    monthsSpentBreastFeeding: '',
    alreadyBreastfeed: null,
    partner: null,
    liveTogether: false,
    partnerTime: '',
    education: '',
    wage: '',
    plannedPregnancy: null,
    firstVisit: '',
    firstStimulus: '',
    timeFirstStimulus: '',
    childrenAlive: '',
    receivedPreNatalGuidance: null,
    occupation: null,
    maternityLeave: null,
    maternityLeaveCount: '',
  };

  const motherFormSchema = Yup.object({
    name: Yup.string().required(i18n.t('Yup.Required')),
    birthday: Yup.string().required(i18n.t('Yup.Required')),
    ddd: Yup.number()
      .integer(i18n.t('Yup.MustBeIntegerError'))
      .typeError(i18n.t('Yup.MustBeIntegerError'))
      .min(10, i18n.t('Yup.MinEqualError', { num: 10 }))
      .max(99, i18n.t('Yup.MaxError', { num: 100 }))
      .required(i18n.t('Yup.Required')),
    phone: Yup.number()
      .integer(i18n.t('Yup.MustBeIntegerError'))
      .typeError(i18n.t('Yup.MustBeIntegerError'))
      .required(i18n.t('Yup.Required')),
    alreadyBreastfeed: Yup.boolean()
      .nullable()
      .required(i18n.t('Yup.Required')),
    pregnantCount: Yup.number()
      .integer(i18n.t('Yup.MustBeIntegerError'))
      .typeError(i18n.t('Yup.MustBeIntegerError'))
      .min(0, i18n.t('Yup.MinEqualError', { num: 0 }))
      .required(i18n.t('Yup.Required')),
    yearsSpentBreastFeeding: Yup.number().when('alreadyBreastfeed', {
      is: true,
      then: Yup.number()
        .integer(i18n.t('Yup.MustBeIntegerError'))
        .typeError(i18n.t('Yup.MustBeIntegerError'))
        .min(0, i18n.t('Yup.MinEqualError', { num: 0 }))
        .required(i18n.t('Yup.Required')),
      otherwise: Yup.number(),
    }),
    monthsSpentBreastFeeding: Yup.number().when('alreadyBreastfeed', {
      is: true,
      then: Yup.number()
        .integer(i18n.t('Yup.MustBeIntegerError'))
        .typeError(i18n.t('Yup.MustBeIntegerError'))
        .min(0, i18n.t('Yup.MinEqualError', { num: 0 }))
        .required(i18n.t('Yup.Required')),
      otherwise: Yup.number(),
    }),
    partner: Yup.boolean().nullable().required(i18n.t('Yup.Required')),
    liveTogether: Yup.boolean().nullable().required(i18n.t('Yup.Required')),
    partnerTime: Yup.string().when('liveTogether', {
      is: true,
      then: Yup.string().required(i18n.t('Yup.Required')),
      otherwise: Yup.string(),
    }),
    education: Yup.string().required(i18n.t('Yup.Required')),
    wage: Yup.string().required(i18n.t('Yup.Required')),
    plannedPregnancy: Yup.boolean().nullable().required(i18n.t('Yup.Required')),
    firstVisit: Yup.string().required(i18n.t('Yup.Required')),
    firstStimulus: Yup.string().required(i18n.t('Yup.Required')),
    timeFirstStimulus: Yup.string().required(i18n.t('Yup.Required')),
    childrenAlive: Yup.string().required(i18n.t('Yup.Required')),
    receivedPreNatalGuidance: Yup.boolean()
      .nullable()
      .required(i18n.t('Yup.Required')),
    occupation: Yup.boolean().nullable().required(i18n.t('Yup.Required')),
    maternityLeave: Yup.boolean().nullable().required(i18n.t('Yup.Required')),
    maternityLeaveCount: Yup.number()
      .when('maternityLeave', {
        is: true,
        then: Yup.number().required(i18n.t('Yup.Required')),
        otherwise: Yup.number(),
      })
      .integer(i18n.t('Yup.MustBeIntegerError'))
      .typeError(i18n.t('Yup.MustBeIntegerError'))
      .min(0, i18n.t('Yup.MinEqualError', { num: 0 })),
  }).required();

  // Avança para a próxima página passando as informações do usuário.
  function handleFormSubmit(formValues: FormValues): void {
    const motherInfo: MotherSignUpInfo = {
      email,
      password,
      name: formValues.name,
      birthday: formValues.birthday,
      phone: `${formValues.ddd}${formValues.phone}`,
      alreadyBreastfeed: formValues.alreadyBreastfeed!,
      pregnantCount: parseInt(formValues.pregnantCount, 10),
      timeSpentBreastFeeding: `${formValues.yearsSpentBreastFeeding || '0'},${
        formValues.monthsSpentBreastFeeding || '0'
      }`,
      partner: formValues.partner!,
      liveTogether: formValues.partnerTime || null,
      education: formValues.education,
      wage: formValues.wage,
      plannedPregnancy: formValues.plannedPregnancy!,
      firstVisit: formValues.firstVisit,
      firstStimulus: formValues.firstStimulus,
      timeFirstStimulus: formValues.timeFirstStimulus,
      childrenAlive: formValues.childrenAlive,
      receivedPreNatalGuidance: formValues.receivedPreNatalGuidance!,
      occupation: formValues.occupation!,
      maternityLeave: formValues.maternityLeave
        ? parseInt(formValues.maternityLeaveCount, 10)
        : null,
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
        validationSchema={motherFormSchema}
        validateOnChange={false}
        onSubmit={values => handleFormSubmit(values)}>
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          dirty,
          errors,
          values,
        }) => (
          <FormContainer>
            <FormTextInput
              label={i18n.t('MotherFormPage.Name')}
              error={errors.name}
              onChangeText={handleChange('name')}
              value={values.name}
              placeholder={i18n.t('Name')}
            />

            <FormDateInput
              label={i18n.t('MotherFormPage.Birthday')}
              fieldName="birthday"
              onChange={setFieldValue}
              placeholder={i18n.t('MotherFormPage.BirthdayPlaceholder')}
              error={errors.birthday}
            />

            <SubOptionsContainer>
              <DDDContainer>
                <FormTextInput
                  label={i18n.t('MotherFormPage.DDD')}
                  error={errors.ddd}
                  onChangeText={handleChange('ddd')}
                  value={values.ddd}
                  placeholder={i18n.t('MotherFormPage.DDD')}
                  keyboardType="number-pad"
                  centerText
                />
              </DDDContainer>

              <PhoneInputContainer>
                <FormTextInput
                  label={i18n.t('MotherFormPage.Phone')}
                  error={errors.phone}
                  onChangeText={handleChange('phone')}
                  value={values.phone}
                  placeholder={i18n.t('MotherFormPage.Phone')}
                  keyboardType="phone-pad"
                />
              </PhoneInputContainer>
            </SubOptionsContainer>

            <FormTextInput
              label={i18n.t('MotherFormPage.PregnantCount')}
              value={values.pregnantCount}
              onChangeText={(text: string) => {
                setFieldValue('pregnantCount', text);
                if (text === '') {
                  // Limpa os campos de seleção abaixo
                  setFieldValue('alreadyBreastfeed', false);
                  setFieldValue('yearsSpentBreastFeeding', '0');
                  setFieldValue('monthsSpentBreastFeeding', '0');
                  return;
                }
                if (text === '0') {
                  setFieldValue('alreadyBreastfeed', false);
                }
              }}
              placeholder={i18n.t('MotherFormPage.PregnantCountPlaceholder')}
              keyboardType="numeric"
              error={errors.pregnantCount}
            />

            {values.pregnantCount !== '0' && values.pregnantCount !== '' && (
              <FormRadioGroupInput
                label={i18n.t('MotherFormPage.AlreadyBreastfeed')}
                fieldName="alreadyBreastfeed"
                onChange={(fieldName, fieldValues) =>
                  setFieldValue(fieldName, fieldValues[0] === i18n.t('Yes'))
                }
                options={[i18n.t('Yes'), i18n.t('No')]}
                error={errors.alreadyBreastfeed}
              />
            )}

            {values.alreadyBreastfeed && (
              <SubOptionsContainer>
                <FirstSubOptionContainer>
                  <FormPickerInput
                    label={i18n.t('MotherFormPage.YearsSpentBreastFeeding')}
                    fieldName="yearsSpentBreastFeeding"
                    onChange={(fieldName, fieldValue) =>
                      setFieldValue(fieldName, fieldValue)
                    }
                    error={errors.yearsSpentBreastFeeding}
                    options={[
                      '1',
                      '2',
                      '3',
                      '4',
                      '5',
                      '6',
                      '7',
                      '8',
                      '9',
                      `10 ${i18n.t('OrMore')}`,
                    ]}
                  />
                </FirstSubOptionContainer>
                <Flex>
                  <FormPickerInput
                    label={i18n.t('MotherFormPage.MonthsSpentBreastFeeding')}
                    fieldName="monthsSpentBreastFeeding"
                    onChange={(fieldName, fieldValue) =>
                      setFieldValue(fieldName, fieldValue)
                    }
                    error={errors.monthsSpentBreastFeeding}
                    options={[
                      '1',
                      '2',
                      '3',
                      '4',
                      '5',
                      '6',
                      '7',
                      '8',
                      '9',
                      '10',
                      '11',
                      '12',
                    ]}
                  />
                </Flex>
              </SubOptionsContainer>
            )}

            <FormRadioGroupInput
              label={i18n.t('MotherFormPage.Partner')}
              fieldName="partner"
              onChange={(fieldName: string, fieldValues: string[]) => {
                const hasPartner = fieldValues[0] === i18n.t('Yes');
                setFieldValue(fieldName, hasPartner);

                if (hasPartner) {
                  setFieldValue('liveTogether', null);
                } else {
                  setFieldValue('liveTogether', false);
                  setFieldValue('partnerYears', '0');
                  setFieldValue('partnerMonths', '0');
                }
              }}
              options={[i18n.t('Yes'), i18n.t('No')]}
              error={errors.partner}
            />

            {values.partner && (
              <>
                <FormRadioGroupInput
                  label={i18n.t('MotherFormPage.LiveTogether')}
                  fieldName="liveTogether"
                  onChange={(fieldName: string, fieldValue: string[]) => {
                    const liveTogether = fieldValue[0] === i18n.t('Yes');
                    setFieldValue(fieldName, liveTogether);

                    if (liveTogether) {
                      setFieldValue('partnerYears', '');
                      setFieldValue('partnerMonths', '');
                    } else {
                      setFieldValue('partnerYears', '0');
                      setFieldValue('partnerMonths', '0');
                    }
                  }}
                  options={[i18n.t('Yes'), i18n.t('No')]}
                  error={errors.liveTogether}
                />

                {values.liveTogether && (
                  <Flex>
                    <FormPickerInput
                      label={i18n.t('MotherFormPage.PartnerTime')}
                      fieldName="partnerTime"
                      onChange={setFieldValue}
                      error={errors.partnerTime}
                      options={[
                        i18n.t('MotherFormPage.LiveTogetherOptions.Option1'),
                        i18n.t('MotherFormPage.LiveTogetherOptions.Option2'),
                        i18n.t('MotherFormPage.LiveTogetherOptions.Option3'),
                      ]}
                    />
                  </Flex>
                )}
              </>
            )}

            <Flex>
              <FormPickerInput
                label={i18n.t('MotherFormPage.Education')}
                fieldName="education"
                onChange={setFieldValue}
                error={errors.education}
                options={[
                  i18n.t('MotherFormPage.EducationOptions.Option1'),
                  i18n.t('MotherFormPage.EducationOptions.Option2'),
                  i18n.t('MotherFormPage.EducationOptions.Option3'),
                  i18n.t('MotherFormPage.EducationOptions.Option4'),
                  i18n.t('MotherFormPage.EducationOptions.Option5'),
                  i18n.t('MotherFormPage.EducationOptions.Option6'),
                ]}
              />
            </Flex>

            <Flex>
              <FormPickerInput
                label={i18n.t('MotherFormPage.Wage')}
                fieldName="wage"
                onChange={setFieldValue}
                error={errors.wage}
                options={[
                  i18n.t('MotherFormPage.WageOptions.Option1'),
                  i18n.t('MotherFormPage.WageOptions.Option2'),
                  i18n.t('MotherFormPage.WageOptions.Option3'),
                ]}
              />
            </Flex>

            <Flex>
              <FormPickerInput
                label={i18n.t('MotherFormPage.PlannedPregnancy')}
                fieldName="plannedPregnancy"
                onChange={(fieldName, fieldValue) =>
                  setFieldValue(fieldName, fieldValue === i18n.t('Yes'))
                }
                error={errors.plannedPregnancy}
                options={[i18n.t('Yes'), i18n.t('No')]}
              />
            </Flex>

            <Flex>
              <FormPickerInput
                label={i18n.t('MotherFormPage.FirstVisit')}
                fieldName="firstVisit"
                onChange={setFieldValue}
                error={errors.firstVisit}
                options={[
                  i18n.t('MotherFormPage.FirstVisitOptions.Option1'),
                  i18n.t('MotherFormPage.FirstVisitOptions.Option2'),
                  i18n.t('MotherFormPage.FirstVisitOptions.Option3'),
                  i18n.t('MotherFormPage.FirstVisitOptions.Option4'),
                ]}
              />
            </Flex>

            <Flex>
              <FormPickerInput
                label={i18n.t('MotherFormPage.FirstStimulus')}
                fieldName="firstStimulus"
                onChange={setFieldValue}
                error={errors.firstStimulus}
                options={[
                  i18n.t('MotherFormPage.FirstStimulusOptions.Option1'),
                  i18n.t('MotherFormPage.FirstStimulusOptions.Option2'),
                  i18n.t('MotherFormPage.FirstStimulusOptions.Option3'),
                ]}
              />
            </Flex>

            <Flex>
              <FormPickerInput
                label={i18n.t('MotherFormPage.TimeFirstStimulus')}
                fieldName="timeFirstStimulus"
                onChange={setFieldValue}
                error={errors.timeFirstStimulus}
                options={[
                  i18n.t('MotherFormPage.TimeFirstStimulusOptions.Option1'),
                  i18n.t('MotherFormPage.TimeFirstStimulusOptions.Option2'),
                  i18n.t('MotherFormPage.TimeFirstStimulusOptions.Option3'),
                  i18n.t('MotherFormPage.TimeFirstStimulusOptions.Option4'),
                  i18n.t('MotherFormPage.TimeFirstStimulusOptions.Option5'),
                  i18n.t('MotherFormPage.TimeFirstStimulusOptions.Option6'),
                ]}
              />
            </Flex>

            <Flex>
              <FormPickerInput
                label={i18n.t('MotherFormPage.ChildrenAlive')}
                fieldName="childrenAlive"
                onChange={setFieldValue}
                error={errors.childrenAlive}
                options={[
                  i18n.t('MotherFormPage.ChildrenAliveOptions.Option1'),
                  i18n.t('MotherFormPage.ChildrenAliveOptions.Option2'),
                  i18n.t('MotherFormPage.ChildrenAliveOptions.Option3'),
                ]}
              />
            </Flex>

            <Flex>
              <FormPickerInput
                label={i18n.t('MotherFormPage.ReceivedPreNatalGuidance')}
                fieldName="receivedPreNatalGuidance"
                onChange={(fieldName, fieldValue) =>
                  setFieldValue(fieldName, fieldValue === i18n.t('Yes'))
                }
                error={errors.receivedPreNatalGuidance}
                options={[i18n.t('Yes'), i18n.t('No')]}
              />
            </Flex>

            <Flex>
              <FormPickerInput
                label={i18n.t('MotherFormPage.Occupation')}
                fieldName="occupation"
                onChange={(fieldName, fieldValue) =>
                  setFieldValue(
                    fieldName,
                    fieldValue ===
                      i18n.t('MotherFormPage.OccupationOptions.Option2'),
                  )
                }
                error={errors.occupation}
                options={[
                  i18n.t('MotherFormPage.OccupationOptions.Option1'),
                  i18n.t('MotherFormPage.OccupationOptions.Option2'),
                ]}
              />
            </Flex>

            <Flex>
              <FormPickerInput
                label={i18n.t('MotherFormPage.MaternityLeave')}
                fieldName="maternityLeave"
                onChange={(fieldName, fieldValue) =>
                  setFieldValue(fieldName, fieldValue === i18n.t('Yes'))
                }
                error={errors.maternityLeave}
                options={[i18n.t('Yes'), i18n.t('No')]}
              />
            </Flex>

            {values.maternityLeave && (
              <Flex>
                <FormTextInput
                  label={i18n.t('MotherFormPage.MaternityLeaveCount')}
                  placeholder={i18n.t(
                    'MotherFormPage.MaternityLeaveCountPlaceholder',
                  )}
                  onChangeText={handleChange('maternityLeaveCount')}
                  value={values.maternityLeaveCount}
                  error={errors.maternityLeaveCount}
                  keyboardType="number-pad"
                />
              </Flex>
            )}

            <SubmitButtonContainer>
              <FirstSubOptionContainer>
                <SecondaryButton
                  onPress={() => navigation.goBack()}
                  text={i18n.t('GoBack')}
                />
              </FirstSubOptionContainer>
              <Flex>
                <MainButton
                  onPress={handleSubmit}
                  disabled={!dirty}
                  text={i18n.t('Next')}
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
