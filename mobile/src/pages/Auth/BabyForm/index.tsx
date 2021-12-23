import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { useState } from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

import FormDateInput from 'components/FormDateInput';
import FormPickerInput from 'components/FormPickerInput';
import FormRadioGroupInput from 'components/FormRadioGroup';
import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';
import Modal from 'components/Modal';
import SecondaryButton from 'components/SecondaryButton';
import { Center, Flex, PaddedScrollView, Row } from 'lib/sharedStyles';

import type { FormikErrors } from 'formik';
import type { AuthRouteProp, AuthStackProps } from 'routes/auth';
import type { BabySignUpInfo } from 'services/auth';

import {
  ApgarHelpButton,
  ApgarText,
  ApgarTextContainer,
  ApgarTextHeader,
  FirstSubOptionContainer,
  FormContainer,
  GestationTimeText,
  GestationWeeksContainer,
  HeaderSubText,
  HeaderText,
  SubmitButtonContainer,
} from './styles';

import HelpIcon from '@assets/images/icons/ic_question.svg';

interface FormBabyInfo {
  name: string;
  birthday: string;
  weight: string;
  birthType?: boolean;
  hadFirstContact?: boolean;
  hadPostPartumComplications: string;
  gestationDays: string;
  gestationWeeks: string;
  apgar1: string | null;
  apgar2: string | null;
  birthLocation: string;
  hadFirstStimulus: string[];
  timeFirstVisit: string;
  timeFirstStimulus: string;
}

type FormValues = FormBabyInfo[];

const BabyForm: React.FC = () => {
  const navigation = useNavigation<AuthStackProps>();
  const { motherInfo } = useRoute<AuthRouteProp<'BabyForm'>>().params;
  const [isApgarModalVisible, setIsApgarModalVisible] = useState(false);

  const formInitialValues: FormValues = [
    ...Array(motherInfo.currentGestationCount),
  ].map(_ => ({
    name: '',
    birthday: '',
    weight: '',
    birthType: undefined,
    hadFirstContact: undefined,
    hadPostPartumComplications: '',
    gestationWeeks: '',
    gestationDays: '',
    apgar1: null,
    apgar2: null,
    birthLocation: '',
    hadFirstStimulus: [],
    timeFirstVisit: '',
    timeFirstStimulus: '',
  }));

  const babyFormSchema = Yup.array()
    .of(
      Yup.object().shape(
        {
          name: Yup.string().required(i18n.t('Yup.Required')),
          birthday: Yup.string().required(i18n.t('Yup.Required')),
          gestationDays: Yup.number().required(i18n.t('Yup.Required')),
          gestationWeeks: Yup.number().required(i18n.t('Yup.Required')),
          weight: Yup.number()
            .typeError(i18n.t('Yup.MustBeNumberError'))
            .min(0, i18n.t('Yup.MinEqualError', { num: 0 }))
            .required(i18n.t('Yup.Required')),
          birthType: Yup.boolean().required(i18n.t('Yup.Required')),
          hadFirstContact: Yup.boolean().required(i18n.t('Yup.Required')),
          hadPostPartumComplications: Yup.string().required(
            i18n.t('Yup.Required'),
          ),
          apgar1: Yup.number().when('apgar2', {
            is: (value: any) => !value,
            then: Yup.number()
              .nullable()
              .typeError(i18n.t('Yup.MustBeIntegerError')),
            otherwise: Yup.number()
              .nullable()
              .required(i18n.t('BabyFormPage.Yup.ApgarError', { num: 1 }))
              .typeError(i18n.t('Yup.MustBeIntegerError'))
              .integer(i18n.t('Yup.MustBeIntegerError'))
              .min(0, i18n.t('Yup.MinEqualError', { num: 0 }))
              .max(10, i18n.t('Yup.MaxEqualError', { num: 10 })),
          }),
          apgar2: Yup.number().when('apgar1', {
            is: (value: any) => !value,
            then: Yup.number()
              .nullable()
              .typeError(i18n.t('Yup.MustBeIntegerError')),
            otherwise: Yup.number()
              .nullable()
              .required(i18n.t('BabyFormPage.Yup.ApgarError', { num: 2 }))
              .typeError(i18n.t('Yup.MustBeIntegerError'))
              .integer(i18n.t('Yup.MustBeIntegerError'))
              .min(0, i18n.t('Yup.MinEqualError', { num: 0 }))
              .max(10, i18n.t('Yup.MaxEqualError', { num: 10 })),
          }),
          birthLocation: Yup.string().required(i18n.t('Yup.Required')),
          timeFirstVisit: Yup.string().when('birthLocation', {
            is: i18n.t('Lodging'),
            then: Yup.string(),
            otherwise: Yup.string().required(i18n.t('Yup.Required')),
          }),
          hadFirstStimulus: Yup.array()
            .of(Yup.string().required(i18n.t('Yup.Required')))
            .test(
              'valid-configuration',
              i18n.t('Yup.InvalidOptionsCombination'),
              values => {
                const lodgingText = i18n.t(
                  'BabyFormPage.FirstStimulusOptions.Option1',
                );
                // Se a primeira opção foi selecionada as outras opções não podem ser selecionadas.
                if (values?.includes(lodgingText)) {
                  return values.length === 1;
                }
                return true;
              },
            )
            .min(1, i18n.t('Yup.Required')),
          timeFirstStimulus: Yup.string()
            .when('hadFirstStimulus', {
              is: (values: string[]) => {
                const lodgingText = i18n.t(
                  'BabyFormPage.FirstStimulusOptions.Option1',
                );
                // Necessário somente se selecionar a opção 1 da questão anterior.
                return values.includes(lodgingText);
              },
              then: Yup.string(),
              otherwise: Yup.string().required(i18n.t('Yup.Required')),
            })
            .ensure(),
        },
        [['apgar1', 'apgar2']],
      ),
    )
    .required();

  // Retorna a mensagem de erro um bebê caso exista.
  function getBabyError(
    errors: FormikErrors<FormValues>,
    index: number,
    field: string,
  ): string {
    if (errors && errors[index]) {
      return (errors[index] as { [key: string]: any })[field];
    }
    return '';
  }

  // Prepara os valores dos bebês para serem enviados ao backend.
  function prepareNewBabiesData(formValues: FormValues): BabySignUpInfo[] {
    const babiesInfo: BabySignUpInfo[] = formValues.map(baby => ({
      apgar1: Number(baby.apgar1) || null,
      apgar2: Number(baby.apgar2) || null,
      birthday: baby.birthday,
      birthLocation: baby.birthLocation,
      birthType: baby.birthType!,
      gestationDays: Number(baby.gestationDays),
      gestationWeeks: Number(baby.gestationWeeks),
      hadFirstContact: baby.hadFirstContact!,
      hadFirstStimulus: baby.hadFirstStimulus,
      hadPostPartumComplications: baby.hadPostPartumComplications,
      name: baby.name,
      timeFirstStimulus: baby.timeFirstStimulus || null,
      timeFirstVisit: baby.timeFirstVisit || null,
      weight: Number(baby.weight),
    }));
    return babiesInfo;
  }

  // Registra a mãe e os bebês.
  function handleFormSubmit(formValues: FormValues): void {
    const babiesInfo = prepareNewBabiesData(formValues);
    navigation.navigate('AcceptTermsOfService', { motherInfo, babiesInfo });
  }

  return (
    <PaddedScrollView>
      <Modal
        content={i18n.t('BabyFormPage.ApgarPopUp')}
        options={[
          {
            text: i18n.t('Close'),
            isBold: true,
            onPress: () => setIsApgarModalVisible(false),
          },
        ]}
        visible={isApgarModalVisible}
      />

      <HeaderText>
        {i18n.t('Auth.SignUpStep', { current: '3', max: '4' })}
      </HeaderText>

      <HeaderSubText>{i18n.t('BabyFormPage.Header')}</HeaderSubText>
      <Formik
        initialValues={formInitialValues}
        validateOnChange={false}
        validationSchema={babyFormSchema}
        onSubmit={handleFormSubmit}>
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          dirty,
          errors,
          values,
        }) => (
          <FormContainer>
            {values.map((_, index) => (
              <View key={index}>
                <FormTextInput
                  error={getBabyError(errors, index, 'name')}
                  label={i18n.t('BabyFormPage.Name')}
                  placeholder={i18n.t('Name')}
                  value={values[index].name}
                  onChangeText={handleChange(`${index}.name`)}
                />

                <FormDateInput
                  error={getBabyError(errors, index, 'birthday')}
                  fieldName={`${index}.birthday`}
                  label={i18n.t('BabyFormPage.BirthDate')}
                  placeholder={i18n.t('BabyFormPage.Placeholder.BirthDate')}
                  onChange={setFieldValue}
                />

                <Flex>
                  <GestationTimeText>
                    {i18n.t('BabyFormPage.GestationWeeks', {
                      nome: values[index].name || i18n.t('Baby'),
                    })}
                  </GestationTimeText>
                  <Row>
                    <GestationWeeksContainer>
                      <FormPickerInput
                        error={getBabyError(errors, index, 'gestationWeeks')}
                        fieldName={`${index}.gestationWeeks`}
                        options={[
                          '36',
                          '35',
                          '34',
                          '33',
                          '32',
                          '31',
                          '30',
                          '29',
                          '28',
                          '27',
                          '26',
                          '25',
                          '24',
                        ]}
                        placeholder={i18n.t('Week', { count: 2 })}
                        onChange={setFieldValue}
                      />
                    </GestationWeeksContainer>
                    <Flex>
                      <FormPickerInput
                        error={getBabyError(errors, index, 'gestationDays')}
                        fieldName={`${index}.gestationDays`}
                        options={['6', '5', '4', '3', '2', '1', '0']}
                        placeholder={i18n.t('Day', { count: 2 })}
                        onChange={setFieldValue}
                      />
                    </Flex>
                  </Row>
                </Flex>

                <FormTextInput
                  error={getBabyError(errors, index, 'weight')}
                  keyboardType="number-pad"
                  label={i18n.t('BabyFormPage.Weight')}
                  placeholder={i18n.t('BabyFormPage.Placeholder.BabyWeight')}
                  value={values[index].weight}
                  onChangeText={handleChange(`${index}.weight`)}
                />

                <FormRadioGroupInput
                  error={getBabyError(errors, index, 'birthType')}
                  fieldName={`${index}.birthType`}
                  label={i18n.t('BabyFormPage.BirthType')}
                  options={[
                    i18n.t('BabyFormPage.BirthTypeOptions.Option1'),
                    i18n.t('BabyFormPage.BirthTypeOptions.Option2'),
                  ]}
                  onChange={(fieldName, fieldValues) =>
                    setFieldValue(
                      fieldName,
                      fieldValues[0] ===
                        i18n.t('BabyFormPage.BirthTypeOptions.Option2'),
                    )
                  }
                />

                <FormRadioGroupInput
                  error={getBabyError(errors, index, 'hadFirstContact')}
                  fieldName={`${index}.hadFirstContact`}
                  label={i18n.t('BabyFormPage.HadFirstContact')}
                  options={[i18n.t('Yes'), i18n.t('No')]}
                  onChange={(fieldName, fieldValues) =>
                    setFieldValue(fieldName, fieldValues[0] === i18n.t('Yes'))
                  }
                />

                <FormPickerInput
                  error={getBabyError(
                    errors,
                    index,
                    'hadPostPartumComplications',
                  )}
                  fieldName={`${index}.hadPostPartumComplications`}
                  label={i18n.t('BabyFormPage.HadPostPartumComplications')}
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

                <ApgarTextHeader>
                  {i18n.t('BabyFormPage.Apgar')}
                </ApgarTextHeader>
                <Row>
                  <FirstSubOptionContainer>
                    <FormTextInput
                      error={getBabyError(errors, index, 'apgar1')}
                      keyboardType="number-pad"
                      label=""
                      placeholder=""
                      value={values[index].apgar1}
                      onChangeText={handleChange(`${index}.apgar1`)}
                    />
                  </FirstSubOptionContainer>
                  <ApgarTextContainer>
                    <ApgarText>{i18n.t('And')}</ApgarText>
                  </ApgarTextContainer>
                  <Center>
                    <FormTextInput
                      error={getBabyError(errors, index, 'apgar2')}
                      keyboardType="number-pad"
                      label=""
                      placeholder=""
                      value={values[index].apgar2}
                      onChangeText={handleChange(`${index}.apgar2`)}
                    />
                  </Center>
                  <ApgarHelpButton
                    activeOpacity={0.8}
                    onPress={() => setIsApgarModalVisible(true)}>
                    <HelpIcon height={22} width={22} />
                  </ApgarHelpButton>
                </Row>

                <FormRadioGroupInput
                  error={getBabyError(errors, index, 'birthLocation')}
                  fieldName={`${index}.birthLocation`}
                  label={i18n.t('BabyFormPage.BirthLocation')}
                  options={[
                    i18n.t('Lodging'),
                    i18n.t('UCI'),
                    i18n.t('UCIN Kangaroo'),
                    i18n.t('UTI'),
                  ]}
                  onChange={(fieldName, fieldValues) => {
                    setFieldValue(fieldName, fieldValues[0]);
                    if (fieldValues[0] === i18n.t('Lodging')) {
                      setFieldValue(`${index}.timeFirstVisit`, '');
                    }
                  }}
                />

                {values[index].birthLocation !== i18n.t('Lodging') && (
                  <Flex>
                    <FormPickerInput
                      error={getBabyError(errors, index, 'timeFirstVisit')}
                      fieldName={`${index}.timeFirstVisit`}
                      label={i18n.t('BabyFormPage.TimeFirstVisit')}
                      options={[
                        i18n.t('BabyFormPage.TimeFirstVisitOptions.Option1'),
                        i18n.t('BabyFormPage.TimeFirstVisitOptions.Option2'),
                        i18n.t('BabyFormPage.TimeFirstVisitOptions.Option3'),
                        i18n.t('BabyFormPage.TimeFirstVisitOptions.Option4'),
                        i18n.t('BabyFormPage.TimeFirstVisitOptions.Option5'),
                      ]}
                      onChange={setFieldValue}
                    />
                  </Flex>
                )}

                <Flex>
                  <FormRadioGroupInput
                    error={getBabyError(errors, index, 'hadFirstStimulus')}
                    fieldName={`${index}.hadFirstStimulus`}
                    label={i18n.t('BabyFormPage.HadFirstStimulus')}
                    options={[
                      i18n.t('BabyFormPage.FirstStimulusOptions.Option1'),
                      i18n.t('BabyFormPage.FirstStimulusOptions.Option2'),
                      i18n.t('BabyFormPage.FirstStimulusOptions.Option3'),
                    ]}
                    multipleSelection
                    onChange={(fieldName, fieldValues) => {
                      setFieldValue(fieldName, fieldValues);
                      const noFirstStimulus = i18n.t(
                        'BabyFormPage.FirstStimulusOptions.Option1',
                      );
                      if (fieldValues.includes(noFirstStimulus)) {
                        setFieldValue(`${index}.timeFirstStimulus`, '');
                      }
                    }}
                  />
                </Flex>

                {values[index].hadFirstStimulus.length > 0 &&
                  !values[index].hadFirstStimulus.includes(
                    i18n.t('BabyFormPage.FirstStimulusOptions.Option1'),
                  ) && (
                    <Flex>
                      <FormPickerInput
                        error={getBabyError(errors, index, 'timeFirstStimulus')}
                        fieldName={`${index}.timeFirstStimulus`}
                        label={i18n.t('BabyFormPage.TimeFirstStimulus')}
                        options={[
                          i18n.t(
                            'BabyFormPage.TimeFirstStimulusOptions.Option1',
                          ),
                          i18n.t(
                            'BabyFormPage.TimeFirstStimulusOptions.Option2',
                          ),
                          i18n.t(
                            'BabyFormPage.TimeFirstStimulusOptions.Option3',
                          ),
                          i18n.t(
                            'BabyFormPage.TimeFirstStimulusOptions.Option4',
                          ),
                          i18n.t(
                            'BabyFormPage.TimeFirstStimulusOptions.Option5',
                          ),
                          i18n.t(
                            'BabyFormPage.TimeFirstStimulusOptions.Option6',
                          ),
                        ]}
                        onChange={setFieldValue}
                      />
                    </Flex>
                  )}
              </View>
            ))}

            <SubmitButtonContainer>
              <FirstSubOptionContainer>
                <SecondaryButton
                  text={i18n.t('GoBack')}
                  onPress={() => navigation.goBack()}
                />
              </FirstSubOptionContainer>
              <Center>
                <MainButton
                  disabled={!dirty}
                  text={i18n.t('Next')}
                  onPress={handleSubmit}
                />
              </Center>
            </SubmitButtonContainer>
          </FormContainer>
        )}
      </Formik>
    </PaddedScrollView>
  );
};

export default BabyForm;
