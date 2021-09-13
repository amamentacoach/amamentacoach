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
  GestationDaysContainer,
  GestationWeeksContainer,
  HeaderSubText,
  HeaderText,
  ScrollView,
  SecondSubOptionContainer,
  SubmitButtonContainer,
  SubOptionsContainer,
} from './styles';

import HelpIcon from '@assets/images/icons/ic_question.svg';

interface Baby {
  id: number;
  name: string;
  birthday: string;
  weight: number | null;
  birthType: boolean | null;
  touched: boolean | null;
  difficulties: boolean | null;
  gestationWeeks: string;
  gestationDays: string;
  apgar1?: number | null;
  apgar2?: number | null;
  birthLocation: string;
}

interface FormValues {
  numberOfBabies: number;
  babies: Baby[];
}

const BabyForm: React.FC = () => {
  const navigation = useNavigation<AuthStackProps>();
  const { motherInfo } = useRoute<AuthRouteProp<'BabyForm'>>().params;

  const [isApgarModalVisible, setIsApgarModalVisible] = useState(false);
  const [babyCount, setBabyCount] = useState(0);

  const babyFormSchema: Yup.SchemaOf<FormValues> = Yup.object({
    numberOfBabies: Yup.number()
      .min(1, i18n.t('BabyFormPage.Yup.BabyError'))
      .required(i18n.t('Yup.Required')),
    babies: Yup.array()
      .of(
        Yup.object().shape(
          {
            id: Yup.number().required(''),
            name: Yup.string().required(i18n.t('Yup.Required')),
            birthday: Yup.string().required(i18n.t('Yup.Required')),
            weight: Yup.number()
              .typeError(i18n.t('Yup.MustBeNumberError'))
              .min(0, i18n.t('Yup.MinEqualError', { num: 0 }))
              .nullable()
              .required(i18n.t('Yup.Required')),
            birthType: Yup.boolean()
              .nullable()
              .required(i18n.t('Yup.Required')),
            touched: Yup.boolean().nullable().required(i18n.t('Yup.Required')),
            difficulties: Yup.boolean()
              .nullable()
              .required(i18n.t('Yup.Required')),
            gestationWeeks: Yup.string().required(i18n.t('Yup.Required')),
            gestationDays: Yup.string().required(i18n.t('Yup.Required')),
            apgar1: Yup.number()
              .transform((currentValue, originalValue) =>
                originalValue === '' || Number.isNaN(currentValue)
                  ? null
                  : currentValue,
              )
              .when('apgar2', {
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
            apgar2: Yup.number()
              .typeError(i18n.t('Yup.MustBeIntegerError'))
              .transform((currentValue, originalValue) =>
                originalValue === '' || Number.isNaN(currentValue)
                  ? null
                  : currentValue,
              )
              .when('apgar1', {
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
          },
          [['apgar1', 'apgar2']],
        ),
      )
      .min(1)
      .required(),
  }).required();

  // Retorna um novo objeto Baby com um id especificado.
  function newBaby(babyId: number): Baby {
    return {
      id: babyId,
      name: '',
      birthday: '',
      weight: null,
      birthType: null,
      touched: null,
      difficulties: null,
      gestationWeeks: '',
      gestationDays: '',
      apgar1: null,
      apgar2: null,
      birthLocation: '',
    };
  }

  // Retorna a mensagem de erro um bebê caso exista.
  function getBabyError(
    errors: FormikErrors<FormValues>,
    index: number,
    field: string,
  ) {
    if (errors?.babies && errors?.babies[index]) {
      return (errors.babies[index] as { [key: string]: any })[field];
    }
    return '';
  }

  // Adiciona ou remove um bebê de acordo com a entrada do usuário.
  function handleNewBaby(
    fieldValue: string,
    babies: Baby[],
    setFieldValue: (field: string, value: any) => void,
  ) {
    // Caso o texto possua caracteres não numéricos ele é ignorado.
    if (fieldValue !== '' && !new RegExp('^\\d+$').test(fieldValue)) {
      return;
    }

    const newBabyCount = parseInt(fieldValue, 10);
    // Caso o texto não possa ser convertido para inteiro, limpa o formulário.
    if (!newBabyCount) {
      setFieldValue('numberOfBabies', '');
      setBabyCount(1);
      setFieldValue('babies', [babies[0]]);
      return;
    }
    // Limita o formulário a um máximo de 20 bebês.
    if (newBabyCount > 20) {
      return;
    }

    let newBabies = [...babies];
    for (let index = 0; index < Math.abs(newBabyCount - babyCount); index++) {
      if (newBabyCount > babyCount) {
        // Caso o novo valor seja maior que o anterior é necessário criar novos objetos do tipo
        // Baby e adiciona-los a lista existente.
        newBabies = [...newBabies, newBaby(babyCount + index + 1)];
      } else if (newBabyCount < babyCount) {
        // Caso o novo valor seja menor que o anterior é necessário remover os n últimos objetos
        // existentes.
        newBabies.pop();
      }
    }
    setFieldValue('numberOfBabies', newBabyCount);
    setFieldValue('babies', newBabies);
    setBabyCount(newBabyCount);
  }

  // Prepara os valores dos bebês para serem enviados ao backend.
  function prepareNewBabiesData(formValues: FormValues) {
    const babiesInfo: BabySignUpInfo[] = formValues.babies.map(baby => ({
      name: baby.name,
      birthday: baby.birthday,
      birthLocation: baby.birthLocation,
      weight: baby.weight!,
      gestationWeeks: parseInt(baby.gestationWeeks, 10),
      gestationDays: parseInt(baby.gestationDays, 10),
      apgar1: baby.apgar1 || null,
      apgar2: baby.apgar2 || null,
      birthType: baby.birthType!,
      touched: baby.difficulties!,
      difficulties: baby.difficulties!,
    }));
    return babiesInfo;
  }

  // Registra a mãe e os bebês.
  async function handleFormSubmit(formValues: FormValues) {
    const babiesInfo = prepareNewBabiesData(formValues);
    navigation.navigate('AcceptTermsOfService', { motherInfo, babiesInfo });
  }

  return (
    <ScrollView>
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
        initialValues={{
          numberOfBabies: 1,
          babies: [newBaby(0)],
        }}
        validationSchema={babyFormSchema}
        validateOnChange={false}
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
            <FormTextInput
              label={i18n.t('BabyFormPage.1')}
              value={values.numberOfBabies.toString()}
              placeholder={i18n.t('BabyFormPage.Placeholder.NumberOfChildren')}
              keyboardType="number-pad"
              onChangeText={(text: string) =>
                handleNewBaby(text, values.babies, setFieldValue)
              }
              error={errors.numberOfBabies}
            />

            {values.babies.map((baby, index) => (
              <View key={baby.id}>
                <FormTextInput
                  label={i18n.t('BabyFormPage.3')}
                  onChangeText={handleChange(`babies[${index}].name`)}
                  placeholder={i18n.t('Name')}
                  value={values.babies[index].name}
                  error={getBabyError(errors, index, 'name')}
                />

                <FormDateInput
                  label={i18n.t('BabyFormPage.5')}
                  fieldName={`babies[${index}].birthday`}
                  placeholder={i18n.t('BabyFormPage.Placeholder.BirthDate')}
                  onChange={setFieldValue}
                  error={getBabyError(errors, index, 'birthday')}
                />

                <FormTextInput
                  label={i18n.t('BabyFormPage.7')}
                  value={values.babies[index].weight?.toString()}
                  placeholder={i18n.t('BabyFormPage.Placeholder.BabyWeight')}
                  keyboardType="number-pad"
                  onChangeText={handleChange(`babies[${index}].weight`)}
                  error={getBabyError(errors, index, 'weight')}
                />

                <FormRadioGroupInput
                  label={i18n.t('BabyFormPage.9')}
                  fieldName={`babies[${index}].birthType`}
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
                  error={getBabyError(errors, index, 'birthType')}
                />

                <FormRadioGroupInput
                  label={i18n.t('BabyFormPage.10')}
                  fieldName={`babies[${index}].touched`}
                  options={[i18n.t('Yes'), i18n.t('No')]}
                  onChange={(fieldName, fieldValues) =>
                    setFieldValue(fieldName, fieldValues[0] === i18n.t('Yes'))
                  }
                  error={getBabyError(errors, index, 'touched')}
                />

                <FormRadioGroupInput
                  label={i18n.t('BabyFormPage.11')}
                  fieldName={`babies[${index}].difficulties`}
                  options={[i18n.t('Yes'), i18n.t('No')]}
                  onChange={(fieldName, fieldValues) =>
                    setFieldValue(fieldName, fieldValues[0] === i18n.t('Yes'))
                  }
                  error={getBabyError(errors, index, 'difficulties')}
                />

                <SubOptionsContainer>
                  <GestationWeeksContainer>
                    <FormPickerInput
                      label={i18n.t('BabyFormPage.12')}
                      fieldName={`babies[${index}].gestationWeeks`}
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
                      placeholder={i18n.t('BabyFormPage.13')}
                      onChange={setFieldValue}
                      error={getBabyError(errors, index, 'gestationWeeks')}
                    />
                  </GestationWeeksContainer>
                  <GestationDaysContainer>
                    <FormPickerInput
                      label=""
                      fieldName={`babies[${index}].gestationDays`}
                      options={['6', '5', '4', '3', '2', '1', '0']}
                      placeholder={i18n.t('BabyFormPage.15')}
                      onChange={setFieldValue}
                      error={getBabyError(errors, index, 'gestationDays')}
                    />
                  </GestationDaysContainer>
                </SubOptionsContainer>

                <ApgarTextHeader>
                  {i18n.t('BabyFormPage.Apgar')}
                </ApgarTextHeader>
                <SubOptionsContainer>
                  <FirstSubOptionContainer>
                    <FormTextInput
                      label=""
                      value={values.babies[index].apgar1?.toString()}
                      placeholder=""
                      keyboardType="number-pad"
                      onChangeText={handleChange(`babies[${index}].apgar1`)}
                      error={getBabyError(errors, index, 'apgar1')}
                    />
                  </FirstSubOptionContainer>
                  <ApgarTextContainer>
                    <ApgarText>{i18n.t('And')}</ApgarText>
                  </ApgarTextContainer>
                  <SecondSubOptionContainer>
                    <FormTextInput
                      label=""
                      value={values.babies[index].apgar2?.toString()}
                      placeholder=""
                      keyboardType="number-pad"
                      onChangeText={handleChange(`babies[${index}].apgar2`)}
                      error={getBabyError(errors, index, 'apgar2')}
                    />
                  </SecondSubOptionContainer>
                  <ApgarHelpButton
                    onPress={() => setIsApgarModalVisible(true)}
                    activeOpacity={0.8}>
                    <HelpIcon height={22} width={22} />
                  </ApgarHelpButton>
                </SubOptionsContainer>

                <FormRadioGroupInput
                  label={i18n.t('BabyFormPage.20')}
                  fieldName={`babies[${index}].birthLocation`}
                  options={[i18n.t('Lodging'), i18n.t('UCI'), i18n.t('UTI')]}
                  onChange={(fieldName, fieldValues) =>
                    setFieldValue(fieldName, fieldValues[0])
                  }
                  error={getBabyError(errors, index, 'birthLocation')}
                />
              </View>
            ))}

            <SubmitButtonContainer>
              <FirstSubOptionContainer>
                <SecondaryButton
                  onPress={() => navigation.goBack()}
                  text={i18n.t('GoBack')}
                />
              </FirstSubOptionContainer>
              <SecondSubOptionContainer>
                <MainButton
                  onPress={handleSubmit}
                  disabled={!dirty}
                  text={i18n.t('Next')}
                />
              </SecondSubOptionContainer>
            </SubmitButtonContainer>
          </FormContainer>
        )}
      </Formik>
    </ScrollView>
  );
};

export default BabyForm;
