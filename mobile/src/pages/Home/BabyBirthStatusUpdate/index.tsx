import 'yup-phone';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { useRef } from 'react';
import { Linking, View } from 'react-native';
import * as Yup from 'yup';

import FormDateInput from 'components/FormDateInput';
import FormRadioGroupInput from 'components/FormRadioGroup';
import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';
import PaddedScrollView from 'components/PaddedScrollView';
import { useAuth } from 'contexts/auth';
import {
  Flex,
  OpenSansBold,
  OpenSansRegular,
  Row,
  Spacer,
} from 'lib/sharedStyles';
import updateBabyBirthInfo from 'services/babyBirth';
import { getCountryStates } from 'utils/localize';

import type { FormikErrors, FormikHelpers } from 'formik';
import type { RootStackProps } from 'routes/app';
import type { BabySignUpInfo } from 'services/signUp';

import {
  QuestionContainer,
  StatePicker,
  StateQuestion,
  ExternalFormContainer,
} from './styles';

interface FormValues {
  isBabyBorn?: boolean;
  birthDate?: Date;
  birthLocation: string;
  birthWeeks: string;
  city: string;
  currentGestationCount: string;
  hasPartner?: boolean;
  state: string;
  babies: BabySignUpInfo[];
}

const BabyBirthStatusUpdate: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const { refreshMotherInfo } = useAuth();
  const wasExternalFormOpened = useRef(false);

  const availableStates = getCountryStates();
  const formInitialValues: FormValues = {
    isBabyBorn: undefined,
    currentGestationCount: '',
    birthLocation: '',
    hasPartner: undefined,
    birthWeeks: '',
    birthDate: undefined,
    city: '',
    state: '',
    babies: [],
  };

  function checkBabyBirthInstitution(
    birthInstitution: string | undefined,
  ): boolean {
    return (
      birthInstitution !== undefined &&
      birthInstitution !== '' &&
      birthInstitution !== i18n.t('BabyFormPage.Institution.Options.1') &&
      birthInstitution !== i18n.t('BabyFormPage.Institution.Options.2')
    );
  }

  const dependsOn = (
    dependsOnField: string,
    type: Yup.AnySchema,
  ): Yup.AnySchema =>
    type.when(dependsOnField, {
      is: true,
      then: type.required(i18n.t('Yup.Required')),
      otherwise: type,
    });

  const formSchema = Yup.object({
    isBabyBorn: Yup.boolean().required(i18n.t('Yup.Required')),
    birthWeeks: dependsOn('isBabyBorn', Yup.string()),
    birthDate: dependsOn('isBabyBorn', Yup.string()),
    city: dependsOn('isBabyBorn', Yup.string()),
    currentGestationCount: dependsOn(
      'isBabyBorn',
      Yup.number()
        .integer(i18n.t('Yup.MustBeIntegerError'))
        .typeError(i18n.t('Yup.MustBeIntegerError'))
        .min(1, i18n.t('Yup.MinEqualError', { num: 1 })),
    ),
    hasPartner: dependsOn('isBabyBorn', Yup.boolean()),
    state: dependsOn('isBabyBorn', Yup.string()),
    babies: dependsOn(
      'isBabyBorn',
      Yup.array()
        .of(
          Yup.object().shape({
            birthLocation: Yup.string().required(i18n.t('Yup.Required')),
            birthInstitution: Yup.string()
              // Caso o bebê tenha nascido em uma instituição que não faz parte do estudo é necessário
              // abrir o formulário externo.
              .test(
                'user-opened-form',
                i18n.t('BabyFormPage.ExternalForm.Error'),
                (value, _) =>
                  checkBabyBirthInstitution(value)
                    ? wasExternalFormOpened.current
                    : true,
              )
              .required(i18n.t('Yup.Required')),
            currentLocation: Yup.string().required(i18n.t('Yup.Required')),
            name: Yup.string().required(i18n.t('Yup.Required')),
          }),
        )
        .min(1),
    ),
  }).required();

  function getBabyError(
    errors: FormikErrors<FormValues>,
    index: number,
    field: string,
  ): string {
    if (errors && errors.babies && errors.babies[index]) {
      return (errors.babies[index] as { [key: string]: any })[field];
    }
    return '';
  }

  async function handleFormSubmit(
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ): Promise<void> {
    if (!values.isBabyBorn) {
      navigation.navigate('Home');
      return;
    }

    setSubmitting(true);
    const motherInfo = {
      ...values,
      birthDate: values.birthDate!,
      hasPartner: values.hasPartner!,
    };
    const status = await updateBabyBirthInfo(motherInfo, values.babies);
    if (status) {
      await refreshMotherInfo();
      navigation.navigate('Home');
    } else {
      setSubmitting(false);
    }
  }

  return (
    <PaddedScrollView>
      <Formik
        initialValues={formInitialValues}
        validateOnChange={false}
        validationSchema={formSchema}
        onSubmit={handleFormSubmit}>
        {({
          handleChange,
          setFieldValue,
          handleSubmit,
          isSubmitting,
          dirty,
          errors,
          values,
        }) => (
          <>
            <Flex>
              <FormRadioGroupInput
                error={errors.isBabyBorn}
                label={i18n.t('BabyBirthStatusUpdate.BirthStatus')}
                options={[i18n.t('Yes'), i18n.t('No')]}
                onChange={fieldValues => {
                  let value;
                  if (fieldValues[0]) {
                    value = fieldValues[0] === i18n.t('Yes');
                  }
                  setFieldValue('isBabyBorn', value);
                }}
              />

              {values.isBabyBorn && (
                <Flex>
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
                      placeholder={i18n.t(
                        'MotherFormPage.Placeholder.BirthDate',
                      )}
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
                      value={values.currentGestationCount.toString()}
                      onChangeText={handleChange('currentGestationCount')}
                    />
                  </QuestionContainer>

                  {[...Array(Number(values.currentGestationCount) || 0)].map(
                    (_, index) => (
                      <View key={index}>
                        <QuestionContainer>
                          <FormTextInput
                            error={getBabyError(errors, index, 'name')}
                            label={i18n.t('BabyFormPage.Name')}
                            placeholder={i18n.t('Name')}
                            onChangeText={handleChange(`babies[${index}].name`)}
                          />
                        </QuestionContainer>

                        <QuestionContainer>
                          <FormRadioGroupInput
                            error={getBabyError(
                              errors,
                              index,
                              'birthInstitution',
                            )}
                            label={i18n.t(
                              'BabyFormPage.Institution.Description',
                            )}
                            options={[
                              i18n.t('BabyFormPage.Institution.Options.1'),
                              i18n.t('BabyFormPage.Institution.Options.2'),
                            ]}
                            displayOtherField
                            onChange={fieldValues =>
                              setFieldValue(
                                `babies[${index}].birthInstitution`,
                                fieldValues[0],
                              )
                            }
                          />
                        </QuestionContainer>

                        {checkBabyBirthInstitution(
                          values.babies[index]?.birthInstitution,
                        ) && (
                          <ExternalFormContainer>
                            <OpenSansRegular>
                              {i18n.t('BabyFormPage.ExternalForm.Message')}
                            </OpenSansRegular>
                            {/* TODO Adicionar link */}
                            <OpenSansBold
                              onPress={() => {
                                wasExternalFormOpened.current = true;
                                Linking.openURL('TODO');
                              }}>
                              {i18n.t('BabyFormPage.ExternalForm.LinkWarning')}
                            </OpenSansBold>
                          </ExternalFormContainer>
                        )}

                        <QuestionContainer>
                          <FormRadioGroupInput
                            error={getBabyError(errors, index, 'birthLocation')}
                            label={i18n.t('BabyFormPage.BirthPlace')}
                            options={[
                              i18n.t('Lodging'),
                              i18n.t('UCI'),
                              i18n.t('UCIN Kangaroo'),
                              i18n.t('UTI'),
                            ]}
                            onChange={fieldValues =>
                              setFieldValue(
                                `babies[${index}].birthLocation`,
                                fieldValues[0],
                              )
                            }
                          />
                        </QuestionContainer>

                        <QuestionContainer>
                          <FormRadioGroupInput
                            error={getBabyError(
                              errors,
                              index,
                              'currentLocation',
                            )}
                            label={i18n.t(
                              'BabyFormPage.CurrentLocation.Description',
                            )}
                            options={[
                              i18n.t('Lodging'),
                              i18n.t('UCI'),
                              i18n.t('UCIN Kangaroo'),
                              i18n.t('UTI'),
                              i18n.t(
                                'BabyFormPage.CurrentLocation.Options.Home',
                              ),
                            ]}
                            onChange={fieldValues =>
                              setFieldValue(
                                `babies[${index}].currentLocation`,
                                fieldValues[0],
                              )
                            }
                          />
                        </QuestionContainer>
                      </View>
                    ),
                  )}
                </Flex>
              )}
            </Flex>

            <MainButton
              disabled={!dirty || isSubmitting}
              text={i18n.t('Actions.Submit')}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
    </PaddedScrollView>
  );
};

export default BabyBirthStatusUpdate;
