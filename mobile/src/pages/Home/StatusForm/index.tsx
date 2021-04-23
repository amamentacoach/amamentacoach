import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';

import theme from '../../../config/theme';
import {
  listStatusFormQuestions,
  answerStatusForm,
  answerFeedingForm,
  ISurveyQuestion,
} from '../../../services/survey';
import Modal from '../../../components/Modal';
import FormRadioGroupInput from '../../../components/FormRadioGroup';
import MainButton from '../../../components/MainButton';

import {
  HeaderBackground,
  ContentContainer,
  HeaderText,
  ScrollView,
  QuestionContainer,
  QuestionText,
  Footer,
  InfoButton,
  HeaderInfoModal,
  TextInfoModal,
  ColoredText,
  SecondButtonContainer,
  FirstButtonContainer,
} from './styles';
import {
  CurrentPageContainer,
  CurrentPageText,
} from '../../../components/GenericDiaryFormPage/styles';

import QuestionIcon from '../../../../assets/images/icons/ic_question_white.png';
import SecondaryButton from '../../../components/SecondaryButton';

// Página do formulário.
interface PageProps {
  pageIndex: number;
  questions: ISurveyQuestion[];
  values: {
    [key: string]: string[];
  };
  errors: {
    [key: string]: string;
  };
  setFieldError: (field: string, message: string) => void;
  // Define o valor de uma resposta.
  setFieldValue: (field: string, value: any) => void;
  submitForm: () => Promise<boolean>;
}

type ScreenParams = {
  StatusForm: {
    situation: 'ALTA' | '1D' | '15D' | '1M';
  };
};

const StatusForm: React.FC = () => {
  const { width } = Dimensions.get('window');
  const navigation = useNavigation();
  const { situation } = useRoute<
    RouteProp<ScreenParams, 'StatusForm'>
  >().params;

  // Não exibe o formulário de alimentação se for a primeira vez do usuário respondendo a escala.
  const displayFeedingForm = situation !== '1D';

  const [pageQuestions, setPageQuestions] = useState<ISurveyQuestion[][]>([]);
  const [feedingQuestion, setFeedingQuestion] = useState<ISurveyQuestion>();

  const pageFlatListRef = useRef<FlatList>(null);
  const [formInitialValues, setFormInitialValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isEndModalVisible, setIsEndModalVisible] = useState(false);

  // Adiciona um botão na parte superior direita da tela para exibir um popup de ajuda.
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <InfoButton
          onPress={() => setIsInfoModalVisible(true)}
          activeOpacity={0.7}>
          <Image source={QuestionIcon} />
        </InfoButton>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    async function fetchQuestions() {
      const form = await listStatusFormQuestions();
      if (!form) {
        return;
      }

      // Inicia todas as respostas vazias.
      let initialValues = form.statusQuestions.reduce(
        (object, page) => ({
          ...object,
          [page.id]: [],
        }),
        {},
      );

      if (displayFeedingForm) {
        initialValues = { ...initialValues, feeding: '' };
        setFeedingQuestion(form.feedingQuestion);
      }

      const pages = [];
      // Separa 3 perguntas por página.
      for (let i = 0; i < form.statusQuestions.length; i += 3)
        pages.push(form.statusQuestions.slice(i, i + 3));
      setPageQuestions(pages);

      setFormInitialValues(initialValues);
      setIsLoading(false);
    }

    fetchQuestions();
  }, []);

  // Envia as respostas do usuário.
  async function handleFormSubmit(values: { [key: string]: string[] }) {
    const { feeding, ...answers } = values;

    const statusAnswers = Object.keys(answers).map(key => ({
      id: parseInt(key, 10),
      content: values[key][0],
    }));
    const statusFormSuccess = await answerStatusForm(situation, statusAnswers);

    if (displayFeedingForm) {
      // @ts-ignore
      const feedingFormSuccess = await answerFeedingForm(situation, feeding[0]);
      return statusFormSuccess && feedingFormSuccess;
    }
    return statusFormSuccess;
  }

  // Verifica se pelo menos uma opção foi selecionada para cada pergunta da página.
  function validateForm(
    currentPageIndex: number,
    questions: ISurveyQuestion[],
    values: {
      [key: string]: string[];
    },
    setFieldError: (field: string, message: string) => void,
  ) {
    let isValid = true;
    questions.forEach(question => {
      if (values[question.id].length <= 0) {
        setFieldError(question.id.toString(), 'Pergunta obrigatória');
        isValid = false;
      } else {
        setFieldError(question.id.toString(), '');
      }
    });

    if (currentPageIndex === pageQuestions.length - 1 && displayFeedingForm) {
      if (values.feeding.length <= 0) {
        setFieldError('feeding', 'Pergunta obrigatória');
        isValid = false;
      } else {
        setFieldError('feeding', '');
      }
    }
    return isValid;
  }

  // Altera a página atual do formulário, entretanto a mudança de página só é possível se os campos
  // dá pagina atual estiverem preenchidos.
  // Caso a página atual seja a última o formulário é enviado.
  async function handleChangePage(
    currentPage: number,
    newPage: number,
    questions: ISurveyQuestion[],
    values: {
      [key: string]: string[];
    },
    setFieldError: (field: string, message: string) => void,
    submitForm: () => Promise<boolean>,
  ) {
    // Verifica se pelo menos uma resposta foi selecionada ao avançar a página.
    if (
      newPage > currentPage &&
      !validateForm(currentPage, questions, values, setFieldError)
    ) {
      return;
    }

    // Envia o formulário caso seja a última página
    if (newPage === pageQuestions.length) {
      setIsSendingForm(true);
      const status = await submitForm();
      setIsSendingForm(false);
      if (status) {
        setIsEndModalVisible(true);
      } else {
        setIsErrorModalVisible(true);
      }
    } else {
      pageFlatListRef.current?.scrollToIndex({
        animated: true,
        index: newPage,
      });
    }
  }

  // Página do formulário.
  const Page: React.FC<PageProps> = ({
    pageIndex,
    questions,
    values,
    errors,
    setFieldValue,
    setFieldError,
    submitForm,
  }) => {
    return (
      <ContentContainer>
        <CurrentPageContainer color={theme.babyBlue}>
          <CurrentPageText>
            {pageIndex + 1}/{pageQuestions.length}
          </CurrentPageText>
        </CurrentPageContainer>

        {questions.map((question, questionIndex) => (
          <QuestionContainer key={question.id}>
            <QuestionText>
              {pageIndex * 3 + questionIndex + 1} - {question.description}
            </QuestionText>

            <FormRadioGroupInput
              color={theme.babyBlue}
              fieldName={`${question.id}`}
              options={question.options}
              multipleSelection={question.multipleSelection}
              displayOtherField={question.displayOther}
              error={errors[question.id]}
              initialValues={values[question.id]}
              onChange={setFieldValue}
              horizontal
            />
          </QuestionContainer>
        ))}

        {feedingQuestion && pageIndex >= pageQuestions.length - 1 && (
          <QuestionContainer key={feedingQuestion.id}>
            <QuestionText>
              {pageQuestions.length * 3 + 1} - {feedingQuestion.description}
            </QuestionText>

            <FormRadioGroupInput
              color={theme.babyBlue}
              fieldName="feeding"
              options={feedingQuestion.options}
              multipleSelection={feedingQuestion.multipleSelection}
              displayOtherField={feedingQuestion.displayOther}
              error={(errors as { [k: string]: string }).feeding}
              initialValues={values.feeding}
              onChange={setFieldValue}
            />
          </QuestionContainer>
        )}

        <Footer>
          {pageIndex > 0 && (
            <FirstButtonContainer>
              <SecondaryButton
                color={theme.babyBlue}
                text="Voltar"
                disabled={isSendingForm}
                onPress={() =>
                  handleChangePage(
                    pageIndex,
                    pageIndex - 1,
                    questions,
                    values,
                    setFieldError,
                    submitForm,
                  )
                }
              />
            </FirstButtonContainer>
          )}
          <SecondButtonContainer>
            <MainButton
              color={theme.babyBlue}
              text={
                pageIndex >= pageQuestions.length - 1 ? 'Finalizar' : 'Próximo'
              }
              disabled={isSendingForm}
              onPress={() =>
                handleChangePage(
                  pageIndex,
                  pageIndex + 1,
                  questions,
                  values,
                  setFieldError,
                  submitForm,
                )
              }
            />
          </SecondButtonContainer>
        </Footer>
      </ContentContainer>
    );
  };

  if (isLoading) {
    return (
      <>
        <HeaderBackground />
        <HeaderText>Autoconfiança para amamentar</HeaderText>
        <ContentContainer>
          <ActivityIndicator
            size="large"
            color={theme.babyBlue}
            animating={isLoading}
          />
        </ContentContainer>
      </>
    );
  }

  return (
    <>
      <Modal
        content={`Obrigada por responder.\nSua resposta foi enviada!`}
        options={[
          {
            text: 'Fechar',
            isBold: true,
            onPress: () => navigation.navigate('Home'),
          },
        ]}
        visible={isEndModalVisible}
      />
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
      <Modal
        options={[
          {
            text: 'Fechar',
            isBold: true,
            onPress: () => setIsInfoModalVisible(false),
          },
        ]}
        visible={isInfoModalVisible}>
        <HeaderInfoModal>Escala</HeaderInfoModal>
        <TextInfoModal>
          <ColoredText>1</ColoredText> = nada confiante
        </TextInfoModal>
        <TextInfoModal>
          <ColoredText>2</ColoredText> = muito pouco confiante
        </TextInfoModal>
        <TextInfoModal>
          <ColoredText>3</ColoredText> = às vezes confiante
        </TextInfoModal>
        <TextInfoModal>
          <ColoredText>4</ColoredText> = confiante
        </TextInfoModal>
        <TextInfoModal>
          <ColoredText>5</ColoredText> = muito confiante
        </TextInfoModal>
      </Modal>

      <Formik
        initialValues={formInitialValues}
        validateOnChange={false}
        onSubmit={values => handleFormSubmit(values)}>
        {({ values, errors, setFieldError, submitForm, setFieldValue }) => (
          <FlatList
            ref={pageFlatListRef}
            data={pageQuestions}
            renderItem={({ item, index }) => (
              <ScrollView width={width}>
                <HeaderBackground />
                <HeaderText>Autoconfiança para amamentar</HeaderText>
                <Page
                  pageIndex={index}
                  questions={item}
                  values={values}
                  errors={errors}
                  setFieldValue={setFieldValue}
                  setFieldError={setFieldError}
                  submitForm={submitForm}
                />
              </ScrollView>
            )}
            keyExtractor={item => item[0].id.toString()}
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

export default StatusForm;
