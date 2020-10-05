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
  date: string;
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
  FormMother: {
    email: string;
    password: string;
  };
};

const FormMother: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<IScreenParams, 'FormMother'>>();
  const { email, password } = route.params;

  const formInitialValues: IFormValues = {
    name: '',
    date: '',
    pregnantCount: '',
    alreadyBreastfeed: '',
    married: '',
    liveTogether: '',
    marriedTime: '0',
    marriedMetric: 'meses',
    education: '',
    wage: '',
  };
  const FormMotherSchema: Yup.ObjectSchema<IFormValues> = Yup.object({
    name: Yup.string().required('Campo obrigatório'),
    date: Yup.string().required('Campo obrigatório'),
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
          validationSchema={FormMotherSchema}
          validateOnChange={false}
          onSubmit={(values) => {
            console.log(email);
            console.log(password);
            console.log(values);
            // navigation.navigate('FormBaby');
          }}>
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
                name="date"
                onChange={setFieldValue}
                error={errors.date}
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

export default FormMother;
