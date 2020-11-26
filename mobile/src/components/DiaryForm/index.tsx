import React, { useRef, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { Formik } from 'formik';

import { useAuth } from '../../contexts/auth';
import {
  ISurveyQuestion,
  listQuestions,
  answerQuestion,
} from '../../services/questions';

import {
  ListContainer,
  HeaderBackground,
  ContentContainer,
  HeaderText,
} from './styles';

// Tipo de uma função que pode ser utilizada para gerar uma página do formulário.
export type TInfoPageFunction = (
  // Index da página no vetor.
  index: number,
  // Número total de página.
  pagesLength: number,
  // Questões que devem ser respondidas pelo usuário.
  questions: ISurveyQuestion,
  // Valores das respostas do usuário.
  values: { [key: number]: string[] },
  // Função para definir o valor de uma resposta.
  setFieldValue: (field: string, value: any) => void,
  // Função do formik para ser executada ao terminar o formulário.
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void,
  // Função para ser executada para ir até uma página do formulário.
  goToPage: (page: number) => void,
) => JSX.Element;

export interface IDiaryFormProps {
  // Título da página.
  title: string;
  // Categoria que deve ser utilizada ao buscar as perguntas no backend.
  category: number;
  // Função para gerar as páginas do formulário.
  infoPage: TInfoPageFunction;
}

const DiaryForm: React.FC<IDiaryFormProps> = ({
  title,
  category,
  infoPage,
}) => {
  const { motherInfo } = useAuth();
  const pageFlatListRef = useRef<FlatList>(null);

  const [pages, setPages] = useState<ISurveyQuestion[]>([]);
  const [formInitialValues, setFormInitialValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      const questions = await listQuestions(category);
      if (!questions) {
        return;
      }

      // Exibe apenas perguntas de alvo GERAL ou aquelas que se aplicam ao usuário.
      const filteredQuestions = questions.filter((page) => {
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
        (object, page) => ({ ...object, [page.id]: [] }),
        {},
      );

      setFormInitialValues(initialValues);
      setPages(filteredQuestions);
      setIsLoading(false);
    }

    fetchQuestions();
  }, []);

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
  async function handleFormSubmit(answers: { [key: string]: string[] }) {
    Object.keys(answers).forEach(async (questionId) =>
      answerQuestion(parseInt(questionId, 10), answers[questionId]),
    );
  }

  if (isLoading) {
    return (
      <>
        <HeaderBackground />
        <HeaderText>{title}</HeaderText>
        <ContentContainer />
      </>
    );
  }

  return (
    <ListContainer>
      <Formik
        initialValues={formInitialValues}
        onSubmit={(values) => handleFormSubmit(values)}>
        {({ handleSubmit, setFieldValue, values }) => (
          <FlatList
            ref={pageFlatListRef}
            data={pages}
            renderItem={({
              item,
              index,
            }: {
              item: ISurveyQuestion;
              index: number;
            }) =>
              infoPage(
                index,
                pages.length,
                item,
                values,
                setFieldValue,
                handleSubmit,
                goToPage,
              )
            }
            keyExtractor={(item) => item.id.toString()}
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
