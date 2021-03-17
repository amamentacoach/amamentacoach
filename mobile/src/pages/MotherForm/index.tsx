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
  ScrollView,
  HeaderText,
  HeaderSubText,
  FormContainer,
  PartnerSubOptionsContainer,
  PartnerTimeContainer,
  PartnerMetricContainer,
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
  alreadyBreastfeed: string[];
  partner: string[];
  liveTogether: string[];
  partnerTime: string;
  partnerMetric: string;
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
    alreadyBreastfeed: [],
    partner: [],
    liveTogether: ['Não'],
    partnerTime: '0',
    partnerMetric: 'meses',
    education: '',
    wage: '',
  };
  const motherFormSchema = Yup.object({
    name: Yup.string().required('Campo obrigatório'),
    birthday: Yup.string().required('Campo obrigatório'),
    alreadyBreastfeed: Yup.array(Yup.string().required()).required(
      'Campo obrigatório',
    ),
    pregnantCount: Yup.number()
      .integer('Deve ser um inteiro')
      .typeError('Deve ser um inteiro')
      .min(0, 'Dever ser maior ou igual a zero')
      .required('Campo obrigatório'),
    timeSpentBreastFeeding: Yup.array()
      .of(
        Yup.object({
          id: Yup.number().required(),
          value: Yup.string(),
        }).required(),
      )
      .defined(),
    partner: Yup.array(Yup.string().required()).required('Campo obrigatório'),
    liveTogether: Yup.array(Yup.string().required()).required(
      'Campo obrigatório',
    ),
    partnerTime: Yup.string().required('Campo obrigatório'),
    partnerMetric: Yup.string().required('Campo obrigatório'),
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
    if (!newBreastFeedingCount && newBreastFeedingCount !== 0) {
      setFieldValue('pregnantCount', '');
      setBreastFeedingCount(0);
      setFieldValue('timeSpentBreastFeeding', []);
      return;
    }
    // Limita o formulário a um máximo de 20 bebês.
    if (newBreastFeedingCount > 20) {
      return;
    }

    setFieldValue('pregnantCount', newBreastFeedingCount.toString());
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
      alreadyBreastfeed:
        formValues.alreadyBreastfeed[0].toLowerCase() === 'sim',
      partner: formValues.partner[0].toLowerCase() === 'sim',
      liveTogether:
        formValues.partner[0].toLowerCase() === 'sim'
          ? `${formValues.partnerTime} ${formValues.partnerMetric}`
          : null,
      pregnantCount: parseInt(formValues.pregnantCount, 10),
      name: formValues.name,
      birthday: formValues.birthday,
      education: formValues.education,
      wage: formValues.wage,
      timeSpentBreastFeeding:
        formValues.alreadyBreastfeed[0].toLowerCase() === 'sim'
          ? formValues.timeSpentBreastFeeding.map(item => item.value)
          : [],
    };
    navigation.navigate('BabyForm', { motherInfo });
  }

  return (
    <ScrollView>
      <HeaderText>Passo 2 de 3</HeaderText>
      <HeaderSubText>
        Agora, faremos uma série de perguntas sobre você, mamãe, para trazer o
        conteúdo mais adequado para a sua realidade:
      </HeaderSubText>
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
                setFieldValue('alreadyBreastfeed', ['Não']);
              }}
              placeholder="Insira o número de vezes"
              keyboardType="numeric"
              error={errors.pregnantCount}
            />

            {values.pregnantCount !== '0' && values.pregnantCount !== '' && (
              <FormRadioGroupInput
                label="Você já amamentou antes?"
                fieldName="alreadyBreastfeed"
                onChange={setFieldValue}
                options={['Sim', 'Não']}
                error={errors.alreadyBreastfeed}
              />
            )}

            {values.alreadyBreastfeed[0] === 'Sim' &&
              values.timeSpentBreastFeeding.map((item, index) => (
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
              label="Tem companheiro?"
              fieldName="partner"
              onChange={(fieldName: string, fieldValue: string[]) => {
                setFieldValue(fieldName, fieldValue);
                if (fieldValue[0] === 'Não') {
                  setFieldValue('partnerTime', '0');
                  setFieldValue('liveTogether', ['Não']);
                } else if (fieldValue[0] === 'Sim') {
                  // Reinicia os campos abaixo quando o valor do campo partner é 'Sim'.
                  setFieldValue('partnerTime', '');
                  setFieldValue('liveTogether', []);
                }
                setFieldValue('partnerMetric', 'meses');
              }}
              options={['Sim', 'Não']}
              error={errors.partner}
            />

            {values.partner[0] === 'Sim' && (
              <>
                <FormRadioGroupInput
                  label="Moram juntos?"
                  fieldName="liveTogether"
                  onChange={setFieldValue}
                  options={['Sim', 'Não']}
                  error={errors.liveTogether}
                />

                <PartnerSubOptionsContainer>
                  <PartnerTimeContainer>
                    <FormPickerInput
                      label="Há quanto tempo?"
                      fieldName="partnerTime"
                      onChange={setFieldValue}
                      error={errors.partnerTime}
                      options={['1 a 3', '4 a 6', '7 a 9', '10 ou mais']}
                    />
                  </PartnerTimeContainer>
                  <PartnerMetricContainer>
                    <FormPickerInput
                      label=""
                      placeholder=""
                      fieldName="partnerMetric"
                      onChange={setFieldValue}
                      error={errors.partnerMetric}
                      options={['meses', 'anos']}
                    />
                  </PartnerMetricContainer>
                </PartnerSubOptionsContainer>
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
                  text="Voltar"
                />
              </FirstSubOptionContainer>
              <SecondSubOptionContainer>
                <MainButton
                  onPress={handleSubmit}
                  disabled={!dirty}
                  text="Próximo"
                />
              </SecondSubOptionContainer>
            </SubmitButtonContainer>
          </FormContainer>
        )}
      </Formik>
    </ScrollView>
  );
};

export default MotherForm;
