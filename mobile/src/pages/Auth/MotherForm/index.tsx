import React, { useState } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { MotherSignUpInfo } from '../../../services/auth';
import MainButton from '../../../components/MainButton';
import SecondaryButton from '../../../components/SecondaryButton';
import FormRadioGroupInput from '../../../components/FormRadioGroup';
import FormTextInput from '../../../components/FormTextInput';
import FormDateInput from '../../../components/FormDateInput';
import FormPickerInput from '../../../components/FormPickerInput';

import {
  ScrollView,
  HeaderText,
  HeaderSubText,
  FormContainer,
  PhoneInputContainer,
  DDDContainer,
  SubmitButtonContainer,
  FirstSubOptionContainer,
  SecondSubOptionContainer,
  SubOptionsContainer,
  OptionPickerContainer,
} from './styles';

interface FormValues {
  name: string;
  birthday: string;
  ddd: string;
  phone: string;
  pregnantCount: string;
  timeSpentBreastFeeding: {
    id: number;
    value: string;
  }[];
  alreadyBreastfeed: string;
  partner: string;
  liveTogether: string;
  partnerYears: string;
  partnerMonths: string;
  education: string;
  wage: string;
  plannedPregnancy: string;
  firstVisit: string;
  firstStimulus: string;
  timeFirstStimulus: string;
  childrenAlive: string;
  preNatalGuidance: string;
  occupation: string;
  maternityLeave: string;
  maternityLeaveCount: string;
}

type IScreenParams = {
  MotherForm: {
    email: string;
    password: string;
  };
};

const MotherForm: React.FC = () => {
  const navigation = useNavigation();
  const [pregnantCount, setPregnantCount] = useState({
    previous: 0,
    current: 0,
  });
  const { email, password } = useRoute<
    RouteProp<IScreenParams, 'MotherForm'>
  >().params;

  const formInitialValues: FormValues = {
    name: '',
    birthday: '',
    ddd: '',
    phone: '',
    pregnantCount: '',
    timeSpentBreastFeeding: [],
    alreadyBreastfeed: '',
    partner: '',
    liveTogether: 'Não',
    partnerYears: '0',
    partnerMonths: '0',
    education: '',
    wage: '',
    plannedPregnancy: '',
    firstVisit: '',
    firstStimulus: '',
    timeFirstStimulus: '',
    childrenAlive: '',
    preNatalGuidance: '',
    occupation: '',
    maternityLeave: '',
    maternityLeaveCount: '',
  };

  const motherFormSchema = Yup.object({
    name: Yup.string().required('Campo obrigatório'),
    birthday: Yup.string().required('Campo obrigatório'),
    ddd: Yup.number()
      .integer('Deve ser um número inteiro')
      .typeError('Deve ser um número inteiro')
      .min(10, 'Deve ser maior ou igual a 10')
      .max(99, 'Deve ser menor que 100')
      .required('Campo obrigatório'),
    phone: Yup.number()
      .integer('Deve ser um número inteiro')
      .typeError('Deve ser um número inteiro')
      .min(100000000, 'Deve possuir 9 dígitos')
      .max(999999999, 'Deve possuir 9 dígitos')
      .required('Campo obrigatório'),
    alreadyBreastfeed: Yup.string().required('Campo obrigatório'),
    pregnantCount: Yup.number()
      .integer('Deve ser um número inteiro')
      .typeError('Deve ser um número inteiro')
      .min(0, 'Dever ser maior ou igual a zero')
      .required('Campo obrigatório'),
    timeSpentBreastFeeding: Yup.array()
      .of(
        Yup.object({
          id: Yup.number().required(),
          value: Yup.string().test(
            'selected',
            'Campo obrigatório',
            (value: any) => !!value,
          ),
        }).required(),
      )
      .defined(),
    partner: Yup.string().required('Campo obrigatório'),
    liveTogether: Yup.string().required('Campo obrigatório'),
    partnerYears: Yup.string().required('Campo obrigatório'),
    partnerMonths: Yup.string().required('Campo obrigatório'),
    education: Yup.string().required('Campo obrigatório'),
    wage: Yup.string().required('Campo obrigatório'),
    plannedPregnancy: Yup.string().required('Campo obrigatório'),
    firstVisit: Yup.string().required('Campo obrigatório'),
    firstStimulus: Yup.string().required('Campo obrigatório'),
    timeFirstStimulus: Yup.string().required('Campo obrigatório'),
    childrenAlive: Yup.number()
      .integer('Deve ser um número inteiro')
      .typeError('Deve ser um número inteiro')
      .min(0, 'Deve ser maior ou igual a zero')
      .max(100, 'Deve ser menor ou igual a 100')
      .required('Campo obrigatório'),
    preNatalGuidance: Yup.string().required('Campo obrigatório'),
    occupation: Yup.string().required('Campo obrigatório'),
    maternityLeave: Yup.string().required('Campo obrigatório'),
    maternityLeaveCount: Yup.number()
      .when('maternityLeave', {
        is: 'Não',
        then: Yup.number(),
        otherwise: Yup.number().required('Campo obrigatório'),
      })
      .integer('Deve ser um número inteiro')
      .typeError('Deve ser um número inteiro')
      .min(0, 'Deve ser maior ou igual a zero'),
  }).required();

  function validateBreastFeedingCount(newFieldValue: string): boolean {
    // Caso o texto possua caracteres não numéricos ele é ignorado.
    if (newFieldValue !== '' && !new RegExp('^\\d+$').test(newFieldValue)) {
      return false;
    }
    const newBreastFeedingCount = parseInt(newFieldValue, 10);
    // Limita o formulário a um máximo de 20 bebês.
    if (newBreastFeedingCount > 20) {
      return false;
    }
    return true;
  }

  // Adiciona ou remove um bebê de acordo com a entrada do usuário.
  function handleNewTimeBreastFeeding(
    timeSpentBreastFeeding: { id: number; value: string }[],
    setFieldValue: (field: string, value: any) => void,
  ) {
    const { previous, current } = pregnantCount;

    let newTimeSpentBreastFeeding = [...timeSpentBreastFeeding];
    for (let index = 0; index < Math.abs(current - previous); index++) {
      if (current > previous) {
        // Caso o novo valor seja maior que o anterior é necessário criar novos objetos e
        // adiciona-los a lista existente.
        newTimeSpentBreastFeeding = [
          ...newTimeSpentBreastFeeding,
          { id: previous + index + 1, value: '' },
        ];
      } else if (current < previous) {
        // Caso o novo valor seja menor que o anterior é necessário remover os n últimos objetos
        // existentes.
        newTimeSpentBreastFeeding.pop();
      }
    }
    setFieldValue('timeSpentBreastFeeding', newTimeSpentBreastFeeding);
  }

  // Avança para a próxima página passando as informações do usuário.
  function handleFormSubmit(formValues: FormValues) {
    const motherInfo: MotherSignUpInfo = {
      email,
      password,
      name: formValues.name,
      birthday: formValues.birthday,
      phone: `${formValues.ddd}${formValues.phone}`,
      alreadyBreastfeed: formValues.alreadyBreastfeed.toLowerCase() === 'sim',
      pregnantCount: parseInt(formValues.pregnantCount, 10),
      timeSpentBreastFeeding: formValues.timeSpentBreastFeeding.map(
        item => item.value,
      ),
      partner: formValues.partner.toLowerCase() === 'sim',
      liveTogether:
        formValues.partnerYears !== '0' && formValues.partnerMonths !== '0'
          ? `${formValues.partnerYears},${formValues.partnerMonths}`
          : null,
      education: formValues.education,
      wage: formValues.wage,
      plannedPregnancy: formValues.plannedPregnancy.toLowerCase() === 'sim',
      firstVisit: formValues.firstVisit,
      firstStimulus: formValues.firstStimulus.toLowerCase() === 'sucção',
      timeFirstStimulus: formValues.timeFirstStimulus,
      childrenAlive: parseInt(formValues.childrenAlive, 10),
      receivedPreNatalGuidance:
        formValues.preNatalGuidance.toLowerCase() === 'sim',
      occupation:
        formValues.occupation.toLowerCase() ===
        'fora de casa (alguma outra ocupação)',
      maternityLeave:
        formValues.maternityLeave.toLowerCase() === 'sim'
          ? parseInt(formValues.maternityLeaveCount, 10)
          : null,
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

            <SubOptionsContainer>
              <DDDContainer>
                <FormTextInput
                  label="DDD"
                  error={errors.ddd}
                  onChangeText={handleChange('ddd')}
                  value={values.ddd}
                  placeholder="DDD"
                  keyboardType="number-pad"
                  centerText
                />
              </DDDContainer>

              <PhoneInputContainer>
                <FormTextInput
                  label="Telefone"
                  error={errors.phone}
                  onChangeText={handleChange('phone')}
                  value={values.phone}
                  placeholder="Telefone"
                  keyboardType="phone-pad"
                />
              </PhoneInputContainer>
            </SubOptionsContainer>

            <FormTextInput
              label="Quantas vezes já esteve grávida? (contando abortos)"
              value={values.pregnantCount}
              onChangeText={(text: string) => {
                if (text === '') {
                  setFieldValue('pregnantCount', text);
                  // Limpa os campos de seleção abaixo
                  setFieldValue('alreadyBreastfeed', 'Não');
                  setPregnantCount({
                    previous: pregnantCount.current,
                    current: 0,
                  });
                  setFieldValue('timeSpentBreastFeeding', []);
                  return;
                }

                if (!validateBreastFeedingCount(text)) {
                  return;
                }

                setFieldValue('pregnantCount', text);
                setPregnantCount({
                  previous: pregnantCount.current,
                  current: parseInt(text, 10),
                });
                if (text !== '0') {
                  setFieldValue('alreadyBreastfeed', '');
                } else {
                  setFieldValue('alreadyBreastfeed', 'Não');
                }
              }}
              placeholder="Insira o número de vezes"
              keyboardType="numeric"
              error={errors.pregnantCount}
            />

            {values.pregnantCount !== '0' && values.pregnantCount !== '' && (
              <FormRadioGroupInput
                label="Você já amamentou antes?"
                fieldName="alreadyBreastfeed"
                onChange={(fieldName, fieldValue) => {
                  setFieldValue(fieldName, fieldValue[0]);
                  if (fieldValue[0] === 'Não') {
                    setFieldValue('timeSpentBreastFeeding', []);
                    return;
                  }

                  handleNewTimeBreastFeeding(
                    values.timeSpentBreastFeeding,
                    setFieldValue,
                  );
                }}
                options={['Sim', 'Não']}
                error={errors.alreadyBreastfeed}
              />
            )}

            {values.alreadyBreastfeed === 'Sim' &&
              values.timeSpentBreastFeeding.map((item, index) => (
                <OptionPickerContainer key={item.id}>
                  <FormPickerInput
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
                </OptionPickerContainer>
              ))}

            <FormRadioGroupInput
              label="Tem companheiro?"
              fieldName="partner"
              onChange={(fieldName: string, fieldValue: string[]) => {
                setFieldValue(fieldName, fieldValue[0]);
                if (fieldValue[0] === 'Não') {
                  setFieldValue('liveTogether', 'Não');
                  setFieldValue('partnerYears', '0');
                  setFieldValue('partnerMonths', '0');
                } else if (fieldValue[0] === 'Sim') {
                  setFieldValue('liveTogether', '');
                }
              }}
              options={['Sim', 'Não']}
              error={errors.partner}
            />

            {values.partner === 'Sim' && (
              <>
                <FormRadioGroupInput
                  label="Moram juntos?"
                  fieldName="liveTogether"
                  onChange={(fieldName: string, fieldValue: string[]) => {
                    setFieldValue(fieldName, fieldValue[0]);
                    if (fieldValue[0] === 'Não') {
                      setFieldValue('partnerYears', '0');
                      setFieldValue('partnerMonths', '0');
                    } else if (fieldValue[0] === 'Sim') {
                      setFieldValue('partnerYears', '');
                      setFieldValue('partnerMonths', '');
                    }
                  }}
                  options={['Sim', 'Não']}
                  error={errors.liveTogether}
                />

                {values.liveTogether === 'Sim' && (
                  <SubOptionsContainer>
                    <FirstSubOptionContainer>
                      <FormPickerInput
                        label="Há quantos anos?"
                        fieldName="partnerYears"
                        onChange={setFieldValue}
                        error={errors.partnerYears}
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
                          '10 ou mais',
                        ]}
                      />
                    </FirstSubOptionContainer>
                    <SecondSubOptionContainer>
                      <FormPickerInput
                        label="Há quantos meses?"
                        fieldName="partnerMonths"
                        onChange={setFieldValue}
                        error={errors.partnerMonths}
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
                    </SecondSubOptionContainer>
                  </SubOptionsContainer>
                )}
              </>
            )}

            <OptionPickerContainer>
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
            </OptionPickerContainer>

            <OptionPickerContainer>
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
            </OptionPickerContainer>

            <OptionPickerContainer>
              <FormPickerInput
                label="A gestação foi planejada?"
                fieldName="plannedPregnancy"
                onChange={setFieldValue}
                error={errors.plannedPregnancy}
                options={['Sim', 'Não']}
              />
            </OptionPickerContainer>

            <OptionPickerContainer>
              <FormPickerInput
                label="Quanto tempo após o parto você fez a primeira visita ao seu bebe?"
                fieldName="firstVisit"
                onChange={setFieldValue}
                error={errors.firstVisit}
                options={['12h', '13-24h', '2 dias', '3 dias']}
              />
            </OptionPickerContainer>

            <OptionPickerContainer>
              <FormPickerInput
                label="Qual foi o primeiro estímulo a ser feito na sua mama?"
                fieldName="firstStimulus"
                onChange={setFieldValue}
                error={errors.firstStimulus}
                options={['Massagem/Ordenha', 'Sucção']}
              />
            </OptionPickerContainer>

            <OptionPickerContainer>
              <FormPickerInput
                label="Quanto tempo após o nascimento do bebê foi realizado o primeiro estímulo?"
                fieldName="timeFirstStimulus"
                onChange={setFieldValue}
                error={errors.timeFirstStimulus}
                options={['em até 1h', '1-6h', '7-12h', '13-24h', '2d', '3d']}
              />
            </OptionPickerContainer>

            <OptionPickerContainer>
              <FormTextInput
                label="Você possui quantos filhos vivos?"
                placeholder="Número de filhos"
                onChangeText={handleChange('childrenAlive')}
                value={values.childrenAlive}
                error={errors.childrenAlive}
                keyboardType="number-pad"
              />
            </OptionPickerContainer>

            <OptionPickerContainer>
              <FormPickerInput
                label="Você recebeu orientações no pré-natal sobre aleitamento materno?"
                fieldName="preNatalGuidance"
                onChange={setFieldValue}
                error={errors.preNatalGuidance}
                options={['Sim', 'Não']}
              />
            </OptionPickerContainer>

            <OptionPickerContainer>
              <FormPickerInput
                label="Você trabalha:"
                fieldName="occupation"
                onChange={setFieldValue}
                error={errors.occupation}
                options={[
                  'Em casa (do lar)',
                  'Fora de casa (alguma outra ocupação)',
                ]}
              />
            </OptionPickerContainer>

            <OptionPickerContainer>
              <FormPickerInput
                label="Possui licença maternidade:"
                fieldName="maternityLeave"
                onChange={setFieldValue}
                error={errors.maternityLeave}
                options={['Sim', 'Não']}
              />
            </OptionPickerContainer>

            {values.maternityLeave === 'Sim' && (
              <OptionPickerContainer>
                <FormTextInput
                  label="Quantos meses?"
                  placeholder="Número de meses"
                  onChangeText={handleChange('maternityLeaveCount')}
                  value={values.maternityLeaveCount}
                  error={errors.maternityLeaveCount}
                  keyboardType="number-pad"
                />
              </OptionPickerContainer>
            )}

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
