import React, { useState } from 'react';

import { Formik } from 'formik';
import { View } from 'react-native';
import * as Yup from 'yup';

import FormTextInput from '../../../components/FormTextInput';
import MainButton from '../../../components/MainButton';
import Modal from '../../../components/Modal';
import { createMessage } from '../../../services/messages';

import {
  ScrollView,
  FormContainer,
  SubmitButtonContainer,
  HeaderText,
} from './styles';

interface FormValues {
  message: string;
}

const NewMessage: React.FC = () => {
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [textInputText, setTextInputText] = useState('');

  const formInitialValues: FormValues = {
    message: '',
  };
  const newMessageSchema: Yup.SchemaOf<FormValues> = Yup.object({
    message: Yup.string().required('Campo obrigatório'),
  }).required();

  async function handleNewMessage({ message }: FormValues) {
    setIsSendingForm(true);
    const successfulRequest = await createMessage(message);
    setIsSendingForm(false);
    if (successfulRequest) {
      setIsSubmitModalVisible(true);
      setTextInputText('');
    }
  }

  return (
    <ScrollView>
      <Modal
        content="Mensagem enviada!"
        visible={isSubmitModalVisible}
        options={[
          {
            text: 'Fechar',
            isBold: true,
            onPress: () => setIsSubmitModalVisible(false),
          },
        ]}
      />

      <HeaderText>Envie uma mensagem para outras mamães</HeaderText>
      <Formik
        initialValues={formInitialValues}
        validationSchema={newMessageSchema}
        validateOnChange={false}
        onSubmit={values => handleNewMessage(values)}>
        {({ setFieldValue, handleSubmit, dirty, errors }) => (
          <FormContainer>
            <View>
              <FormTextInput
                onChangeText={(text: string) => {
                  setFieldValue('message', text);
                  setTextInputText(text);
                }}
                value={textInputText}
                placeholder="Digite aqui sua mensagem..."
                error={errors.message}
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

export default NewMessage;
