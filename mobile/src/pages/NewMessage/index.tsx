import React, { useState } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { createNewMessage } from '../../services/messages';
import FormTextInput from '../../components/FormTextInput';
import MainButton from '../../components/MainButton';
import Modal from '../../components/Modal';

import {
  ScrollView,
  FormContainer,
  SubmitButtonContainer,
  HeaderText,
} from './styles';

interface IFormValues {
  message: string;
}

const NewMessage: React.FC = () => {
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [textInputText, setTextInputText] = useState('');

  const formInitialValues: IFormValues = {
    message: '',
  };
  const newPasswordSchema: Yup.ObjectSchema<IFormValues> = Yup.object({
    message: Yup.string().required('Campo obrigatório'),
  }).required();

  async function handleNewMessage({ message }: IFormValues) {
    setIsSendingForm(true);
    const successfulRequest = await createNewMessage(message);
    setIsSendingForm(false);
    if (successfulRequest) {
      setIsSubmitModalVisible(true);
      setTextInputText('');
    }
  }

  return (
    <ScrollView>
      <Modal
        text="Mensagem enviada!"
        visible={isSubmitModalVisible}
        closeModal={() => setIsSubmitModalVisible(false)}
      />

      <HeaderText>Envie uma mensagem para outras mamães</HeaderText>
      <Formik
        initialValues={formInitialValues}
        validationSchema={newPasswordSchema}
        validateOnChange={false}
        onSubmit={(values) => handleNewMessage(values)}>
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
