import React, { useState } from 'react';
import { Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DiaryForm, { TInfoPageFunction } from '../../components/DiaryForm';
import MainButton from '../../components/MainButton';
import FormRadioGroupInput from '../../components/FormRadioGroup';

import {
  ScrollView,
  HeaderBackground,
  ContentContainer,
  Footer,
  HeaderText,
  QuestionText,
  CurrentPageContainer,
  CurrentPageText,
  ErrorContainer,
  ErrorText,
  ModalContainer,
} from './styles';
import Modal from '../../components/Modal';

const Goals: React.FC = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const [displayError, setDisplayError] = useState(false);
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [isIntroModalVisible, setIsIntroModalVisible] = useState(true);
  const [isFinishedModalVisible, setIsFinishedModalVisible] = useState(false);

  const infoPage: TInfoPageFunction = (
    index,
    pagesLength,
    questions,
    values,
    setFieldValue,
    handleSubmit,
    goToPage,
  ) => {
    function handleNextPage(pageIndex: number) {
      // Verifica se pelo menos uma resposta foi selecionada
      if (
        values[questions.id].length <= 0 ||
        (questions.displayOther &&
          values[questions.id].find((option) => option === '') !== undefined)
      ) {
        setDisplayError(true);
        return;
      }

      setDisplayError(false);
      if (pageIndex === pagesLength - 1) {
        // Envia o formulário caso seja a última página
        setIsSendingForm(true);
        handleSubmit();
        setIsFinishedModalVisible(true);
      } else {
        goToPage(index + 1);
      }
    }

    return (
      <ScrollView width={width}>
        <HeaderBackground />
        <HeaderText>Minhas metas de hoje</HeaderText>
        <ContentContainer>
          <CurrentPageContainer>
            <CurrentPageText>
              {index + 1}/{pagesLength}
            </CurrentPageText>
          </CurrentPageContainer>
          <QuestionText>{questions.description}</QuestionText>

          <ErrorContainer>
            {displayError ? <ErrorText>Pergunta obrigatória</ErrorText> : null}
          </ErrorContainer>

          <FormRadioGroupInput
            fieldName={`${questions.id}`}
            options={questions.options}
            multipleSelection={questions.multipleSelection}
            displayOtherField={questions.displayOther}
            onChange={setFieldValue}
          />

          <Footer>
            <MainButton
              buttonText={index === pagesLength - 1 ? 'Finalizar' : 'Próximo'}
              disabled={isSendingForm}
              onPress={() => handleNextPage(index)}
            />
          </Footer>
        </ContentContainer>
      </ScrollView>
    );
  };

  return (
    <>
      <ModalContainer
        modalVisible={isIntroModalVisible || isFinishedModalVisible}>
        <Modal
          visible={isIntroModalVisible}
          closeModal={() => setIsIntroModalVisible(false)}>
          <Image source={require('../../../assets/images/change.png')} />
        </Modal>
        <Modal
          text="Suas metas foram traçadas!"
          visible={isFinishedModalVisible}
          closeModal={() => {
            setIsFinishedModalVisible(false);
            navigation.navigate('Diary');
          }}
        />
      </ModalContainer>
      <DiaryForm
        title="Minhas metas de hoje"
        category={3}
        infoPage={infoPage}
      />
    </>
  );
};

export default Goals;
