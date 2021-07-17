import React, { useState } from 'react';

import { Formik } from 'formik';
import { View } from 'react-native';
import * as Yup from 'yup';

import FormTextInput from '../../../components/FormTextInput';
import MainButton from '../../../components/MainButton';
import Modal from '../../../components/Modal';
import { createUserQuestion } from '../../../services/questions';

import {
  ScrollView,
  FormContainer,
  SubmitButtonContainer,
  HeaderText,
} from './styles';

interface FormValues {
  question: string;
}

const NewQuestion: React.FC = () => {
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [textInputText, setTextInputText] = useState('');

  const formInitialValues: FormValues = {
    question: '',
  };
  const newPasswordSchema: Yup.SchemaOf<FormValues> = Yup.object({
    question: Yup.string().required('Campo obrigatório'),
  }).required();

  async function handleNewQuestion({ question }: FormValues) {
    setIsSendingForm(true);
    const successfulRequest = await createUserQuestion(question);
    setIsSendingForm(false);
    if (successfulRequest) {
      setIsSubmitModalVisible(true);
      setTextInputText('');
    }
  }

  return (
    <ScrollView>
      <Modal
        content="Dúvida enviada!"
        visible={isSubmitModalVisible}
        options={[
          {
            text: 'Fechar',
            isBold: true,
            onPress: () => setIsSubmitModalVisible(false),
          },
        ]}
      />

      <HeaderText>Envie sua dúvida</HeaderText>
      <Formik
        initialValues={formInitialValues}
        validationSchema={newPasswordSchema}
        validateOnChange={false}
        onSubmit={values => handleNewQuestion(values)}>
        {({ setFieldValue, handleSubmit, dirty, errors }) => (
          <FormContainer>
            <View>
              <FormTextInput
                onChangeText={(text: string) => {
                  setFieldValue('question', text);
                  setTextInputText(text);
                }}
                value={textInputText}
                placeholder="Digite aqui sua pergunta..."
                error={errors.question}
                multiline
                numberOfLines={20}
                maxLength={255}
                textAlignVertical="top"
              />
            </View>

            <SubmitButtonContainer>
              <MainButton
                onPress={handleSubmit}
                disabled={!dirty || isSendingForm}
                text={isSendingForm ? 'Enviando...' : 'Enviar'}
              />
            </SubmitButtonContainer>
          </FormContainer>
        )}
      </Formik>
    </ScrollView>
  );
};

export default NewQuestion;
