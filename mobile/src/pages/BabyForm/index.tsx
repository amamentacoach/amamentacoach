import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Formik, FormikErrors } from 'formik';
import * as Yup from 'yup';

import { useAuth } from '../../contexts/auth';
import {
  signUpBaby,
  IMotherSignUpInfo,
  signUpMother,
  IBabySignUpInfo,
} from '../../services/auth';
import Modal from '../../components/Modal';
import MainButton from '../../components/MainButton';
import SecondaryButton from '../../components/SecondaryButton';
import FormRadioGroupInput from '../../components/FormRadioGroup';
import FormTextInput from '../../components/FormTextInput';
import FormDateInput from '../../components/FormDateInput';
import FormPickerInput from '../../components/FormPickerInput';

import {
  ScrollView,
  HeaderText,
  HeaderSubText,
  FormContainer,
  SubOptionsContainer,
  FirstSubOptionContainer,
  SecondSubOptionContainer,
  GestationWeeksContainer,
  GestationDaysContainer,
  ApgarTextContainer,
  ApgarText,
  SubmitButtonContainer,
  ApgarTextHeader,
  ApgarHelpButton,
} from './styles';

import helpIcon from '../../../assets/images/icons/ic_question.png';

interface IBaby {
  id: number;
  name: string;
  birthday: string;
  weight: string;
  birthType: string[];
  difficulties: string[];
  gestationWeeks: string;
  gestationDays: string;
  apgar1: string | undefined;
  apgar2: string | undefined;
  birthLocation: string[];
}

interface IFormValues {
  numberOfBabies: string;
  babies: IBaby[];
}

type ScreenParams = {
  MotherForm: {
    motherInfo: IMotherSignUpInfo;
  };
};

const BabyForm: React.FC = () => {
  const { signIn } = useAuth();
  const navigation = useNavigation();
  const { motherInfo } = useRoute<
    RouteProp<ScreenParams, 'MotherForm'>
  >().params;

  const [isSendingForm, setIsSendingForm] = useState(false);
  const [isApgarModalVisible, setIsApgarModalVisible] = useState(false);
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [babyCount, setBabyCount] = useState(0);

  const babyFormSchema = Yup.object({
    numberOfBabies: Yup.number()
      .min(0, 'Pelo menos um bebê deve ser registrado')
      .required('Campo obrigatório'),
    babies: Yup.array()
      .of(
        Yup.object().shape(
          {
            id: Yup.number(),
            name: Yup.string().required('Campo obrigatório'),
            birthday: Yup.string().required('Campo obrigatório'),
            weight: Yup.number()
              .integer('Deve ser um número inteiro')
              .typeError('Deve ser um número inteiro')
              .min(0, 'Deve ser maior ou igual a 0')
              .required('Campo obrigatório'),
            birthType: Yup.array(Yup.string().required()).required(
              'Campo obrigatório',
            ),
            difficulties: Yup.array(Yup.string().required()).required(
              'Campo obrigatório',
            ),
            gestationWeeks: Yup.string().required('Campo obrigatório'),
            gestationDays: Yup.string().required('Campo obrigatório'),
            apgar1: Yup.number()
              .when('apgar2', {
                is: undefined,
                then: Yup.number().typeError('Deve ser um número inteiro'),
                otherwise: Yup.number()
                  .typeError('Deve ser um número inteiro')
                  .required('Apgar 1 também deve ser fornecido'),
              })
              .integer('Deve ser um número inteiro')
              .min(0, 'Deve ser maior ou igual a 0')
              .max(10, 'Deve ser menor ou igual a 10'),
            apgar2: Yup.number()
              .when('apgar1', {
                is: undefined,
                then: Yup.number().typeError('Deve ser um número inteiro'),
                otherwise: Yup.number()
                  .typeError('Deve ser um número inteiro')
                  .required('Apgar 2 também deve ser fornecido'),
              })
              .integer('Deve ser um número inteiro')
              .min(0, 'Deve ser maior ou igual a 0')
              .max(10, 'Deve ser menor ou igual a 10'),
            birthLocation: Yup.array(Yup.string().required()).required(
              'Campo obrigatório',
            ),
          },
          [['apgar1', 'apgar2']],
        ),
      )
      .min(1, 'Pelo menos um bebê deve ser cadastrado')
      .required(),
  }).required();

  // Retorna um novo objeto Baby com um id especificado.
  function newBaby(babyId: number): IBaby {
    return {
      id: babyId,
      name: '',
      birthday: '',
      weight: '',
      birthType: [],
      difficulties: [],
      gestationWeeks: '',
      gestationDays: '',
      apgar1: '',
      apgar2: '',
      birthLocation: [],
    };
  }

  // Retorna a mensagem de erro um bebê caso exista.
  function getBabyError(
    errors: FormikErrors<IFormValues>,
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
    babies: IBaby[],
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
        // IBaby e adiciona-los a lista existente.
        newBabies = [...newBabies, newBaby(babyCount + index + 1)];
      } else if (newBabyCount < babyCount) {
        // Caso o novo valor seja menor que o anterior é necessário remover os n últimos objetos
        // existentes.
        newBabies.pop();
      }
    }
    setFieldValue('numberOfBabies', fieldValue);
    setFieldValue('babies', newBabies);
    setBabyCount(newBabyCount);
  }

  // Registra a mãe no sistema.
  async function registerNewMother(): Promise<string | null> {
    const token = await signUpMother(motherInfo);
    return token;
  }

  // Registra todos os bebês do formulário.
  async function registerNewBabies(token: string, formValues: IFormValues) {
    formValues.babies.forEach(async baby => {
      const babyInfo: IBabySignUpInfo = {
        name: baby.name,
        birthday: baby.birthday,
        weight: parseInt(baby.weight, 10),
        birthType: baby.birthType[0].toLowerCase() === 'cesária',
        gestationWeeks: parseInt(baby.gestationWeeks, 10),
        gestationDays: parseInt(baby.gestationDays, 10),
        apgar1: baby.apgar1 ? parseInt(baby.apgar1, 10) : null,
        apgar2: baby.apgar2 ? parseInt(baby.apgar2, 10) : null,
        birthLocation: baby.birthLocation[0],
        difficulties: baby.difficulties[0].toLowerCase() === 'sim',
      };
      await signUpBaby(token, babyInfo);
    });
  }

  // Registra a mãe e os bebês.
  async function handleFormSubmit(formValues: IFormValues) {
    setIsSendingForm(true);
    const token = await registerNewMother();
    if (token === null) {
      setIsErrorModalVisible(true);
      return;
    }

    registerNewBabies(token, formValues);
    setIsSendingForm(false);
    setIsSignUpModalVisible(true);
  }

  return (
    <ScrollView>
      <Modal
        text="Apgar é a nota, de 0 a 10, que o bebê recebe de acordo com o estado em que ele se apresenta no momento de nascimento e consta no cartão da criança.
Se não souber, tudo bem, continue seu cadastro normalmente!"
        visible={isApgarModalVisible}
        closeModal={() => setIsApgarModalVisible(false)}
      />
      <Modal
        text="Conta criada com sucesso! Seja muito bem-vinda ao AmamentaCoach!"
        visible={isSignUpModalVisible}
        closeModal={async () => {
          setIsSignUpModalVisible(false);
          await signIn(motherInfo.email, motherInfo.password);
        }}
      />
      <Modal
        text={`Erro ao registrar!\nPor favor tente novamente mais tarde.`}
        visible={isErrorModalVisible}
        closeModal={async () => {
          setIsErrorModalVisible(false);
          setIsSendingForm(false);
        }}
      />

      <HeaderText>Passo 3 de 3</HeaderText>
      <HeaderSubText>
        Você está quase lá! Por último, faremos algumas perguntas sobre seu
        bebê:
      </HeaderSubText>
      <Formik
        initialValues={{
          numberOfBabies: '1',
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
              label="Número de filhos nesta gestação"
              value={values.numberOfBabies}
              placeholder="Insira o número de filhos"
              keyboardType="number-pad"
              onChangeText={(text: string) =>
                handleNewBaby(text, values.babies, setFieldValue)
              }
              error={errors.numberOfBabies}
            />

            {values.babies.map((baby, index) => (
              <View key={baby.id}>
                <FormTextInput
                  label="Nome do seu bebê"
                  onChangeText={handleChange(`babies[${index}].name`)}
                  placeholder="Nome"
                  value={values.babies[index].name}
                  error={getBabyError(errors, index, 'name')}
                />

                <FormDateInput
                  label="Data do parto"
                  fieldName={`babies[${index}].birthday`}
                  placeholder="Insira a data do parto"
                  onChange={setFieldValue}
                  error={getBabyError(errors, index, 'birthday')}
                />

                <FormTextInput
                  label="Peso de nascimento"
                  value={values.babies[index].weight.toString()}
                  placeholder="Insira o peso do bebê ao nascer (kg)"
                  keyboardType="number-pad"
                  onChangeText={handleChange(`babies[${index}].weight`)}
                  error={getBabyError(errors, index, 'weight')}
                />

                <FormRadioGroupInput
                  label="Tipo de parto"
                  fieldName={`babies[${index}].birthType`}
                  options={['Normal', 'Cesária']}
                  onChange={setFieldValue}
                  error={getBabyError(errors, index, 'birthType')}
                />

                <FormRadioGroupInput
                  label="Presença de complicação pós-parto?"
                  fieldName={`babies[${index}].difficulties`}
                  options={['Sim', 'Não']}
                  onChange={setFieldValue}
                  error={getBabyError(errors, index, 'difficulties')}
                />

                <SubOptionsContainer>
                  <GestationWeeksContainer>
                    <FormPickerInput
                      label="Idade gestacional ao nascer"
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
                      placeholder="Semanas"
                      onChange={setFieldValue}
                      error={getBabyError(errors, index, 'gestationWeeks')}
                    />
                  </GestationWeeksContainer>
                  <GestationDaysContainer>
                    <FormPickerInput
                      label=""
                      fieldName={`babies[${index}].gestationDays`}
                      options={['6', '5', '4', '3', '2', '1', '0']}
                      placeholder="Dias"
                      onChange={setFieldValue}
                      error={getBabyError(errors, index, 'gestationDays')}
                    />
                  </GestationDaysContainer>
                </SubOptionsContainer>

                <ApgarTextHeader>Apgar (Opcional)</ApgarTextHeader>
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
                    <ApgarText>e</ApgarText>
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
                    <Image source={helpIcon} height={22} width={22} />
                  </ApgarHelpButton>
                </SubOptionsContainer>
                <FormRadioGroupInput
                  label="Ao nascer, seu bebê foi para:"
                  fieldName={`babies[${index}].birthLocation`}
                  options={[
                    'Alojamento conjunto',
                    'UCI Neonatal',
                    'UTI Neonatal',
                  ]}
                  onChange={setFieldValue}
                  error={getBabyError(errors, index, 'birthLocation')}
                />
              </View>
            ))}

            <SubmitButtonContainer>
              <FirstSubOptionContainer>
                <SecondaryButton
                  onPress={() => navigation.goBack()}
                  text="Voltar"
                />
              </FirstSubOptionContainer>
              <SecondSubOptionContainer>
                <MainButton
                  onPress={handleSubmit}
                  disabled={!dirty || isSendingForm}
                  text={isSendingForm ? 'Enviando...' : 'Salvar'}
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
