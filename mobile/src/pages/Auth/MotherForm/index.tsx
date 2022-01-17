import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { getCountry } from 'react-native-localize';
import * as Yup from 'yup';

import 'yup-phone';
import FormDateInput from 'components/FormDateInput';
import FormPickerInput from 'components/FormPickerInput';
import FormRadioGroupInput from 'components/FormRadioGroup';
import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';
import SecondaryButton from 'components/SecondaryButton';
import { Flex, OpenSansRegular, PaddedScrollView, Row } from 'lib/sharedStyles';

import type { AuthRouteProp, AuthStackProps } from 'routes/auth';
import type { MotherSignUpInfo } from 'services/auth';

import {
  FirstSubOptionContainer,
  FormContainer,
  HeaderSubText,
  HeaderText,
  SubmitButtonContainer,
} from './styles';

interface TimeSpentBreastFeeding {
  months: string;
  years: string;
}

interface FormValues {
  abortionCount: string;
  alreadyBreastfeed?: boolean;
  birthday: string;
  childrenAlive: string;
  currentGestationCount: string;
  education: string;
  hadPreNatalCheckups?: boolean;
  hasMaternityLeave?: boolean;
  hasPartner?: boolean;
  livesTogetherWithPartner?: boolean;
  location: string;
  maternityLeave: string;
  name: string;
  occupation?: boolean;
  phone1: string;
  phone2: string;
  plannedPregnancy?: boolean;
  pregnantCount: string;
  preNatalCheckupCount: string;
  problemsDuringPregnancy: string;
  receivedBreastfeedingGuidance?: boolean;
  timeLivingWithPartner: string | null;
  timeSpentBreastFeeding: TimeSpentBreastFeeding[];
  wage: string;
}

const MotherForm: React.FC = () => {
  const navigation = useNavigation<AuthStackProps>();
  const { email, password } = useRoute<AuthRouteProp<'MotherForm'>>().params;

  const formInitialValues: FormValues = {
    abortionCount: '',
    alreadyBreastfeed: undefined,
    birthday: '',
    childrenAlive: '',
    currentGestationCount: '',
    education: '',
    hadPreNatalCheckups: undefined,
    preNatalCheckupCount: '',
    hasMaternityLeave: undefined,
    livesTogetherWithPartner: undefined,
    timeLivingWithPartner: '',
    location: '',
    maternityLeave: '',
    name: '',
    occupation: undefined,
    hasPartner: undefined,
    phone1: '',
    phone2: '',
    plannedPregnancy: undefined,
    pregnantCount: '',
    receivedBreastfeedingGuidance: undefined,
    problemsDuringPregnancy: '',
    wage: '',
    timeSpentBreastFeeding: [],
  };

  const motherFormSchema = Yup.object({
    abortionCount: Yup.number()
      .integer(i18n.t('Yup.MustBeIntegerError'))
      .typeError(i18n.t('Yup.MustBeIntegerError'))
      .min(0, i18n.t('Yup.MinEqualError', { num: 0 }))
      .max(Yup.ref('pregnantCount'), obj =>
        i18n.t('Yup.MaxEqualError', { num: obj.max }),
      )
      .required(i18n.t('Yup.Required')),
    alreadyBreastfeed: Yup.boolean().required(i18n.t('Yup.Required')),
    birthday: Yup.string().required(i18n.t('Yup.Required')),
    childrenAlive: Yup.string().required(i18n.t('Yup.Required')),
    currentGestationCount: Yup.number()
      .integer(i18n.t('Yup.MustBeIntegerError'))
      .typeError(i18n.t('Yup.MustBeIntegerError'))
      .min(1, i18n.t('Yup.MinEqualError', { num: 1 }))
      .required(i18n.t('Yup.Required')),
    education: Yup.string().required(i18n.t('Yup.Required')),
    hasPartner: Yup.boolean().required(i18n.t('Yup.Required')),
    hadPreNatalCheckups: Yup.boolean().required(i18n.t('Yup.Required')),
    hasMaternityLeave: Yup.boolean().required(i18n.t('Yup.Required')),
    livesTogetherWithPartner: Yup.boolean().when('hasPartner', {
      is: true,
      then: Yup.boolean().required(i18n.t('Yup.Required')),
      otherwise: Yup.boolean(),
    }),
    timeLivingWithPartner: Yup.string().when('livesTogetherWithPartner', {
      is: true,
      then: Yup.string().required(i18n.t('Yup.Required')),
      otherwise: Yup.string(),
    }),
    location: Yup.string().required(i18n.t('Yup.Required')),
    maternityLeave: Yup.number().when('hasMaternityLeave', {
      is: true,
      then: Yup.number()
        .required(i18n.t('Yup.Required'))
        .integer(i18n.t('Yup.MustBeIntegerError'))
        .typeError(i18n.t('Yup.MustBeIntegerError'))
        .min(0, i18n.t('Yup.MinEqualError', { num: 0 })),
      otherwise: Yup.number()
        .integer(i18n.t('Yup.MustBeIntegerError'))
        .typeError(i18n.t('Yup.MustBeIntegerError')),
    }),
    name: Yup.string().required(i18n.t('Yup.Required')),
    occupation: Yup.boolean().required(i18n.t('Yup.Required')),
    phone1: Yup.string()
      .required(i18n.t('Yup.Required'))
      .phone(getCountry(), true, i18n.t('MotherFormPage.Yup.Phone')),
    phone2: Yup.string()
      .required(i18n.t('Yup.Required'))
      .notOneOf([Yup.ref('phone1')], i18n.t('MotherFormPage.Yup.RepeatedPhone'))
      .phone(getCountry(), true, i18n.t('MotherFormPage.Yup.Phone')),
    plannedPregnancy: Yup.boolean().required(i18n.t('Yup.Required')),
    pregnantCount: Yup.number()
      .integer(i18n.t('Yup.MustBeIntegerError'))
      .typeError(i18n.t('Yup.MustBeIntegerError'))
      .min(0, i18n.t('Yup.MinEqualError', { num: 0 }))
      .required(i18n.t('Yup.Required')),
    preNatalCheckupCount: Yup.string().when('hadPreNatalCheckups', {
      is: true,
      then: Yup.string().required(i18n.t('Yup.Required')),
      otherwise: Yup.string(),
    }),
    problemsDuringPregnancy: Yup.string().required(i18n.t('Yup.Required')),
    receivedBreastfeedingGuidance: Yup.boolean().required(
      i18n.t('Yup.Required'),
    ),
    wage: Yup.string().required(i18n.t('Yup.Required')),
    timeSpentBreastFeeding: Yup.array().of(
      Yup.object()
        .shape({
          months: Yup.string().required(i18n.t('Yup.Required')),
          years: Yup.string().required(i18n.t('Yup.Required')),
        })
        .required(i18n.t('Yup.Required')),
    ),
  }).required();

  // Avança para a próxima página passando as informações do usuário.
  function handleFormSubmit(formValues: FormValues): void {
    const motherInfo: MotherSignUpInfo = {
      abortionCount: Number(formValues.abortionCount),
      alreadyBreastfeed: formValues.alreadyBreastfeed!,
      birthday: formValues.birthday,
      childrenAlive: formValues.childrenAlive,
      currentGestationCount: Number(formValues.currentGestationCount),
      education: formValues.education,
      email,
      hasPartner: formValues.hasPartner!,
      location: formValues.location,
      maternityLeave: formValues.hasMaternityLeave
        ? Number(formValues.maternityLeave)
        : null,
      name: formValues.name,
      occupation: formValues.occupation!,
      password,
      phone1: formValues.phone1,
      phone2: formValues.phone2,
      plannedPregnancy: formValues.plannedPregnancy!,
      pregnantCount: Number(formValues.pregnantCount),
      preNatalCheckupCount: formValues.preNatalCheckupCount,
      problemsDuringPregnancy: formValues.problemsDuringPregnancy,
      receivedBreastfeedingGuidance: formValues.receivedBreastfeedingGuidance!,
      timeLivingWithPartner: formValues.timeLivingWithPartner || null,
      timeSpentBreastFeeding: formValues.timeSpentBreastFeeding.map(
        ({ months, years }) => `${years},${months}`,
      ),
      wage: formValues.wage,
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
          handleSubmit,
          setFieldValue,
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
              fieldName="birthday"
              label={i18n.t('MotherFormPage.Birthday')}
              placeholder={i18n.t('MotherFormPage.BirthdayPlaceholder')}
              onChange={setFieldValue}
            />

            <FormTextInput
              error={errors.phone1}
              keyboardType="phone-pad"
              label={i18n.t('MotherFormPage.Phone', { num: 1 })}
              placeholder={i18n.t('MotherFormPage.Phone', { num: 1 })}
              value={values.phone1}
              onChangeText={handleChange('phone1')}
            />

            <FormTextInput
              error={errors.phone2}
              keyboardType="phone-pad"
              label={i18n.t('MotherFormPage.Phone', { num: 2 })}
              placeholder={i18n.t('MotherFormPage.Phone', { num: 2 })}
              value={values.phone2}
              onChangeText={handleChange('phone2')}
            />

            <FormTextInput
              error={errors.pregnantCount}
              keyboardType="numeric"
              label={i18n.t('MotherFormPage.PregnantCount')}
              placeholder={i18n.t('MotherFormPage.CountPlaceholder')}
              value={values.pregnantCount}
              onChangeText={(text: string) => {
                setFieldValue('pregnantCount', text);
                setFieldValue('alreadyBreastfeed', undefined);
                setFieldValue('timeSpentBreastFeeding', []);
              }}
            />

            <FormTextInput
              error={errors.abortionCount}
              keyboardType="numeric"
              label={i18n.t('MotherFormPage.AbortionCount')}
              placeholder={i18n.t('MotherFormPage.CountPlaceholder')}
              value={values.abortionCount}
              onChangeText={(text: string) => {
                setFieldValue('abortionCount', text);
                setFieldValue('alreadyBreastfeed', undefined);
                setFieldValue('timeSpentBreastFeeding', []);
              }}
            />

            <Flex>
              <FormPickerInput
                error={errors.childrenAlive}
                fieldName="childrenAlive"
                label={i18n.t('MotherFormPage.ChildrenAlive')}
                options={[
                  i18n.t('MotherFormPage.ChildrenAliveOptions.Option1'),
                  i18n.t('MotherFormPage.ChildrenAliveOptions.Option2'),
                  i18n.t('MotherFormPage.ChildrenAliveOptions.Option3'),
                ]}
                onChange={setFieldValue}
              />
            </Flex>

            {Number(values.pregnantCount) > 0 && (
              <FormRadioGroupInput
                error={errors.alreadyBreastfeed}
                fieldName="alreadyBreastfeed"
                label={i18n.t('MotherFormPage.AlreadyBreastfeed')}
                options={[i18n.t('Yes'), i18n.t('No')]}
                onChange={(fieldName, fieldValues) => {
                  const hasAlreadyBreastfeed = fieldValues[0] === i18n.t('Yes');
                  setFieldValue(fieldName, hasAlreadyBreastfeed);
                  if (hasAlreadyBreastfeed) {
                    // Cria os campos de tempo de amamentação de utilizando a diferença dos campos
                    // pregnantCount e abortionCount.
                    const numberOfChildren = Math.max(
                      Number(values.pregnantCount) -
                        Number(values.abortionCount),
                      0,
                    );
                    const timeSpentBreastfeeding: TimeSpentBreastFeeding[] = [
                      ...Array(numberOfChildren),
                    ].map(_ => ({
                      months: '',
                      years: '',
                    }));
                    setFieldValue(
                      'timeSpentBreastFeeding',
                      timeSpentBreastfeeding,
                    );
                  } else {
                    setFieldValue('timeSpentBreastFeeding', []);
                  }
                }}
              />
            )}

            {values.alreadyBreastfeed &&
              values.pregnantCount > values.abortionCount &&
              values.timeSpentBreastFeeding.map((_, index) => (
                <Flex key={index}>
                  <OpenSansRegular>
                    {i18n.t('MotherFormPage.BreastfeedingTime', {
                      num: index + 1,
                    })}
                  </OpenSansRegular>
                  <Row>
                    <FirstSubOptionContainer>
                      <FormPickerInput
                        error={
                          errors.timeSpentBreastFeeding?.[index]
                            ? (
                                errors.timeSpentBreastFeeding[
                                  index
                                ] as TimeSpentBreastFeeding
                              ).years
                            : ''
                        }
                        fieldName={`timeSpentBreastFeeding[${index}].years`}
                        label={i18n.t('Years')}
                        // Necessário já que o Formik tem problemas para definir o tipo de erros
                        // que são elementos de um array de objetos.
                        // Veja: https://github.com/jaredpalmer/formik/issues/2347
                        options={[
                          '0',
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
                        onChange={setFieldValue}
                      />
                    </FirstSubOptionContainer>
                    <Flex>
                      <FormPickerInput
                        error={
                          errors.timeSpentBreastFeeding?.[index]
                            ? (
                                errors.timeSpentBreastFeeding[
                                  index
                                ] as TimeSpentBreastFeeding
                              ).months
                            : ''
                        }
                        fieldName={`timeSpentBreastFeeding[${index}].months`}
                        label={i18n.t('Months')}
                        // Necessário já que o Formik tem problemas para definir o tipo de erros
                        // que são elementos de um array de objetos.
                        // Veja: https://github.com/jaredpalmer/formik/issues/2347
                        options={[
                          '0',
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
                        onChange={setFieldValue}
                      />
                    </Flex>
                  </Row>
                </Flex>
              ))}

            <FormRadioGroupInput
              error={errors.hasPartner}
              fieldName="hasPartner"
              label={i18n.t('MotherFormPage.Partner')}
              options={[i18n.t('Yes'), i18n.t('No')]}
              onChange={(fieldName: string, fieldValues: string[]) => {
                const hasPartner = fieldValues[0] === i18n.t('Yes');
                setFieldValue(fieldName, hasPartner);
                if (hasPartner) {
                  setFieldValue('livesTogetherWithPartner', undefined);
                } else {
                  setFieldValue('livesTogetherWithPartner', false);
                  setFieldValue('timeLivingWithPartner', '');
                }
              }}
            />

            {values.hasPartner && (
              <>
                <FormRadioGroupInput
                  error={errors.livesTogetherWithPartner}
                  fieldName="livesTogetherWithPartner"
                  label={i18n.t('MotherFormPage.LiveTogether')}
                  options={[i18n.t('Yes'), i18n.t('No')]}
                  onChange={(fieldName: string, fieldValue: string[]) => {
                    const livesTogetherWithPartner =
                      fieldValue[0] === i18n.t('Yes');
                    setFieldValue(fieldName, livesTogetherWithPartner);
                    if (!livesTogetherWithPartner) {
                      setFieldValue('timeLivingWithPartner', '');
                    }
                  }}
                />

                {values.livesTogetherWithPartner && (
                  <Flex>
                    <FormPickerInput
                      error={errors.timeLivingWithPartner}
                      fieldName="timeLivingWithPartner"
                      label={i18n.t('MotherFormPage.PartnerTime')}
                      options={[
                        i18n.t('MotherFormPage.LiveTogetherOptions.Option1'),
                        i18n.t('MotherFormPage.LiveTogetherOptions.Option2'),
                        i18n.t('MotherFormPage.LiveTogetherOptions.Option3'),
                      ]}
                      onChange={setFieldValue}
                    />
                  </Flex>
                )}
              </>
            )}

            <Flex>
              <FormPickerInput
                error={errors.education}
                fieldName="education"
                label={i18n.t('MotherFormPage.Education')}
                options={[
                  i18n.t('MotherFormPage.EducationOptions.Option1'),
                  i18n.t('MotherFormPage.EducationOptions.Option2'),
                  i18n.t('MotherFormPage.EducationOptions.Option3'),
                  i18n.t('MotherFormPage.EducationOptions.Option4'),
                  i18n.t('MotherFormPage.EducationOptions.Option5'),
                  i18n.t('MotherFormPage.EducationOptions.Option6'),
                ]}
                onChange={setFieldValue}
              />
            </Flex>

            <Flex>
              <FormPickerInput
                error={errors.wage}
                fieldName="wage"
                label={i18n.t('MotherFormPage.Wage')}
                options={[
                  i18n.t('MotherFormPage.WageOptions.Option1'),
                  i18n.t('MotherFormPage.WageOptions.Option2'),
                  i18n.t('MotherFormPage.WageOptions.Option3'),
                ]}
                onChange={setFieldValue}
              />
            </Flex>

            <Flex>
              <FormPickerInput
                error={errors.location}
                fieldName="location"
                label={i18n.t('MotherFormPage.Location')}
                options={[
                  i18n.t('MotherFormPage.LocationOptions.HU'),
                  i18n.t('MotherFormPage.LocationOptions.Maternity'),
                ]}
                onChange={setFieldValue}
              />
            </Flex>

            <Flex>
              <FormRadioGroupInput
                error={errors.plannedPregnancy}
                fieldName="plannedPregnancy"
                label={i18n.t('MotherFormPage.PlannedPregnancy')}
                options={[i18n.t('Yes'), i18n.t('No')]}
                onChange={(fieldName, fieldValue) =>
                  setFieldValue(fieldName, fieldValue[0] === i18n.t('Yes'))
                }
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

            <FormRadioGroupInput
              error={errors.hadPreNatalCheckups}
              fieldName="hadPreNatalCheckups"
              label={i18n.t('MotherFormPage.ReceivedPreNatalGuidance')}
              options={[i18n.t('Yes'), i18n.t('No')]}
              onChange={(fieldName, fieldValues) => {
                const hadPreNatalCheckups = fieldValues[0] === i18n.t('Yes');
                setFieldValue(fieldName, hadPreNatalCheckups);
                if (hadPreNatalCheckups) {
                  setFieldValue('preNatalCheckupCount', '');
                  setFieldValue('receivedBreastfeedingGuidance', undefined);
                } else {
                  setFieldValue('preNatalCheckupCount', '0');
                  setFieldValue('receivedBreastfeedingGuidance', false);
                }
              }}
            />

            {values.hadPreNatalCheckups && (
              <>
                <Flex>
                  <FormPickerInput
                    error={errors.preNatalCheckupCount}
                    fieldName="preNatalCheckupCount"
                    label={i18n.t('MotherFormPage.PreNatalCheckupCount')}
                    options={[
                      '1',
                      '2',
                      '3',
                      '4',
                      '5',
                      '6',
                      '7',
                      `8 ${i18n.t('OrMore')}`,
                    ]}
                    onChange={setFieldValue}
                  />
                </Flex>

                <Flex>
                  <FormRadioGroupInput
                    error={errors.receivedBreastfeedingGuidance}
                    fieldName="receivedBreastfeedingGuidance"
                    label={i18n.t(
                      'MotherFormPage.ReceivedBreastfeedingGuidance',
                    )}
                    options={[i18n.t('Yes'), i18n.t('No')]}
                    onChange={(fieldName, fieldValue) =>
                      setFieldValue(fieldName, fieldValue[0] === i18n.t('Yes'))
                    }
                  />
                </Flex>
              </>
            )}

            <Flex>
              <FormPickerInput
                error={errors.problemsDuringPregnancy}
                fieldName="problemsDuringPregnancy"
                label={i18n.t('MotherFormPage.ProblemsDuringPregnancy')}
                options={[
                  i18n.t(
                    'MotherFormPage.ProblemsDuringPregnancyOptions.Option1',
                  ),
                  i18n.t(
                    'MotherFormPage.ProblemsDuringPregnancyOptions.Option2',
                  ),
                  i18n.t('No'),
                ]}
                onChange={setFieldValue}
              />
            </Flex>

            <Flex>
              <FormPickerInput
                error={errors.occupation}
                fieldName="occupation"
                label={i18n.t('MotherFormPage.Occupation')}
                options={[
                  i18n.t('MotherFormPage.OccupationOptions.Option1'),
                  i18n.t('MotherFormPage.OccupationOptions.Option2'),
                ]}
                onChange={(fieldName, fieldValue) =>
                  setFieldValue(
                    fieldName,
                    fieldValue ===
                      i18n.t('MotherFormPage.OccupationOptions.Option2'),
                  )
                }
              />
            </Flex>

            <Flex>
              <FormRadioGroupInput
                error={errors.hasMaternityLeave}
                fieldName="hasMaternityLeave"
                label={i18n.t('MotherFormPage.MaternityLeave')}
                options={[i18n.t('Yes'), i18n.t('No')]}
                onChange={(fieldName, fieldValue) => {
                  const hasMaternityLeave = fieldValue[0] === i18n.t('Yes');
                  setFieldValue(fieldName, hasMaternityLeave);
                  if (!hasMaternityLeave) {
                    setFieldValue('maternityLeave', '');
                  }
                }}
              />
            </Flex>

            {values.hasMaternityLeave && (
              <Flex>
                <FormTextInput
                  error={errors.maternityLeave}
                  keyboardType="numeric"
                  label={i18n.t('MotherFormPage.MaternityLeaveCount')}
                  placeholder={i18n.t(
                    'MotherFormPage.MaternityLeaveCountPlaceholder',
                  )}
                  value={values.maternityLeave}
                  onChangeText={handleChange('maternityLeave')}
                />
              </Flex>
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
          </FormContainer>
        )}
      </Formik>
    </PaddedScrollView>
  );
};

export default MotherForm;
