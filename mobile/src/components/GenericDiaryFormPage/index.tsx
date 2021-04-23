import React from 'react';

import { IDiaryFormPage } from '../DiaryForm';
import MainButton from '../MainButton';
import FormRadioGroupInput from '../FormRadioGroup';

import {
  Footer,
  QuestionText,
  CurrentPageContainer,
  CurrentPageText,
  Container,
} from './styles';

// Retorna uma página genérica que pode ser fornecida a um componente DiaryForm.
// Ao final do formulário a função onFormEnd é executada.
const createGenericDiaryFormPage = (color: string, onFormEnd: () => void) => {
  const Page: React.FC<IDiaryFormPage> = ({
    index,
    pagesLength,
    question,
    isFormValid,
    isDirty,
    isSendingForm,
    setFieldValue,
    handleChangePage,
  }) => (
    <Container>
      <CurrentPageContainer color={color}>
        <CurrentPageText>
          {index + 1}/{pagesLength}
        </CurrentPageText>
      </CurrentPageContainer>
      <QuestionText>{question.description}</QuestionText>

      <FormRadioGroupInput
        color={color}
        fieldName={`${question.id}`}
        options={question.options}
        multipleSelection={question.multipleSelection}
        displayOtherField={question.displayOther}
        error={isFormValid ? '' : 'Pergunta obrigatória'}
        onChange={setFieldValue}
      />

      <Footer>
        <MainButton
          color={color}
          text={index >= pagesLength - 1 ? 'Finalizar' : 'Próximo'}
          disabled={!isDirty || isSendingForm}
          onPress={() => handleChangePage(index + 1, onFormEnd)}
        />
      </Footer>
    </Container>
  );

  return Page;
};

export default createGenericDiaryFormPage;
