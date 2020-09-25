import React from 'react';
// import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

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

import MainButton from '../../components/MainButton';

const SignUp: React.FC = () => {
  // const navigation = useNavigation();

  const SignUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'O nome deve ter pelo menos 3 caracteres!')
      .required('Campo obrigatório'),
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
          initialValues={{ name: '', date: '' }}
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
                error={errors.date}
                setField={setFieldValue}
                placeholder="Data de nascimento"
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
