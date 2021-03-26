import React, { useRef, useState, useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { Formik } from 'formik';

import { useAuth } from '../../contexts/auth';
import {
  ISurveyQuestion,
  listQuestions,
  answerQuestion,
} from '../../services/survey';

import {
  ListContainer,
  HeaderBackground,
  ContentContainer,
  HeaderText,
} from './styles';

// Tipo de uma função que pode ser utilizada para gerar uma página do formulário.
export interface IDiaryFormInfoPage {
  // Index da página no vetor.
  index: number;
  // Número total de página.
  pagesLength: number;
  // Questões que devem ser respondidas pelo usuário.
  question: ISurveyQuestion;
  // Verifica se formulário foi preenchido corretamente ao tentar avançar a página
  isFormValid: boolean;
  // Verifica se formulário foi está sendo enviado ao servidor.
  isSendingForm: boolean;
  // Definir o valor de uma resposta.
  setFieldValue: (field: string, value: any) => void;
  // Avança para a próxima página do formulário caso possível.
  handleChangePage: (
    currentPage: number,
    handleFormEnd?: () => void | undefined,
  ) => void;
}

interface IDiaryFormProps {
  // Título da página.
  title: string;
  // Categoria que deve ser utilizada ao buscar as perguntas no backend.
  category: number;
  // Função para gerar as páginas do formulário.
  InfoPage: React.FC<IDiaryFormInfoPage>;
}

const DiaryForm: React.FC<IDiaryFormProps> = ({
  title,
  category,
  InfoPage,
}) => {
  const { motherInfo } = useAuth();
  const pageFlatListRef = useRef<FlatList>(null);

  const [pages, setPages] = useState<ISurveyQuestion[]>([]);
  const [formInitialValues, setFormInitialValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [isFormValid, setIsFormValid] = useState(true);
  const [isSendingForm, setIsSendingForm] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      const questions = await listQuestions(category);
      if (!questions) {
        return;
      }

      // Exibe apenas perguntas de alvo GERAL ou aquelas que se aplicam ao usuário.
      const filteredQuestions = questions.filter(page => {
        if (page.target === 'GERAL') {
          return true;
        }
        if (page.target === 'AC' && motherInfo.babiesBirthLocations.AC) {
          return true;
        }
        if (
          page.target === 'UCI/UTI' &&
          (motherInfo.babiesBirthLocations.UCI ||
            motherInfo.babiesBirthLocations.UTI)
        ) {
          return true;
        }
        return false;
      });

      // Inicia todas as respostas vazias.
      const initialValues = filteredQuestions.reduce(
        (object, page) => ({
          ...object,
          [page.id]: [],
        }),
        {},
      );

      setFormInitialValues(initialValues);
      setPages(filteredQuestions);
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
    return (
      values[question.id].length <= 0 ||
      (question.displayOther &&
        values[question.id].find(option => option === '') !== undefined)
    );
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

  async function handleChangePage(
    question: ISurveyQuestion,
    values: {
      [key: number]: string[];
    },
    newPage: number,
    submitForm: (() => Promise<void>) & (() => Promise<any>),
    handleFormEnd?: () => void | undefined,
  ) {
    // Verifica se pelo menos uma resposta foi selecionada
    if (validateForm(values, question)) {
      setIsFormValid(false);
      return;
    }

    setIsFormValid(true);
    if (newPage === pages.length) {
      // Envia o formulário caso seja a última página
      setIsSendingForm(true);
      await submitForm();
      setIsSendingForm(false);
      if (handleFormEnd) {
        handleFormEnd();
      }
    } else {
      goToPage(newPage);
    }
  }

  // Envia as respostas do usuário ao backend.
  async function handleFormSubmit(answers: { [key: string]: string[] }) {
    Object.keys(answers).forEach(async questionId =>
      answerQuestion(parseInt(questionId, 10), answers[questionId]),
    );
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
    <ListContainer>
      <Formik
        initialValues={formInitialValues}
        onSubmit={async values => handleFormSubmit(values)}>
        {({ submitForm, setFieldValue, values }) => (
          <FlatList
            ref={pageFlatListRef}
            data={pages}
            renderItem={({ item, index }) => (
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
            )}
            keyExtractor={item => item.id.toString()}
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        )}
      </Formik>
    </ListContainer>
  );
};

export default DiaryForm;
