import { Action, AppScreen } from '@common/telemetria';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList } from 'react-native';

import FormRadioGroupInput from 'components/FormRadioGroup';
import {
  CurrentPageContainer,
  CurrentPageText,
} from 'components/GenericSurveyPage/styles';
import MainButton from 'components/MainButton';
import Modal from 'components/Modal';
import SecondaryButton from 'components/SecondaryButton';
import theme from 'config/theme';
import { useAuth } from 'contexts/auth';
import { answerFeedingForm, answerStatusForm } from 'services/survey';
import { getSurveyQuestions } from 'utils/getSurveyQuestions';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { RootRouteProp, RootStackProps } from 'routes/app';
import type { SurveyQuestion } from 'utils/getSurveyQuestions';

import {
  ColoredText,
  ContentContainer,
  FirstButtonContainer,
  Footer,
  HeaderBackground,
  HeaderInfoModal,
  HeaderText,
  InfoButton,
  QuestionContainer,
  QuestionText,
  ScrollView,
  SecondButtonContainer,
  TextInfoModal,
} from './styles';

import QuestionIcon from '@assets/images/icons/ic_question_white.svg';

// Página do formulário.
interface PageProps {
  pageIndex: number;
  questions: SurveyQuestion[];
  values: {
    [key: string]: string[];
  };
  errors: {
    [key: string]: string;
  };
  setFieldError: (field: string, message: string) => void;
  // Define o valor de uma resposta.
  setFieldValue: (field: string, value: any) => void;
  submitForm: () => Promise<number | null>;
}

const StatusForm: React.FC = () => {
  const { width } = Dimensions.get('window');
  const navigation = useNavigation<RootStackProps>();
  const { motherInfo } = useAuth();
  const { situation } = useRoute<RootRouteProp<'StatusForm'>>().params;

  // Não exibe a questão de alimentação se for a primeira vez do usuário respondendo a escala.
  const displayFeedingForm = situation !== '1D';

  const [pageQuestions, setPageQuestions] = useState<SurveyQuestion[][]>([]);
  const [feedingQuestion, setFeedingQuestion] = useState<SurveyQuestion>();

  const pageFlatListRef = useRef<FlatList>(null);
  const [formInitialValues, setFormInitialValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [formScore, setFormScore] = useState<number | null>(null);

  // Adiciona um botão na parte superior direita da tela para exibir um popup de ajuda.
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <InfoButton
          onPress={() => setIsInfoModalVisible(true)}
          activeOpacity={0.7}>
          <QuestionIcon />
        </InfoButton>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    function fetchQuestions(): void {
      const statusQuestions = getSurveyQuestions({
        category: 7,
        motherInfo,
      });
      const feedingQuestions = getSurveyQuestions({
        id: 6,
        motherInfo,
      });

      // Inicia todas as respostas vazias.
      let initialValues = statusQuestions.reduce(
        (object, page) => ({
          ...object,
          [page.id]: [],
        }),
        {},
      );

      if (displayFeedingForm) {
        initialValues = { ...initialValues, feeding: '' };
        setFeedingQuestion(feedingQuestions[0]);
      }

      const pages = [];
      // Separa 3 perguntas por página.
      for (let i = 0; i < statusQuestions.length; i += 3)
        pages.push(statusQuestions.slice(i, i + 3));
      setPageQuestions(pages);

      setFormInitialValues(initialValues);
      setIsLoading(false);
    }

    fetchQuestions();
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.StatusForm },
    });
  }, []);

  // Envia as respostas do usuário.
  async function handleFormSubmit(values: {
    [key: string]: string[];
  }): ReturnType<typeof answerStatusForm> {
    const { feeding, ...answers } = values;

    const statusAnswers = Object.keys(answers).map(key => ({
      id: parseInt(key, 10),
      content: values[key][0],
    }));
    const statusFormScore = await answerStatusForm(situation, statusAnswers);

    if (displayFeedingForm) {
      // @ts-ignore
      await answerFeedingForm(situation, feeding[0]);
    }
    return statusFormScore;
  }

  // Verifica se pelo menos uma opção foi selecionada para cada pergunta da página.
  function validateForm(
    currentPageIndex: number,
    questions: SurveyQuestion[],
    values: {
      [key: string]: string[];
    },
    setFieldError: (field: string, message: string) => void,
  ): boolean {
    let isValid = true;
    questions.forEach(question => {
      if (values[question.id].length <= 0) {
        setFieldError(question.id.toString(), i18n.t('Yup.AnswerRequired'));
        isValid = false;
      } else {
        setFieldError(question.id.toString(), '');
      }
    });

    if (currentPageIndex === pageQuestions.length - 1 && displayFeedingForm) {
      if (values.feeding.length <= 0) {
        setFieldError('feeding', i18n.t('Yup.AnswerRequired'));
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
    questions: SurveyQuestion[],
    values: {
      [key: string]: string[];
    },
    setFieldError: (field: string, message: string) => void,
    submitForm: () => Promise<number | null>,
  ): Promise<void> {
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
      const score = await submitForm();
      setIsSendingForm(false);
      if (score) {
        await createTelemetryAction({
          action: Action.Pressed,
          context: {
            screen: AppScreen.StatusForm,
            target: 'Actions.End',
          },
        });
        setFormScore(score);
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
                text={i18n.t('GoBack')}
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
                pageIndex >= pageQuestions.length - 1
                  ? i18n.t('Actions.End')
                  : i18n.t('Next')
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
        <HeaderText>{i18n.t('StatusFormPage.Header')}</HeaderText>
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
        content={i18n.t('StatusFormPage.Score', { score: formScore })}
        color={theme.babyBlue}
        options={[
          {
            text: i18n.t('Close'),
            isBold: true,
            onPress: () => navigation.navigate('Home'),
          },
        ]}
        visible={!!formScore}
      />
      <Modal
        color={theme.babyBlue}
        content={i18n.t('SurveyComponent.SubmitError')}
        options={[
          {
            text: i18n.t('Close'),
            isBold: true,
            onPress: () => setIsErrorModalVisible(false),
          },
        ]}
        visible={isErrorModalVisible}
      />
      <Modal
        color={theme.babyBlue}
        options={[
          {
            text: i18n.t('Close'),
            isBold: true,
            onPress: () => setIsInfoModalVisible(false),
          },
        ]}
        visible={isInfoModalVisible}>
        <HeaderInfoModal>{i18n.t('StatusFormPage.FormName')}</HeaderInfoModal>
        <TextInfoModal>
          <ColoredText>1</ColoredText> = {i18n.t('StatusFormPage.Value1')}
        </TextInfoModal>
        <TextInfoModal>
          <ColoredText>2</ColoredText> = {i18n.t('StatusFormPage.Value2')}
        </TextInfoModal>
        <TextInfoModal>
          <ColoredText>3</ColoredText> = {i18n.t('StatusFormPage.Value3')}
        </TextInfoModal>
        <TextInfoModal>
          <ColoredText>4</ColoredText> = {i18n.t('StatusFormPage.Value4')}
        </TextInfoModal>
        <TextInfoModal>
          <ColoredText>5</ColoredText> = {i18n.t('StatusFormPage.Value5')}
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
                <HeaderText>{i18n.t('StatusFormPage.Header')}</HeaderText>
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
