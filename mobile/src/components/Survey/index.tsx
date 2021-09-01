import React, { useEffect, useRef, useState } from 'react';

import { StackActions, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { ActivityIndicator, Dimensions, FlatList } from 'react-native';

import { useAuth } from '../../contexts/auth';
import { AnswerFeedback, answerQuestion } from '../../services/survey';
import {
  getSurveyQuestions,
  SurveyQuestion,
} from '../../utils/getSurveyQuestions';
import Modal from '../Modal';

import {
  ContentContainer,
  HeaderBackground,
  HeaderText,
  ScrollView,
} from './styles';

// Props de um componente que pode ser utilizado para gerar uma página do formulário.
export interface SurveyPage {
  // Index da página.
  index: number;
  // Número total de páginas.
  pagesLength: number;
  // Questões que devem ser respondidas pelo usuário.
  question: SurveyQuestion;
  // Verifica se formulário foi preenchido corretamente ao tentar avançar a página
  isFormValid: boolean;
  // Verifica se pelo menos uma opção do formulário foi selecionada.
  isDirty: boolean;
  // Verifica se formulário está sendo enviado ao servidor.
  isSendingForm: boolean;
  // Cor da página.
  color: string;
  // Define o valor de uma resposta.
  setFieldValue: (field: string, value: any) => void;
  // Altera a página do formulário. Caso seja a última página executa a função handleFormEnd.
  handleChangePage: (newPage: number, handleFormEnd: () => void) => void;
}

interface SurveyProps {
  // Título da página.
  title: string;
  // Cor da página.
  color: string;
  // Categoria que deve ser utilizada ao buscar as perguntas no backend.
  category: number;
  // Componente para gerar as páginas do formulário.
  Page: React.FC<SurveyPage>;
  // Função executada ao aceitar o feedback recebido com base nas respostas selecionadas.
  onFeedbackAccepted?: () => void;
}

interface FeedbackModalProps {
  content: string;
  redirect: string;
  onExit: () => void;
}

const Survey: React.FC<SurveyProps> = ({
  color,
  category,
  title,
  Page,
  onFeedbackAccepted,
}) => {
  const { width } = Dimensions.get('window');
  const { motherInfo } = useAuth();
  const navigation = useNavigation();
  const pageFlatListRef = useRef<FlatList>(null);

  const [pages, setPages] = useState<SurveyQuestion[]>([]);
  const [formInitialValues, setFormInitialValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [isFormValid, setIsFormValid] = useState(true);
  const [isSendingForm, setIsSendingForm] = useState(false);

  const [
    feedbackModalData,
    setFeedbackModalData,
  ] = useState<FeedbackModalProps | null>(null);

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      const questions = await getSurveyQuestions(motherInfo, { category });
      if (!questions) {
        return;
      }

      // Inicia todas as respostas vazias.
      const initialValues = questions.reduce(
        (object, page) => ({
          ...object,
          [page.id]: [],
        }),
        {},
      );

      setFormInitialValues(initialValues);
      setPages(questions);
      setIsLoading(false);
    }

    fetchQuestions();
  }, []);

  // Verifica se pelo menos uma resposta foi selecionada e caso a opção 'Outro' tenha sido
  // selecionado o usuário deve preencher um valor no campo de texto.
  function validateForm(
    question: SurveyQuestion,
    values: {
      [key: string]: string[];
    },
  ) {
    const atLeastOneSelected = values[question.id].length > 0;
    const otherFieldValid =
      values[question.id].find(option => option === '') === undefined;

    return atLeastOneSelected && otherFieldValid;
  }

  // Navega até uma página especificada.
  function goToPage(page: number) {
    if (page >= pages.length || page < 0) {
      return;
    }
    pageFlatListRef.current?.scrollToIndex({
      animated: true,
      index: page,
    });
  }

  // Envia as respostas do usuário ao backend.
  async function handleFormSubmit(answers: {
    [key: string]: string[];
  }): Promise<AnswerFeedback | undefined | null> {
    // Responde todas as perguntas do formulário e coleta a resposta do servidor para cada questão.
    const responses = await Promise.all(
      Object.keys(answers).map(async questionId =>
        answerQuestion(parseInt(questionId, 10), answers[questionId]),
      ),
    );
    // Caso uma ou mais respostas possuam null elas falharam.
    if (responses.find(response => response === null) !== undefined) {
      return null;
    }

    // Remove as respostas sem feedback.
    const feedbacks = responses.filter(response => !!response);
    // Se o formulário possuir feedback retorna ele
    return feedbacks.length > 0 ? feedbacks[0] : undefined;
  }

  // Envia as respostas do formulário ao servidor e chama o argumento handleFormEnd.
  async function handleLastPage(
    submitForm: () => Promise<AnswerFeedback | undefined | null>,
    handleFormEnd: () => void,
  ) {
    setIsSendingForm(true);
    const feedback = await submitForm();
    setIsSendingForm(false);

    // Envio do formulário falhou.
    if (feedback === null) {
      setIsErrorModalVisible(true);
      return;
    }

    if (feedback) {
      // Mostra o modal de feedback caso o formulário tenha um.
      setFeedbackModalData({
        content: feedback.feedback,
        redirect: feedback.redirect,
        onExit: handleFormEnd,
      });
    } else {
      // Função executada ao fim do formulário, normalmente apenas redireciona o usuário para uma
      // outra página do app.
      handleFormEnd();
    }
  }

  // Altera a página atual do formulário, entretanto a mudança de página só é possível se os campos
  // dá pagina atual estiverem preenchidos.
  // Caso a página atual seja a última a função handleLastPage é chamada.
  async function handleChangePage(
    newPage: number,
    question: SurveyQuestion,
    values: {
      [key: number]: string[];
    },
    submitForm: () => Promise<AnswerFeedback | undefined | null>,
    handleFormEnd: () => void,
  ) {
    // Verifica se pelo menos uma resposta foi selecionada
    if (!validateForm(question, values)) {
      setIsFormValid(false);
      return;
    }

    setIsFormValid(true);
    // Envia o formulário caso seja a última página
    if (newPage === pages.length) {
      await handleLastPage(submitForm, handleFormEnd);
    } else {
      goToPage(newPage);
    }
  }

  if (isLoading) {
    return (
      <>
        <HeaderBackground color={color} />
        <HeaderText>{title}</HeaderText>
        <ContentContainer>
          <ActivityIndicator size="large" color={color} animating={isLoading} />
        </ContentContainer>
      </>
    );
  }

  return (
    <>
      <Modal
        content={i18n.t('SurveyComponent.SubmitError')}
        options={[
          {
            text: i18n.t('Close'),
            isBold: true,
            onPress: () => setIsErrorModalVisible(false),
          },
        ]}
        visible={isErrorModalVisible}
        color={color}
      />

      {!!feedbackModalData && (
        <Modal
          content={feedbackModalData.content}
          options={[
            {
              text: i18n.t('Later'),
              onPress: () => {
                setFeedbackModalData(null);
                feedbackModalData.onExit();
              },
            },
            {
              text: i18n.t('SurveyComponent.ReadFeedback'),
              isBold: true,
              onPress: () => {
                setFeedbackModalData(null);
                // Executa a função fornecida caso exista.
                if (onFeedbackAccepted) {
                  onFeedbackAccepted();
                }
                // Reinicia a stack de navegação.
                navigation.dispatch(
                  StackActions.replace(feedbackModalData.redirect),
                );
              },
            },
          ]}
          visible={!!feedbackModalData}
          color={color}
        />
      )}

      <Formik
        initialValues={formInitialValues}
        onSubmit={async values => handleFormSubmit(values)}>
        {({ values, dirty, submitForm, setFieldValue }) => (
          <FlatList
            ref={pageFlatListRef}
            data={pages}
            renderItem={({ item, index }) => (
              <ScrollView width={width}>
                <HeaderBackground color={color} />
                <HeaderText>{title}</HeaderText>
                <ContentContainer>
                  <Page
                    index={index}
                    pagesLength={pages.length}
                    question={item}
                    isFormValid={isFormValid}
                    isSendingForm={isSendingForm}
                    isDirty={dirty}
                    color={color}
                    setFieldValue={setFieldValue}
                    handleChangePage={(newPage, handleFormEnd) =>
                      handleChangePage(
                        newPage,
                        item,
                        values,
                        submitForm,
                        handleFormEnd,
                      )
                    }
                  />
                </ContentContainer>
              </ScrollView>
            )}
            keyExtractor={item => item.id}
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        )}
      </Formik>
    </>
  );
};

export default Survey;
