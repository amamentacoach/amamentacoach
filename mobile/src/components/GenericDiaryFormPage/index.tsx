import React from 'react';

import { SvgProps } from 'react-native-svg';
import { DiaryFormPage } from '../DiaryForm';
import MainButton from '../MainButton';
import FormRadioGroupInput from '../FormRadioGroup';

import {
  Footer,
  QuestionText,
  CurrentPageContainer,
  CurrentPageText,
  Container,
  ImageContainer,
} from './styles';

// Retorna uma página genérica que pode ser fornecida a um componente DiaryForm.
// Ao final do formulário a função onFormEnd é executada.
const createGenericDiaryFormPage = (
  color: string,
  onFormEnd: () => void,
  Images?: React.FC<SvgProps>[],
) => {
  const Page: React.FC<DiaryFormPage> = ({
    index,
    pagesLength,
    question,
    isFormValid,
    isDirty,
    isSendingForm,
    setFieldValue,
    handleChangePage,
  }) => {
    const Image = Images ? Images[index] : undefined;

    return (
      <Container>
        <CurrentPageContainer color={color}>
          <CurrentPageText>
            {index + 1}/{pagesLength}
          </CurrentPageText>
        </CurrentPageContainer>
        {Image && (
          <ImageContainer>
            <Image />
          </ImageContainer>
        )}
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
  };

  return Page;
};

export default createGenericDiaryFormPage;
