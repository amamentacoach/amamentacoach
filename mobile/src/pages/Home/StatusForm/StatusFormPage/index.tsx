import { Action, AppScreen } from '@common/telemetria';
import i18n from 'i18n-js';
import React, { memo, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';

import FormRadioGroupInput from 'components/FormRadioGroup';
import {
  CurrentPageContainer,
  CurrentPageText,
} from 'components/GenericSurveyPage/styles';
import MainButton from 'components/MainButton';
import SecondaryButton from 'components/SecondaryButton';
import theme from 'config/theme';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { SurveyQuestion } from 'utils/getSurveyQuestions';

import {
  ContentContainer,
  FirstButtonContainer,
  Footer,
  HeaderBackground,
  HeaderText,
  QuestionText,
  ScrollView,
  SecondButtonContainer,
} from './styles';

export interface StatusFormQuestion extends SurveyQuestion {
  isHorizontal: boolean;
}

// Página do formulário de escala.
interface PageProps {
  // Índice da página atual.
  pageIndex: number;
  // Número de páginas no formulário.
  numberOfPages: number;
  // Questões da página.
  questions: StatusFormQuestion[];
  // Respostas do usuário para cada pergunta.
  values: {
    [key: string]: string[];
  };
  // Erros para cada pergunta.
  errors: {
    [key: string]: string;
  };
  // Flat list onde o formulário está contido.
  flatListRef: React.RefObject<FlatList>;
  // Define um erro para uma respostas
  setFieldError: (field: string, message: string) => void;
  // Define o valor de uma resposta.
  setFieldValue: (field: string, value: any) => void;
  // Envia o formulário.
  submitForm: () => Promise<number | null>;
  // Exibe o modal de erro.
  setIsErrorModalVisible: (isVisible: boolean) => void;
  // Exibe o modal com o score da mãe.
  setFormScore: (score: number) => void;
}

// Página do formulário.
const StatusFormPage: React.FC<PageProps> = ({
  pageIndex,
  numberOfPages,
  questions,
  values,
  errors,
  flatListRef,
  setFieldValue,
  setFieldError,
  submitForm,
  setIsErrorModalVisible,
  setFormScore,
}) => {
  const { width } = Dimensions.get('window');
  const [isSendingForm, setIsSendingForm] = useState(false);

  // Verifica se pelo menos uma opção foi selecionada para cada pergunta da página.
  function validateCurrentFormPage(): boolean {
    let isValid = true;
    questions.forEach(question => {
      if (values[question.id]?.length > 0) {
        setFieldError(question.id.toString(), '');
      } else {
        setFieldError(question.id.toString(), i18n.t('Yup.AnswerRequired'));
        isValid = false;
      }
    });
    return isValid;
  }

  // Altera a página atual do formulário, entretanto a mudança de página só é possível se os campos
  // dá pagina atual estiverem preenchidos.
  // Caso a página atual seja a última o formulário é enviado.
  async function handleChangePage(
    currentPage: number,
    newPage: number,
  ): Promise<void> {
    // Verifica se pelo menos uma resposta foi selecionada ao avançar a página.
    if (newPage > currentPage && !validateCurrentFormPage()) {
      return;
    }

    if (newPage < numberOfPages) {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: newPage,
      });
      return;
    }

    // Envia o formulário caso seja a última página
    setIsSendingForm(true);
    const score = await submitForm();
    setIsSendingForm(false);
    if (!score) {
      setIsErrorModalVisible(true);
      return;
    }

    await createTelemetryAction({
      action: Action.Pressed,
      context: {
        screen: AppScreen.StatusForm,
        target: 'Actions.End',
      },
    });
    setFormScore(score);
  }

  return (
    <ScrollView width={width}>
      <HeaderBackground />
      <HeaderText>{i18n.t('StatusFormPage.Header')}</HeaderText>
      <ContentContainer>
        <CurrentPageContainer color={theme.babyBlue}>
          <CurrentPageText>
            {pageIndex + 1}/{numberOfPages}
          </CurrentPageText>
        </CurrentPageContainer>

        <View>
          {questions.map((question, questionIndex) => (
            <View key={question.id}>
              <QuestionText>
                {pageIndex * 3 + questionIndex + 1} - {question.description}
              </QuestionText>

              <FormRadioGroupInput
                color={theme.babyBlue}
                fieldName={question.id}
                options={question.options}
                multipleSelection={question.multipleSelection}
                displayOtherField={question.displayOther}
                error={errors[question.id]}
                initialValues={values[question.id]}
                onChange={setFieldValue}
                isHorizontal={question.isHorizontal}
              />
            </View>
          ))}
        </View>

        <Footer>
          {pageIndex > 0 && (
            <FirstButtonContainer>
              <SecondaryButton
                color={theme.babyBlue}
                text={i18n.t('GoBack')}
                disabled={isSendingForm}
                onPress={() => handleChangePage(pageIndex, pageIndex - 1)}
              />
            </FirstButtonContainer>
          )}
          <SecondButtonContainer>
            <MainButton
              color={theme.babyBlue}
              text={
                pageIndex >= numberOfPages - 1
                  ? i18n.t('Actions.End')
                  : i18n.t('Next')
              }
              disabled={isSendingForm}
              onPress={() => handleChangePage(pageIndex, pageIndex + 1)}
            />
          </SecondButtonContainer>
        </Footer>
      </ContentContainer>
    </ScrollView>
  );
};

// Evita redesenhar a página a não ser que as respostas ou erros tenham mudado.
const MemoizedStatusFormPage = memo(StatusFormPage, (prevProps, nextProps) => {
  return prevProps.questions.every(
    ({ id }) =>
      prevProps.values[id] === nextProps.values[id] &&
      prevProps.errors[id] === nextProps.errors[id],
  );
});

export default MemoizedStatusFormPage;
