import React, { useState } from 'react';
import { Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DiaryForm, { TInfoPageFunction } from '../../components/DiaryForm';
import MainButton from '../../components/MainButton';
import FormRadioGroupInput from '../../components/FormRadioGroup';
import Modal from '../../components/Modal';

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

const Goals: React.FC = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const [displayError, setDisplayError] = useState(false);
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [isIntroModalVisible, setIsIntroModalVisible] = useState(true);
  const [isFinishedModalVisible, setIsFinishedModalVisible] = useState(false);

  // Retorna uma imagem aleatória para ser exibida no modal.
  function getRandomMotivationImage() {
    const images = [
      require('../../../assets/images/motivation-1.jpeg'),
      require('../../../assets/images/motivation-2.jpeg'),
      require('../../../assets/images/motivation-3.png'),
      require('../../../assets/images/motivation-4.png'),
      require('../../../assets/images/motivation-5.jpeg'),
    ];
    const randomIndex = Math.round(Math.random() * (images.length - 1));
    return images[randomIndex];
  }

  const infoPage: TInfoPageFunction = (
    index,
    pagesLength,
    question,
    values,
    setFieldValue,
    isFormValid,
    handleSubmit,
    goToPage,
  ) => {
    function handleNextPage(pageIndex: number) {
      // Verifica se pelo menos uma resposta foi selecionada
      if (isFormValid(values, question)) {
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
          <QuestionText>{question.description}</QuestionText>

          <ErrorContainer>
            {displayError ? <ErrorText>Pergunta obrigatória</ErrorText> : null}
          </ErrorContainer>

          <FormRadioGroupInput
            fieldName={`${question.id}`}
            options={question.options}
            multipleSelection={question.multipleSelection}
            displayOtherField={question.displayOther}
            onChange={setFieldValue}
          />

          <Footer>
            <MainButton
              text={index === pagesLength - 1 ? 'Finalizar' : 'Próximo'}
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
          image={getRandomMotivationImage()}
          visible={isIntroModalVisible}
          closeModal={() => setIsIntroModalVisible(false)}
        />
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
