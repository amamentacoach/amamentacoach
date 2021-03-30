import React, { useRef, useState, useEffect } from 'react';
import { ActivityIndicator, Dimensions, FlatList } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';

import {
  ISurveyQuestion,
  listQuestions,
  answerQuestion,
  IAnswerFeedback,
} from '../../services/survey';
import Modal from '../Modal';

import {
  HeaderBackground,
  ContentContainer,
  HeaderText,
  ScrollView,
} from './styles';

// Tipo de um componente que pode ser utilizado para gerar uma página do formulário.
export interface IDiaryFormInfoPage {
  // Index da página.
  index: number;
  // Número total de páginas.
  pagesLength: number;
  // Questões que devem ser respondidas pelo usuário.
  question: ISurveyQuestion;
  // Verifica se formulário foi preenchido corretamente ao tentar avançar a página
  isFormValid: boolean;
  // Verifica se formulário está sendo enviado ao servidor.
  isSendingForm: boolean;
  // Define o valor de uma resposta.
  setFieldValue: (field: string, value: any) => void;
  // Altera a página do formulário. Caso seja a última página executa a função handleFormEnd.
  handleChangePage: (newPage: number, handleFormEnd: () => void) => void;
}

interface IDiaryFormProps {
  // Título da página.
  title: string;
  // Categoria que deve ser utilizada ao buscar as perguntas no backend.
  category: number;
  // Função para gerar as páginas do formulário.
  InfoPage: React.FC<IDiaryFormInfoPage>;
}

interface IFeedbackModalProps {
  content: string;
  redirect: string;
  onExit: () => void;
}

const DiaryForm: React.FC<IDiaryFormProps> = ({
  title,
  category,
  InfoPage,
}) => {
  const { width } = Dimensions.get('window');
  const navigation = useNavigation();
  const pageFlatListRef = useRef<FlatList>(null);

  const [pages, setPages] = useState<ISurveyQuestion[]>([]);
  const [formInitialValues, setFormInitialValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [isFormValid, setIsFormValid] = useState(true);
  const [isSendingForm, setIsSendingForm] = useState(false);

  const [
    feedbackModalData,
    setFeedbackModalData,
  ] = useState<IFeedbackModalProps | null>(null);
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      const questions = await listQuestions(category);
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
    values: {
      [key: number]: string[];
    },
    question: ISurveyQuestion,
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
  }): Promise<IAnswerFeedback | undefined | null> {
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
    submitForm: () => Promise<IAnswerFeedback | undefined | null>,
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

    // Mostra o modal de feedback caso o formulário tenha um.
    if (feedback) {
      if (handleFormEnd) {
        setFeedbackModalData({
          content: feedback.feedback,
          redirect: feedback.redirect,
          onExit: () => handleFormEnd(),
        });
      }
      setIsFeedbackModalVisible(true);
    } else {
      // Função executada ao fim do formulário, normalmente apenas redireciona o usuário para uma
      // outra página do app.
      handleFormEnd();
    }
  }

  // Altera a página atual do formulário, entretanto a mudança de página só é possível se os campos
  // dá pagina atual estiverem preenchidos.
  // Caso a próxima página seja a última a função handleLastPage é chamada.
  async function handleChangePage(
    question: ISurveyQuestion,
    values: {
      [key: number]: string[];
    },
    newPage: number,
    submitForm: () => Promise<IAnswerFeedback | undefined | null>,
    handleFormEnd: () => void,
  ) {
    // Verifica se pelo menos uma resposta foi selecionada
    if (!validateForm(values, question)) {
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
        <HeaderBackground />
        <HeaderText>{title}</HeaderText>
        <ContentContainer>
          <ActivityIndicator
            size="large"
            color="#7d5cd7"
            animating={isLoading}
          />
        </ContentContainer>
      </>
    );
  }

  return (
    <>
      <Modal
        content={
          'Erro ao enviar suas respostas.\nPor favor tente novamente mais tarde.'
        }
        options={[
          {
            text: 'Fechar',
            isBold: true,
            onPress: () => setIsErrorModalVisible(false),
          },
        ]}
        visible={isErrorModalVisible}
      />
      {feedbackModalData !== null && (
        <Modal
          content={feedbackModalData.content}
          options={[
            {
              text: 'Mais tarde',
              onPress: async () => {
                setIsFeedbackModalVisible(false);
                feedbackModalData.onExit();
              },
            },
            {
              text: 'Ver conteúdo',
              isBold: true,
              onPress: () => {
                setIsFeedbackModalVisible(false);
                // Reinicia a stack de navegação.
                navigation.dispatch(
                  StackActions.replace(feedbackModalData.redirect),
                );
              },
            },
          ]}
          visible={isFeedbackModalVisible}
        />
      )}

      <Formik
        initialValues={formInitialValues}
        onSubmit={async values => handleFormSubmit(values)}>
        {({ submitForm, setFieldValue, values }) => (
          <FlatList
            ref={pageFlatListRef}
            data={pages}
            renderItem={({ item, index }) => (
              <ScrollView width={width}>
                <HeaderBackground />
                <HeaderText>{title}</HeaderText>
                <ContentContainer>
                  <InfoPage
                    index={index}
                    pagesLength={pages.length}
                    question={item}
                    setFieldValue={setFieldValue}
                    isFormValid={isFormValid}
                    isSendingForm={isSendingForm}
                    handleChangePage={(newPage, handleFormEnd) =>
                      handleChangePage(
                        item,
                        values,
                        newPage,
                        submitForm,
                        handleFormEnd,
                      )
                    }
                  />
                </ContentContainer>
              </ScrollView>
            )}
            keyExtractor={item => item.id.toString()}
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

export default DiaryForm;
