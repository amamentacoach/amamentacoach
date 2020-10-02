import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik, FormikErrors } from 'formik';
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
  SubOptionsContainer,
  FirstSubOptionContainer,
  SecondSubOptionContainer,
  BirthAgeWeeksContainer,
  BirthAgeDaysContainer,
  ApgarTextContainer,
  ApgarText,
  SubmitButtonContainer,
} from './styles';

interface Baby {
  id: number;
  name: string;
  birthday: string;
  weight: string;
  birthType: string;
  complications: string;
  birthAgeWeeks: string;
  birthAgeDays: string;
  apgar1: string;
  apgar2: string;
  birthLocation: string;
}

const FormBaby: React.FC = () => {
  const navigation = useNavigation();
  const [babyCount, setBabyCount] = useState(0);

  const FormBabySchema = Yup.object().shape({
    numberOfBabies: Yup.string()
      .matches(new RegExp('^\\d+$'), 'Deve ser um número')
      .required('Campo obrigatório'),
    babies: Yup.array()
      .of(
        Yup.object()
          .shape<Baby>({
            id: Yup.number(),
            name: Yup.string().required('Campo obrigatório'),
            birthday: Yup.string().required('Campo obrigatório'),
            weight: Yup.string()
              .matches(new RegExp('^\\d+$'), 'Deve ser um número')
              .required('Campo obrigatório'),
            birthType: Yup.string().required('Campo obrigatório'),
            complications: Yup.string().required('Campo obrigatório'),
            birthAgeWeeks: Yup.string().required('Campo obrigatório'),
            birthAgeDays: Yup.string().required('Campo obrigatório'),
            apgar1: Yup.string()
              .matches(new RegExp('^\\d+$'), 'Deve ser um número')
              .required('Campo obrigatório'),
            apgar2: Yup.string()
              .matches(new RegExp('^\\d+$'), 'Deve ser um número')
              .required('Campo obrigatório'),
            birthLocation: Yup.string().required('Campo obrigatório'),
          })
          .noUnknown(true),
      )
      .min(1, 'Pelo menos um bebê deve ser cadastrado!')
      .required(),
  });

  // Retorna um objeto Baby vazio.
  function newBaby(babyId: number): Baby {
    return { id: babyId } as Baby;
  }

  // Retorna a mensagem de erro um bebê caso exista.
  function getBabyError(
    errors: FormikErrors<{ numberOfBabies: number; babies: Baby[] }>,
    index: number,
    field: string,
  ) {
    if (errors?.babies && errors?.babies[index]) {
      return (errors.babies[index] as { [key: string]: any })[field];
    }
    return '';
  }

  function handleNewBaby(
    fieldValue: string,
    babies: Baby[],
    setFieldValue: (field: string, value: any) => void,
  ) {
    const newBabyCount = parseInt(fieldValue, 10);
    // Caso o texto possua caracteres não numéricos ele é ignorado.
    if (fieldValue !== '' && !new RegExp('^\\d+$').test(fieldValue)) {
      return;
    }

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

    setFieldValue('numberOfBabies', fieldValue);
    let newBabies = [...babies];
    for (let index = 0; index < Math.abs(newBabyCount - babyCount); index++) {
      if (newBabyCount > babyCount) {
        // Caso o novo valor seja maior que o anterior é necessário criar novos objetos Bebe e
        // adiciona-los a lista existente.
        newBabies = [...newBabies, newBaby(babyCount + index + 1)];
      } else if (newBabyCount < babyCount) {
        // Caso o novo valor seja menor que o anterior é necessário remover os n últimos elementos
        // existentes.
        newBabies.pop();
      }
    }
    setFieldValue('babies', newBabies);
    setBabyCount(newBabyCount);
  }

  return (
    <Container>
      <ScrollView>
        <Header>
          <HeaderText>Passo 3 de 3</HeaderText>
          <HeaderSubText>
            Você está quase lá! Por último, faremos algumas perguntas sobre seu
            bebê:
          </HeaderSubText>
        </Header>
        <Formik
          initialValues={{
            numberOfBabies: '1',
            babies: [newBaby(0)],
          }}
          validationSchema={FormBabySchema}
          validateOnChange={false}
          onSubmit={(values) => {
            console.log(values);
          }}>
          {({
            handleChange,
            handleSubmit,
            setFieldValue,
            dirty,
            errors,
            values,
          }) => (
            <Container>
              <ScrollView>
                <FormContainer>
                  <FormTextInput
                    label="Número de filhos nesta gestação"
                    onChangeText={(text: string) =>
                      handleNewBaby(text, values.babies, setFieldValue)
                    }
                    value={values.numberOfBabies}
                    error={errors.numberOfBabies}
                    placeholder="Insira o número de filhos"
                    keyboardType="number-pad"
                  />

                  {values.babies.map((baby, index) => (
                    <View key={baby.id}>
                      <FormTextInput
                        label="Nome do seu bebê"
                        onChangeText={handleChange(`babies[${index}].name`)}
                        value={values.babies[index].name}
                        error={getBabyError(errors, index, 'name')}
                        placeholder="Nome"
                      />

                      <FormDateInput
                        label="Data do parto"
                        name={`babies[${index}].birthday`}
                        onChange={setFieldValue}
                        error={getBabyError(errors, index, 'birthday')}
                        placeholder="Insira a data do parto"
                      />

                      <FormTextInput
                        label="Peso de nascimento"
                        onChangeText={handleChange(`babies[${index}].weight`)}
                        value={values.babies[index].weight}
                        error={getBabyError(errors, index, 'weight')}
                        placeholder="Insira o peso do bebê ao nascer"
                        keyboardType="number-pad"
                      />

                      <FormRadioGroupInput
                        label="Tipo de parto"
                        name={`babies[${index}].birthType`}
                        error={getBabyError(errors, index, 'birthType')}
                        onChange={setFieldValue}
                        options={['Normal', 'Cesária']}
                      />

                      <FormRadioGroupInput
                        label="Presença de complicação pós-parto?"
                        name={`babies[${index}].complications`}
                        error={getBabyError(errors, index, 'complications')}
                        onChange={setFieldValue}
                        options={['Sim', 'Não']}
                      />

                      <SubOptionsContainer>
                        <BirthAgeWeeksContainer>
                          <FormPickerInput
                            label="Idade gestacional ao nascer"
                            name={`babies[${index}].birthAgeWeeks`}
                            error={getBabyError(errors, index, 'birthAgeWeeks')}
                            onChange={setFieldValue}
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
                          />
                        </BirthAgeWeeksContainer>
                        <BirthAgeDaysContainer>
                          <FormPickerInput
                            label=""
                            name={`babies[${index}].birthAgeDays`}
                            error={getBabyError(errors, index, 'birthAgeDays')}
                            onChange={setFieldValue}
                            options={['6', '5', '4', '3', '2', '1', '0']}
                            placeholder="Dias"
                          />
                        </BirthAgeDaysContainer>
                      </SubOptionsContainer>

                      <SubOptionsContainer>
                        <FirstSubOptionContainer>
                          <FormTextInput
                            label="Apgar (opcional)"
                            onChangeText={handleChange(
                              `babies[${index}].apgar1`,
                            )}
                            value={values.babies[index].apgar1}
                            error={getBabyError(errors, index, 'apgar1')}
                            placeholder=""
                            keyboardType="number-pad"
                          />
                        </FirstSubOptionContainer>
                        <ApgarTextContainer>
                          <ApgarText>e</ApgarText>
                        </ApgarTextContainer>
                        <SecondSubOptionContainer>
                          <FormTextInput
                            label=""
                            onChangeText={handleChange(
                              `babies[${index}].apgar2`,
                            )}
                            value={values.babies[index].apgar2}
                            error={getBabyError(errors, index, 'apgar2')}
                            placeholder=""
                            keyboardType="number-pad"
                          />
                        </SecondSubOptionContainer>
                      </SubOptionsContainer>

                      <FormRadioGroupInput
                        label="Ao nascer, seu bebê foi para:"
                        name={`babies[${index}].birthLocation`}
                        error={getBabyError(errors, index, 'birthLocation')}
                        onChange={setFieldValue}
                        options={[
                          'Alojamento conjunto',
                          'UCI Neonatal',
                          'UTI Neonatal',
                        ]}
                      />
                    </View>
                  ))}

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
              </ScrollView>
            </Container>
          )}
        </Formik>
      </ScrollView>
    </Container>
  );
};

export default FormBaby;
