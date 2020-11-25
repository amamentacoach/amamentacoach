import React, { useState } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import 'moment/locale/pt-br';

import { createNewDiaryRegistry } from '../../services/diaryRegistry';
import { useAuth } from '../../contexts/auth';
import MainButton from '../../components/MainButton';
import FormTextInput from '../../components/FormTextInput';
import FormDateInput from '../../components/FormDateInput';
import FormPickerInput from '../../components/FormPickerInput';

import {
  ScrollView,
  HeaderText,
  FormContainer,
  SubmitButtonContainer,
  FormContent,
  OptionText,
  MultipleOptionContainer,
  OptionHeader,
  FirstOption,
  SecondOption,
  ErrorContainer,
  ErrorText,
} from './styles';

import UncheckedBox from '../../../assets/images/icons/checkbox_unchecked.png';
import CheckedBox from '../../../assets/images/icons/checkbox_checked.png';

interface IFormValues {
  babyName: string;
  time: string;
  quantity: string;
  duration: string;
  breast: string;
}

const NewDiaryRegistry: React.FC = () => {
  const navigation = useNavigation();
  const { motherInfo } = useAuth();

  const [isSendingForm, setIsSendingForm] = useState(false);
  const formInitialValues = {
    babyName: '',
    time: '',
    quantity: '',
    duration: '',
    breast: '',
  };
  const newDiaryRegistrySchema: Yup.ObjectSchema<IFormValues> = Yup.object({
    babyName: Yup.string().required('Campo obrigatório'),
    time: Yup.string().required('Campo obrigatório'),
    quantity: Yup.string()
      .matches(
        new RegExp('^(\\d+(\\.\\d\\d*)?)$'),
        'Deve ser um número positivo. Ex: 3.4',
      )
      .required('Campo obrigatório'),
    duration: Yup.string()
      .matches(new RegExp('^\\d+$'), 'Deve ser um número inteiro positivo')
      .required('Campo obrigatório'),
    breast: Yup.string().required('Campo obrigatório'),
  }).required();

  // Cria um novo registro no sistema.
  async function handleFormSubmit({
    babyName,
    breast,
    duration,
    quantity,
    time,
  }: IFormValues) {
    const selectedBaby = motherInfo.babies.find(
      (baby) => baby.name === babyName,
    );
    if (!selectedBaby) {
      return;
    }

    setIsSendingForm(true);
    await createNewDiaryRegistry(
      selectedBaby.id,
      breast,
      parseFloat(quantity),
      parseInt(duration, 10),
      // Transforma o horário em uma data.
      moment(time, ['kk:mm']).toDate(),
    );
    navigation.navigate('DiaryRegistry');
  }

  return (
    <ScrollView>
      <HeaderText>Registrar retirada de leite</HeaderText>
      <Formik
        initialValues={formInitialValues}
        validationSchema={newDiaryRegistrySchema}
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
            <FormContent>
              <FormPickerInput
                label=""
                fieldName="babyName"
                options={motherInfo.babies.map((baby) => baby.name.toString())}
                placeholder="Selecionar bebê"
                onChange={setFieldValue}
                error={errors.babyName}
              />

              <FormDateInput
                label="Horário"
                fieldName="time"
                placeholder="Insira o horário da retirada"
                mode="time"
                onChange={setFieldValue}
                error={errors.time}
              />

              <FormTextInput
                label="Quantidade"
                value={values.quantity}
                placeholder="Insira a quantidade (ml)"
                keyboardType="number-pad"
                onChangeText={handleChange('quantity')}
                error={errors.quantity}
              />

              <FormTextInput
                label="Duração"
                value={values.duration}
                placeholder="Insira a duração (min)"
                keyboardType="number-pad"
                onChangeText={handleChange('duration')}
                error={errors.duration}
              />

              <OptionHeader>Mama</OptionHeader>
              <MultipleOptionContainer>
                <FirstOption
                  activeOpacity={1}
                  onPress={() => setFieldValue('breast', 'E')}>
                  <Image
                    source={values.breast === 'E' ? CheckedBox : UncheckedBox}
                  />
                  <OptionText>Esquerda</OptionText>
                </FirstOption>
                <SecondOption
                  activeOpacity={1}
                  onPress={() => setFieldValue('breast', 'D')}>
                  <Image
                    source={values.breast === 'D' ? CheckedBox : UncheckedBox}
                  />
                  <OptionText>Direita</OptionText>
                </SecondOption>
              </MultipleOptionContainer>
              <ErrorContainer>
                {errors.breast ? <ErrorText>{errors.breast}</ErrorText> : null}
              </ErrorContainer>
            </FormContent>

            <SubmitButtonContainer>
              <MainButton
                onPress={handleSubmit}
                disabled={!dirty || isSendingForm}
                buttonText={isSendingForm ? 'Salvando...' : 'Salvar'}
              />
            </SubmitButtonContainer>
          </FormContainer>
        )}
      </Formik>
    </ScrollView>
  );
};

export default NewDiaryRegistry;
