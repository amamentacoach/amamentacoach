import React from 'react';

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import FormDateInput from '../../../components/FormDateInput';
import FormPickerInput from '../../../components/FormPickerInput';
import FormRadioGroupInput from '../../../components/FormRadioGroup';
import FormTextInput from '../../../components/FormTextInput';
import MainButton from '../../../components/MainButton';
import SecondaryButton from '../../../components/SecondaryButton';
import { MotherSignUpInfo } from '../../../services/auth';

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
  yearsSpentBreastFeeding: string;
  monthsSpentBreastFeeding: string;
  alreadyBreastfeed: string;
  partner: string;
  liveTogether: string;
  partnerTime: string;
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
  yearsSpentBreastFeeding: Yup.number().when('alreadyBreastfeed', {
    is: 'Sim',
    then: Yup.number()
      .integer('Deve ser um número inteiro')
      .typeError('Deve ser um número inteiro')
      .min(0, 'Dever ser maior ou igual a zero')
      .required('Campo obrigatório'),
    otherwise: Yup.number(),
  }),
  monthsSpentBreastFeeding: Yup.number().when('alreadyBreastfeed', {
    is: 'Sim',
    then: Yup.number()
      .integer('Deve ser um número inteiro')
      .typeError('Deve ser um número inteiro')
      .min(0, 'Dever ser maior ou igual a zero')
      .required('Campo obrigatório'),
    otherwise: Yup.number(),
  }),
  partner: Yup.string().required('Campo obrigatório'),
  liveTogether: Yup.string().required('Campo obrigatório'),
  partnerTime: Yup.string().when('liveTogether', {
    is: 'Sim',
    then: Yup.string().required('Campo obrigatório'),
    otherwise: Yup.string(),
  }),
  education: Yup.string().required('Campo obrigatório'),
  wage: Yup.string().required('Campo obrigatório'),
  plannedPregnancy: Yup.string().required('Campo obrigatório'),
  firstVisit: Yup.string().required('Campo obrigatório'),
  firstStimulus: Yup.string().required('Campo obrigatório'),
  timeFirstStimulus: Yup.string().required('Campo obrigatório'),
  childrenAlive: Yup.string().required('Campo obrigatório'),
  preNatalGuidance: Yup.string().required('Campo obrigatório'),
  occupation: Yup.string().required('Campo obrigatório'),
  maternityLeave: Yup.string().required('Campo obrigatório'),
  maternityLeaveCount: Yup.number()
    .when('maternityLeave', {
      is: 'Sim',
      then: Yup.number().required('Campo obrigatório'),
      otherwise: Yup.number(),
    })
    .integer('Deve ser um número inteiro')
    .typeError('Deve ser um número inteiro')
    .min(0, 'Deve ser maior ou igual a zero'),
}).required();

const MotherForm: React.FC = () => {
  const navigation = useNavigation();
  const { email, password } = useRoute<
    RouteProp<IScreenParams, 'MotherForm'>
  >().params;

  const formInitialValues: FormValues = {
    name: '',
    birthday: '',
    ddd: '',
    phone: '',
    pregnantCount: '',
    yearsSpentBreastFeeding: '',
    monthsSpentBreastFeeding: '',
    alreadyBreastfeed: '',
    partner: '',
    liveTogether: 'Não',
    partnerTime: '',
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
      timeSpentBreastFeeding:
        formValues.yearsSpentBreastFeeding &&
        formValues.monthsSpentBreastFeeding
          ? `${formValues.yearsSpentBreastFeeding},${formValues.monthsSpentBreastFeeding}`
          : '0,0',
      partner: formValues.partner.toLowerCase() === 'sim',
      liveTogether: formValues.partnerTime,
      education: formValues.education,
      wage: formValues.wage,
      plannedPregnancy: formValues.plannedPregnancy.toLowerCase() === 'sim',
      firstVisit: formValues.firstVisit,
      firstStimulus: formValues.firstStimulus.toLowerCase() === 'sucção',
      timeFirstStimulus: formValues.timeFirstStimulus,
      childrenAlive: formValues.childrenAlive,
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
      <HeaderText>Passo 2 de 4</HeaderText>
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
                  setFieldValue('yearsSpentBreastFeeding', '0');
                  setFieldValue('monthsSpentBreastFeeding', '0');
                  return;
                }

                setFieldValue('pregnantCount', text);
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
                onChange={(fieldName, fieldValues) =>
                  setFieldValue(fieldName, fieldValues[0])
                }
                options={['Sim', 'Não']}
                error={errors.alreadyBreastfeed}
              />
            )}

            {values.alreadyBreastfeed === 'Sim' && (
              <SubOptionsContainer>
                <FirstSubOptionContainer>
                  <FormPickerInput
                    label="Por quantos anos?"
                    fieldName="yearsSpentBreastFeeding"
                    onChange={(fieldName, fieldValues) =>
                      setFieldValue(fieldName, fieldValues[0])
                    }
                    error={errors.yearsSpentBreastFeeding}
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
                    label="Por quantos meses?"
                    fieldName="monthsSpentBreastFeeding"
                    onChange={(fieldName, fieldValues) =>
                      setFieldValue(fieldName, fieldValues[0])
                    }
                    error={errors.monthsSpentBreastFeeding}
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
                  <OptionPickerContainer>
                    <FormPickerInput
                      label="Há quanto tempo moram juntos?"
                      fieldName="partnerTime"
                      onChange={setFieldValue}
                      error={errors.partnerTime}
                      options={['Até 1 ano', '2 a 4 anos', 'Mais que 5 anos']}
                    />
                  </OptionPickerContainer>
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
                  'Até 1 salário',
                  'De 2 e 3 salários',
                  '4 ou mais salários',
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
                label="Qual foi o primeiro estímulo realizado em suas mamas?"
                fieldName="firstStimulus"
                onChange={setFieldValue}
                error={errors.firstStimulus}
                options={[
                  'Ainda não realizou nenhum estímulo',
                  'Massagem/Ordenha',
                  'Sucção',
                ]}
              />
            </OptionPickerContainer>

            <OptionPickerContainer>
              <FormPickerInput
                label="Quanto tempo após o nascimento do bebê foi realizado o primeiro estímulo?"
                fieldName="timeFirstStimulus"
                onChange={setFieldValue}
                error={errors.timeFirstStimulus}
                options={['Em até 1h', '1-6h', '7-12h', '13-24h', '2d', '3d']}
              />
            </OptionPickerContainer>

            <OptionPickerContainer>
              <FormPickerInput
                label="Você possui quantos filhos vivos?"
                fieldName="childrenAlive"
                onChange={setFieldValue}
                error={errors.childrenAlive}
                options={['Nenhum filho', '1 ou 2 filhos', '3 ou mais filhos']}
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
