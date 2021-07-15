import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Dimensions, FlatList } from 'react-native';
import MainButton from '../../../components/MainButton';
import SecondaryButton from '../../../components/SecondaryButton';

import { useAuth } from '../../../contexts/auth';

import {
  BoldMainText,
  FirstSubOptionContainer,
  LeaveText,
  MainText,
  ScrollView,
  SecondSubOptionContainer,
  SubmitButtonContainer,
} from './styles';
import FormTextInput from '../../../components/FormTextInput';
import leaveResearch from '../../../services/leaveResearch';
import Modal from '../../../components/Modal';

interface Page {
  index: number;
  flatListRef: React.RefObject<FlatList<any>>;
}

interface FormValues {
  message: string;
}

const Confirm: React.FC<Page> = ({ index, flatListRef }) => {
  const navigation = useNavigation();

  function handleNextPage(currentPage: number) {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: currentPage + 1,
    });
  }

  return (
    <>
      <BoldMainText>Prezada Senhora,</BoldMainText>
      <MainText>
        Ao confirmar o descadastramento, todos os seus dados serão excluídos e
        você não fará mais parte da pesquisa “Coaching via App: uma abordagem
        inovadora para o aleitamento materno de bebês prematuros”.
      </MainText>
      <MainText>
        Seu acesso ao app será apagado e não será possível ver o conteúdo
        presente nesta plataforma.
      </MainText>
      <SubmitButtonContainer>
        <FirstSubOptionContainer>
          <SecondaryButton
            text="Cancelar"
            onPress={() => navigation.goBack()}
          />
        </FirstSubOptionContainer>
        <SecondSubOptionContainer>
          <MainButton text="Proximo" onPress={() => handleNextPage(index)} />
        </SecondSubOptionContainer>
      </SubmitButtonContainer>
    </>
  );
};

const Leave: React.FC<Page> = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation();

  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [message, setMessage] = useState<string>('');

  const formInitialValues: FormValues = {
    message: '',
  };
  const newMessageSchema: Yup.SchemaOf<FormValues> = Yup.object({
    message: Yup.string().required('Campo obrigatório'),
  }).required();

  async function handleFormSubmit() {
    setIsSendingForm(true);
    const success = await leaveResearch(message);
    setIsConfirmModalVisible(false);
    if (success) {
      await signOut();
    } else {
      setIsSendingForm(false);
      setIsErrorModalVisible(true);
    }
  }

  return (
    <>
      <Modal
        content="Tem certeza? Ao se descadastrar da pesquisa “Coaching via App: uma abordagem inovadora para o aleitamento materno de bebês prematuros” você não terá mais acesso ao app e ao conteúdo aqui presente."
        options={[
          {
            text: 'Cancelar',
            isBold: false,
            onPress: () => {
              setIsConfirmModalVisible(false);
              setIsSendingForm(false);
            },
          },
          {
            text: isSendingForm ? 'Enviando...' : 'Tenho Certeza',
            isBold: true,
            disabled: isSendingForm,
            onPress: () => handleFormSubmit(),
          },
        ]}
        visible={isConfirmModalVisible}
      />
      <Modal
        content="Erro ao descadastrar, verifique sua conexão."
        options={[
          {
            text: 'Fechar',
            onPress: () => setIsErrorModalVisible(false),
          },
        ]}
        visible={isErrorModalVisible}
      />
      <LeaveText>Poderia nos informar o motivo do descadastramento?</LeaveText>
      <Formik
        initialValues={formInitialValues}
        validationSchema={newMessageSchema}
        validateOnChange={false}
        onSubmit={() => setIsConfirmModalVisible(true)}>
        {({ setFieldValue, handleSubmit, dirty, errors }) => (
          <>
            <FormTextInput
              onChangeText={(text: string) => {
                setFieldValue('message', text);
                setMessage(text);
              }}
              value={message}
              placeholder="Digite aqui sua mensagem..."
              error={errors.message}
              multiline
              numberOfLines={20}
              textAlignVertical="top"
            />

            <SubmitButtonContainer>
              <FirstSubOptionContainer>
                <SecondaryButton
                  text="Cancelar"
                  onPress={() => navigation.goBack()}
                />
              </FirstSubOptionContainer>
              <SecondSubOptionContainer>
                <MainButton
                  text="Descadastrar"
                  onPress={handleSubmit}
                  disabled={!dirty}
                />
              </SecondSubOptionContainer>
            </SubmitButtonContainer>
          </>
        )}
      </Formik>
    </>
  );
};

const LeaveResearch: React.FC = () => {
  const { width } = Dimensions.get('window');
  const flatListRef = useRef<FlatList>(null);

  const pages = [
    {
      id: '0',
      Component: Confirm,
    },
    {
      id: '1',
      Component: Leave,
    },
  ];

  return (
    <FlatList
      ref={flatListRef}
      data={pages}
      renderItem={({ item, index }) => (
        <ScrollView width={width}>
          <item.Component index={index} flatListRef={flatListRef} />
        </ScrollView>
      )}
      keyExtractor={item => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      keyboardShouldPersistTaps="handled"
    />
  );
};

export default LeaveResearch;
