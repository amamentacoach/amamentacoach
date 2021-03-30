import React from 'react';
import { Dimensions } from 'react-native';

import { IDiaryFormInfoPage } from '../DiaryForm';
import MainButton from '../MainButton';
import FormRadioGroupInput from '../FormRadioGroup';

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
} from './styles';

// Retorna uma InfoPage genérica que pode ser fornecida a um componente DiaryForm.
// Ao final do formulário a função onFormEnd é executada.
const createGenericDiaryFormPage = (onFormEnd: () => void) => {
  const { width } = Dimensions.get('window');

  const InfoPage: React.FC<IDiaryFormInfoPage> = ({
    index,
    pagesLength,
    question,
    isFormValid,
    isSendingForm,
    setFieldValue,
    handleChangePage,
  }) => {
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

  return InfoPage;
};

export default createGenericDiaryFormPage;
