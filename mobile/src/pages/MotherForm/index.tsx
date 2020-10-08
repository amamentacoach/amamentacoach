import React from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import MainButton from '../../components/MainButton';
import SecondaryButton from '../../components/SecondaryButton';
import FormRadioGroupInput from '../../components/FormRadioGroup';
import FormTextInput from '../../components/FormTextInput';
import FormDateInput from '../../components/FormDateInput';
import FormPickerInput from '../../components/FormPickerInput';
import { useAuth } from '../../contexts/auth';

import {
  Container,
  ScrollView,
  Header,
  HeaderText,
  HeaderSubText,
  FormContainer,
  MarriedSubOptionsContainer,
  MarriedTimeContainer,
  MarriedMetricContainer,
  SubmitButtonContainer,
  FirstSubOptionContainer,
  SecondSubOptionContainer,
} from './styles';

interface IFormValues {
  name: string;
  birthday: string;
  pregnantCount: string;
  alreadyBreastfeed: string;
  married: string;
  liveTogether: string;
  marriedTime: string;
  marriedMetric: string;
  education: string;
  wage: string;
}

type IScreenParams = {
  MotherForm: {
    email: string;
    password: string;
  };
};

const MotherForm: React.FC = () => {
  const navigation = useNavigation();
  const { signUp } = useAuth();
  const { email, password } = useRoute<
    RouteProp<IScreenParams, 'MotherForm'>
  >().params;

  const formInitialValues: IFormValues = {
    name: '',
    birthday: '',
    pregnantCount: '',
    alreadyBreastfeed: '',
    married: '',
    liveTogether: 'Não',
    marriedTime: '0',
    marriedMetric: 'meses',
    education: '',
    wage: '',
  };
  const MotherFormSchema: Yup.ObjectSchema<IFormValues> = Yup.object({
    name: Yup.string().required('Campo obrigatório'),
    birthday: Yup.string().required('Campo obrigatório'),
    pregnantCount: Yup.string()
      .matches(new RegExp('^\\d+$'), 'Deve ser um número positivo')
      .required('Campo obrigatório'),
    alreadyBreastfeed: Yup.string().required('Campo obrigatório'),
    married: Yup.string().required('Campo obrigatório'),
    liveTogether: Yup.string().required('Campo obrigatório'),
    marriedTime: Yup.string().required('Campo obrigatório'),
    marriedMetric: Yup.string().required('Campo obrigatório'),
    education: Yup.string().required('Campo obrigatório'),
    wage: Yup.string().required('Campo obrigatório'),
  }).required();

  function registerNewMother(formValue: IFormValues) {
    const married: boolean = formValue.married === 'Sim';
    const alreadyBreastfeed: boolean = formValue.alreadyBreastfeed === 'Sim';
    const liveTogether: string | null =
      formValue.married !== 'Não'
        ? `${formValue.marriedTime} ${formValue.marriedMetric}`
        : null;
    const pregnantCount: number = parseInt(formValue.pregnantCount, 10);

    const motherInfo = {
      email,
      password,
      alreadyBreastfeed,
      married,
      liveTogether,
      pregnantCount,
      name: formValue.name,
      birthday: formValue.birthday,
      education: formValue.education,
      wage: formValue.wage,
    };
    signUp(motherInfo);
    navigation.navigate('BabyForm');
  }

  return (
    <Container>
      <ScrollView>
        <Header>
          <HeaderText>Passo 2 de 3</HeaderText>
          <HeaderSubText>
            Agora, faremos uma série de perguntas sobre você, mamãe, para trazer
            o conteúdo mais adequado para a sua realidade:
          </HeaderSubText>
        </Header>
        <Formik
          initialValues={formInitialValues}
          validationSchema={MotherFormSchema}
          validateOnChange={false}
          onSubmit={(values) => registerNewMother(values)}>
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
                label="Seu Nome"
                error={errors.name}
                onChangeText={handleChange('name')}
                value={values.name}
                placeholder="Nome"
              />

              <FormDateInput
                label="Sua data de nascimento"
                name="birthday"
                onChange={setFieldValue}
                error={errors.birthday}
                placeholder="Data de nascimento"
              />

              <FormTextInput
                label="Quantas vezes já esteve grávida? (contando abortos)"
                value={values.pregnantCount}
                onChangeText={handleChange('pregnantCount')}
                error={errors.pregnantCount}
                placeholder="Insira o número de vezes"
                keyboardType="numeric"
              />

              <FormRadioGroupInput
                label="Você já amamentou antes?"
                name="alreadyBreastfeed"
                onChange={setFieldValue}
                options={['Sim', 'Não']}
                error={errors.alreadyBreastfeed}
              />

              <FormRadioGroupInput
                label="Tem companheiro?"
                name="married"
                onChange={(fieldName: string, fieldValue: string) => {
                  setFieldValue(fieldName, fieldValue);
                  if (fieldValue === 'Não') {
                    setFieldValue('marriedTime', '0');
                    setFieldValue('liveTogether', 'Não');
                  } else if (fieldValue === 'Sim') {
                    // Reinicia os campos abaixo quando o valor do campo married é 'Sim'.
                    setFieldValue('marriedTime', '');
                    setFieldValue('liveTogether', '');
                  }
                  setFieldValue('marriedMetric', 'meses');
                }}
                options={['Sim', 'Não']}
                error={errors.married}
              />

              {values.married === 'Sim' && (
                <>
                  <FormRadioGroupInput
                    label="Moram juntos?"
                    name="liveTogether"
                    onChange={setFieldValue}
                    options={['Sim', 'Não']}
                    error={errors.liveTogether}
                  />

                  <MarriedSubOptionsContainer>
                    <MarriedTimeContainer>
                      <FormPickerInput
                        label="Há quanto tempo?"
                        name="marriedTime"
                        onChange={setFieldValue}
                        error={errors.marriedTime}
                        options={['1 a 3', '4 a 6', '7 a 9', '10 ou mais']}
                      />
                    </MarriedTimeContainer>
                    <MarriedMetricContainer>
                      <FormPickerInput
                        label=""
                        placeholder=""
                        name="marriedMetric"
                        onChange={setFieldValue}
                        error={errors.marriedMetric}
                        options={['meses', 'anos']}
                      />
                    </MarriedMetricContainer>
                  </MarriedSubOptionsContainer>
                </>
              )}

              <FormPickerInput
                label="Qual sua escolaridade?"
                name="education"
                onChange={setFieldValue}
                error={errors.education}
                options={[
                  'Fundamental incompleto',
                  'Fundamental completo',
                  'Ensino médio incompleto',
                  'Ensino médio completo',
                  'Superior incompleto',
                  'Superior completo',
                ]}
              />

              <FormPickerInput
                label="Em qual faixa sua renda familiar se encaixa?"
                name="wage"
                onChange={setFieldValue}
                error={errors.wage}
                options={[
                  'Até 1 salário mínimo',
                  'Entre 1 e 3 salários mínimos',
                  'Entre 4 e 6 salários mínimos',
                  'Mais que 6 salários mínimos',
                ]}
              />

              <SubmitButtonContainer>
                <FirstSubOptionContainer>
                  <SecondaryButton
                    onPress={() => navigation.goBack()}
                    buttonText="Voltar"
                  />
                </FirstSubOptionContainer>
                <SecondSubOptionContainer>
                  <MainButton
                    onPress={handleSubmit}
                    disabled={!dirty}
                    buttonText="Próximo"
                  />
                </SecondSubOptionContainer>
              </SubmitButtonContainer>
            </FormContainer>
          )}
        </Formik>
      </ScrollView>
    </Container>
  );
};

export default MotherForm;
