import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import 'moment/locale/pt-br';

import { useAuth } from '../../contexts/auth';
import {
  ISurveyQuestion,
  listQuestions,
  answerQuestion,
} from '../../services/questions';
import MainButton from '../../components/MainButton';
import FormRadioGroupInput from '../../components/FormRadioGroup';

import {
  ListContainer,
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

interface IQuestionPageProps extends ISurveyQuestion {
  index: number;
  values: { [key: number]: string[] };
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
}

const HelpReceived: React.FC = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const { motherInfo } = useAuth();

  const pageFlatListRef = useRef<FlatList>(null);
  const [pages, setPages] = useState<ISurveyQuestion[]>([]);
  const [formInitialValues, setFormInitialValues] = useState({});

  const [displayError, setDisplayError] = useState(false);
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      const questions = await listQuestions(1);
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

      // Inicia todas as perguntas vazias.
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

  // Envia as respostas do usuário.
  function handleFormSubmit(answers: { [key: string]: string[] }) {
    setIsSendingForm(true);
    Object.keys(answers).forEach((questionId) =>
      answerQuestion(parseInt(questionId, 10), answers[questionId]),
    );
    navigation.navigate('Diary');
  }

  function InfoPage({
    handleSubmit,
    setFieldValue,
    values,
    index,
    id,
    description,
    options,
    displayOther,
    multipleSelection,
  }: IQuestionPageProps) {
    function handleNextPage(pageIndex: number) {
      // Verifica se pelo menos uma resposta foi selecionada
      if (
        values[id].length <= 0 ||
        (displayOther &&
          values[id].find((option) => option === '') !== undefined)
      ) {
        setDisplayError(true);
        return;
      }

      // Envia o formulário caso seja a última página
      setDisplayError(false);
      if (pageIndex === pages.length - 1) {
        handleSubmit();
      } else {
        goToPage(index + 1);
      }
    }

    return (
      <ScrollView width={width}>
        <HeaderBackground />
        <HeaderText>Minha rede de apoio</HeaderText>
        <ContentContainer>
          <CurrentPageContainer>
            <CurrentPageText>
              {index + 1}/{pages.length}
            </CurrentPageText>
          </CurrentPageContainer>
          <QuestionText>{description}</QuestionText>

          <ErrorContainer>
            {displayError ? <ErrorText>Pergunta obrigatória</ErrorText> : null}
          </ErrorContainer>

          <FormRadioGroupInput
            fieldName={`${id}`}
            options={options}
            multipleSelection={multipleSelection}
            displayOtherField={displayOther}
            onChange={setFieldValue}
          />

          <Footer>
            <MainButton
              buttonText={index === pages.length - 1 ? 'Finalizar' : 'Próximo'}
              disabled={isSendingForm}
              onPress={() => handleNextPage(index)}
            />
          </Footer>
        </ContentContainer>
      </ScrollView>
    );
  }

  if (isLoading) {
    return (
      <>
        <HeaderBackground />
        <HeaderText>Minha rede de apoio</HeaderText>
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
            renderItem={({ item, index }) => (
              <InfoPage
                index={index}
                {...item}
                handleSubmit={handleSubmit}
                setFieldValue={setFieldValue}
                values={values}
              />
            )}
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

export default HelpReceived;
