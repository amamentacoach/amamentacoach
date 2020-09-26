import React from 'react';
// import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import MainButton from '../../components/MainButton';
import FormRadioGroupInput from '../../components/FormRadioGroup';
import FormTextInput from '../../components/FormTextInput';
import FormDateInput from '../../components/FormDateInput';

import {
  Container,
  ScrollView,
  Header,
  HeaderText,
  HeaderSubText,
  FormContainer,
  ButtonContainer,
} from './styles';

const SignUp: React.FC = () => {
  // const navigation = useNavigation();

  const SignUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'O nome deve ter pelo menos 3 caracteres!')
      .required('Campo obrigatório'),
    date: Yup.string().required('Campo obrigatório'),
    pregnantCount: Yup.number().required('Campo obrigatório'),
    alreadyBreastfeed: Yup.string().required('Campo obrigatório'),
    married: Yup.string().required('Campo obrigatório'),
    education: Yup.string().required('Campo obrigatório'),
  });

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
          initialValues={{
            name: '',
            date: '',
            pregnantCount: '',
            alreadyBreastfeed: '',
            married: '',
            education: '',
          }}
          validationSchema={SignUpSchema}
          onSubmit={(values) => console.log(values)}>
          {({
            handleChange,
            handleSubmit,
            setFieldValue,
            dirty,
            isValid,
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
                onChange={setFieldValue}
                options={['Sim', 'Não']}
                error={errors.married}
              />

              <ButtonContainer>
                <MainButton
                  onPress={handleSubmit}
                  disabled={!(isValid && dirty)}
                  buttonText="Próximo"
                />
              </ButtonContainer>
            </FormContainer>
          )}
        </Formik>
      </ScrollView>
    </Container>
  );
};

export default SignUp;
