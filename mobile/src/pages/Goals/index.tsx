import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DiaryForm, { IDiaryFormInfoPage } from '../../components/DiaryForm';
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

  const InfoPage: React.FC<IDiaryFormInfoPage> = ({
    index,
    pagesLength,
    question,
    isFormValid,
    isSendingForm,
    setFieldValue,
    handleChangePage,
  }) => {
    const onFormEnd = () => setIsFinishedModalVisible(true);

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
            {!isFormValid && <ErrorText>Pergunta obrigatória</ErrorText>}
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
              onPress={() => handleChangePage(index + 1, onFormEnd)}
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
          options={[
            {
              text: 'Fechar',
              isBold: true,
              onPress: () => setIsIntroModalVisible(false),
            },
          ]}
          visible={isIntroModalVisible}
        />
        <Modal
          content="Suas metas foram traçadas!"
          options={[
            {
              text: 'Fechar',
              isBold: true,
              onPress: () => {
                setIsFinishedModalVisible(false);
                navigation.navigate('Diary');
              },
            },
          ]}
          visible={isFinishedModalVisible}
        />
      </ModalContainer>
      <DiaryForm
        title="Minhas metas de hoje"
        category={3}
        InfoPage={InfoPage}
      />
    </>
  );
};

export default Goals;
