import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import 'moment/locale/pt-br';

import { createExtractionEntry } from '../../../services/diaryRegistry';
import MainButton from '../../../components/MainButton';
import FormTextInput from '../../../components/FormTextInput';
import FormDateInput from '../../../components/FormDateInput';

import {
  ScrollView,
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

import UncheckedBox from '../../../../assets/images/icons/checkbox_unchecked.svg';
import CheckedBox from '../../../../assets/images/icons/checkbox_checked.svg';

interface FormValues {
  time: string;
  quantity: string;
  duration: string;
  breastLeft: string;
  breastRight: string;
}

const NewDiaryRegistry: React.FC = () => {
  const navigation = useNavigation();

  const [isSendingForm, setIsSendingForm] = useState(false);
  const formInitialValues = {
    time: '',
    quantity: '',
    duration: '',
    breastLeft: '',
    breastRight: '',
  };
  const newDiaryRegistrySchema = Yup.object()
    .shape(
      {
        time: Yup.string().required('Campo obrigatório'),
        quantity: Yup.number()
          .integer('Deve ser um número inteiro')
          .typeError('Deve ser um número inteiro')
          .positive('Deve ser maior que 0')
          .required('Campo obrigatório'),
        duration: Yup.number()
          .integer('Deve ser um número inteiro')
          .typeError('Deve ser um número inteiro')
          .positive('Deve ser maior que 0')
          .required('Campo obrigatório'),
        breastLeft: Yup.string().when('breastRight', {
          is: undefined,
          then: Yup.string().required(
            'Pelo menos uma opção deve ser selecionada',
          ),
          otherwise: Yup.string(),
        }),
        breastRight: Yup.string().when('breastLeft', {
          is: undefined,
          then: Yup.string().required(
            'Pelo menos uma opção deve ser selecionada',
          ),
          otherwise: Yup.string(),
        }),
      },
      [['breastLeft', 'breastRight']],
    )
    .required();

  // Cria um novo registro no sistema.
  async function handleFormSubmit({
    breastRight,
    breastLeft,
    duration,
    quantity,
    time,
  }: FormValues) {
    let breast = '';
    if (breastLeft && breastRight) {
      breast = `${breastRight},${breastLeft}`;
    } else if (breastLeft) {
      breast = breastLeft;
    } else {
      breast = breastRight;
    }

    setIsSendingForm(true);
    await createExtractionEntry(
      breast,
      parseFloat(quantity),
      parseInt(duration, 10),
      // Transforma o horário em uma data.
      moment(time, ['kk:mm']).toDate(),
    );
    navigation.navigate('DiaryRegistry', { shouldUpdateRegistries: true });
  }

  return (
    <ScrollView>
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
                  onPress={() => {
                    if (values.breastLeft) {
                      setFieldValue('breastLeft', '');
                    } else {
                      setFieldValue('breastLeft', 'E');
                    }
                  }}>
                  {values.breastLeft ? <CheckedBox /> : <UncheckedBox />}
                  <OptionText>Esquerda</OptionText>
                </FirstOption>
                <SecondOption
                  activeOpacity={1}
                  onPress={() => {
                    if (values.breastRight) {
                      setFieldValue('breastRight', '');
                    } else {
                      setFieldValue('breastRight', 'D');
                    }
                  }}>
                  {values.breastRight ? <CheckedBox /> : <UncheckedBox />}
                  <OptionText>Direita</OptionText>
                </SecondOption>
              </MultipleOptionContainer>
              <ErrorContainer>
                {(errors.breastLeft || errors.breastRight) && (
                  <ErrorText>
                    {errors.breastLeft ? errors.breastLeft : errors.breastRight}
                  </ErrorText>
                )}
              </ErrorContainer>
            </FormContent>

            <SubmitButtonContainer>
              <MainButton
                onPress={handleSubmit}
                disabled={!dirty || isSendingForm}
                text={isSendingForm ? 'Salvando...' : 'Salvar'}
              />
            </SubmitButtonContainer>
          </FormContainer>
        )}
      </Formik>
    </ScrollView>
  );
};

export default NewDiaryRegistry;
