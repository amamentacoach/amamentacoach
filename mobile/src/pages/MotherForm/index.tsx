import React, { useState } from 'react';
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
  birthday: string;
  pregnantCount: string;
  timeSpentBreastFeeding: {
    id: number;
    value: string;
  }[];
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
  const [breastFeedingCount, setBreastFeedingCount] = useState(0);
  const { email, password } = useRoute<
    RouteProp<IScreenParams, 'MotherForm'>
  >().params;

  const formInitialValues: IFormValues = {
    name: '',
    birthday: '',
    pregnantCount: '',
    timeSpentBreastFeeding: [],
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
      .matches(new RegExp('^\\d+$'), 'Deve ser um número inteiro positivo')
      .required('Campo obrigatório'),
    timeSpentBreastFeeding: Yup.array()
      .of(
        Yup.object({
          id: Yup.number().required(),
          value: Yup.string().required('Campo obrigatório'),
        }).required(),
      )
      .required(),
    alreadyBreastfeed: Yup.string()
      .when('pregnantCount', {
        is: '0',
        then: Yup.string().oneOf(
          ['Não'],
          'Você deve ter engravidado pelo menos uma vez',
        ),
      })
      .required('Campo obrigatório'),
    married: Yup.string().required('Campo obrigatório'),
    liveTogether: Yup.string().required('Campo obrigatório'),
    marriedTime: Yup.string().required('Campo obrigatório'),
    marriedMetric: Yup.string().required('Campo obrigatório'),
    education: Yup.string().required('Campo obrigatório'),
    wage: Yup.string().required('Campo obrigatório'),
  }).required();

  // Adiciona ou remove um bebê de acordo com a entrada do usuário.
  function handleNewTimeBreastFeeding(
    fieldValue: string,
    timeSpentBreastFeeding: { id: number; value: string }[],
    setFieldValue: (field: string, value: any) => void,
  ) {
    // Caso o texto possua caracteres não numéricos ele é ignorado.
    if (fieldValue !== '' && !new RegExp('^\\d+$').test(fieldValue)) {
      return;
    }

    const newBreastFeedingCount = parseInt(fieldValue, 10);
    // Caso o texto não possa ser convertido para inteiro, limpa o formulário.
    if (!newBreastFeedingCount) {
      setFieldValue('pregnantCount', '');
      setBreastFeedingCount(0);
      setFieldValue('timeSpentBreastFeeding', []);
      return;
    }
    // Limita o formulário a um máximo de 20 bebês.
    if (newBreastFeedingCount > 20) {
      return;
    }

    setFieldValue('pregnantCount', fieldValue);
    let newTimeSpentBreastFeeding = [...timeSpentBreastFeeding];
    for (
      let index = 0;
      index < Math.abs(newBreastFeedingCount - breastFeedingCount);
      index++
    ) {
      if (newBreastFeedingCount > breastFeedingCount) {
        // Caso o novo valor seja maior que o anterior é necessário criar novos objetos e
        // adiciona-los a lista existente.
        newTimeSpentBreastFeeding = [
          ...newTimeSpentBreastFeeding,
          { id: breastFeedingCount + index + 1, value: '' },
        ];
      } else if (newBreastFeedingCount < breastFeedingCount) {
        // Caso o novo valor seja menor que o anterior é necessário remover os n últimos objetos
        // existentes.
        newTimeSpentBreastFeeding.pop();
      }
    }
    setFieldValue('timeSpentBreastFeeding', newTimeSpentBreastFeeding);
    setBreastFeedingCount(newBreastFeedingCount);
  }

  // Avança para a próxima página passando as informações do usuário.
  function handleFormSubmit(formValues: IFormValues) {
    const motherInfo = {
      email,
      password,
      alreadyBreastfeed: formValues.alreadyBreastfeed.toLowerCase() === 'sim',
      married: formValues.married.toLowerCase() === 'sim',
      liveTogether:
        formValues.married.toLowerCase() === 'sim'
          ? null
          : `${formValues.marriedTime} ${formValues.marriedMetric}`,
      pregnantCount: parseInt(formValues.pregnantCount, 10),
      name: formValues.name,
      birthday: formValues.birthday,
      education: formValues.education,
      wage: formValues.wage,
      timeSpentBreastFeeding: formValues.timeSpentBreastFeeding.map(
        (item) => item.value,
      ),
    };
    navigation.navigate('BabyForm', { motherInfo });
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
          onSubmit={(values) => handleFormSubmit(values)}>
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
                fieldName="birthday"
                onChange={setFieldValue}
                placeholder="Data de nascimento"
                error={errors.birthday}
              />

              <FormTextInput
                label="Quantas vezes já esteve grávida? (contando abortos)"
                value={values.pregnantCount}
                onChangeText={(text: string) => {
                  handleNewTimeBreastFeeding(
                    text,
                    values.timeSpentBreastFeeding,
                    setFieldValue,
                  );
                }}
                placeholder="Insira o número de vezes"
                keyboardType="numeric"
                error={errors.pregnantCount}
              />

              {values.timeSpentBreastFeeding.map((item, index) => (
                <FormPickerInput
                  key={item.id}
                  label={`Tempo de amamentação (gravidez ${index + 1})`}
                  fieldName={`timeSpentBreastFeeding[${index}].value`}
                  options={[
                    'Menos de 1 ano',
                    '1 ano',
                    '2 anos',
                    '3 ou mais anos',
                  ]}
                  onChange={setFieldValue}
                  error={
                    errors?.timeSpentBreastFeeding &&
                    errors?.timeSpentBreastFeeding[index]
                      ? (errors?.timeSpentBreastFeeding[index] as {
                          [key: string]: any;
                        }).value
                      : ''
                  }
                />
              ))}

              <FormRadioGroupInput
                label="Você já amamentou antes?"
                fieldName="alreadyBreastfeed"
                onChange={setFieldValue}
                options={['Sim', 'Não']}
                error={errors.alreadyBreastfeed}
              />

              <FormRadioGroupInput
                label="Tem companheiro?"
                fieldName="married"
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
                    fieldName="liveTogether"
                    onChange={setFieldValue}
                    options={['Sim', 'Não']}
                    error={errors.liveTogether}
                  />

                  <MarriedSubOptionsContainer>
                    <MarriedTimeContainer>
                      <FormPickerInput
                        label="Há quanto tempo?"
                        fieldName="marriedTime"
                        onChange={setFieldValue}
                        error={errors.marriedTime}
                        options={['1 a 3', '4 a 6', '7 a 9', '10 ou mais']}
                      />
                    </MarriedTimeContainer>
                    <MarriedMetricContainer>
                      <FormPickerInput
                        label=""
                        placeholder=""
                        fieldName="marriedMetric"
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
                fieldName="education"
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
                fieldName="wage"
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
