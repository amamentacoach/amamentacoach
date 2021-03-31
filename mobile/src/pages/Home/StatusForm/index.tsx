import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  listStatusFormQuestions,
  IStatusForm,
  answerStatusForm,
  answerFeedingForm,
} from '../../../services/survey';
import Modal from '../../../components/Modal';
import FormRadioGroupInput from '../../../components/FormRadioGroup';
import MainButton from '../../../components/MainButton';

import {
  HeaderBackground,
  ContentContainer,
  HeaderText,
  FormScrollView,
  QuestionContainer,
  QuestionText,
  Footer,
} from './styles';

type ScreenParams = {
  StatusForm: {
    situation: 'ALTA' | '1' | '15D' | '1M';
  };
};

const StatusForm: React.FC = () => {
  const navigation = useNavigation();
  const { situation } = useRoute<
    RouteProp<ScreenParams, 'StatusForm'>
  >().params;
  const scrollViewRef = useRef<ScrollView>(null);

  const [questions, setQuestions] = useState<IStatusForm>();
  const [formInitialValues, setFormInitialValues] = useState({});
  const [formYupSchema, setFormYupSchema] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const inputsPositions = useRef({} as { [key: string]: number });

  const [isSendingForm, setIsSendingForm] = useState(false);

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  // Espera os elementos aparecerem e coleta suas posições y.
  const onLayout = useCallback((y, questionId) => {
    // Inclui a posição do elemento atual em inputsPositions.
    const copy = { ...inputsPositions.current };
    copy[questionId] = y;
    inputsPositions.current = copy;
  }, []);

  // Cria um schema do Yup que marca todas as perguntas como obrigatórias.
  function createYupSchema(questionsIds: string[]) {
    const schema: { [k: string]: any } = {};
    const validator = Yup.string().required('Campo obrigatório');
    questionsIds.forEach(id => {
      schema[id] = validator;
    });
    return schema;
  }

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

      let ids = form.statusQuestions.map(question => question.id.toString());
      if (situation !== '1') {
        ids = [...ids, 'feeding'];
        initialValues = { ...initialValues, feeding: '' };
      }
      const yupSchema = createYupSchema(ids);

      setFormInitialValues(initialValues);
      setFormYupSchema(Yup.object().shape(yupSchema));
      setQuestions(form);
      setIsLoading(false);
    }

    fetchQuestions();
  }, []);

  // Move a tela até o primeiro campo com erro.
  async function scrollToError(errors: { [key: string]: string }) {
    const firstErrorId = Object.keys(errors)[0];
    scrollViewRef.current?.scrollTo({
      x: 0,
      y: inputsPositions.current[firstErrorId],
      animated: true,
    });
  }

  async function handleFormSubmit(values: { [key: string]: string[] }) {
    const { feeding, ...answers } = values;

    const statusAnswers = Object.keys(answers).map(key => ({
      id: parseInt(key, 10),
      content: values[key][0],
    }));
    setIsSendingForm(true);
    await answerStatusForm(situation, statusAnswers);

    if (situation !== '1') {
      await answerFeedingForm(situation, feeding[0]);
    }
    setIsSendingForm(false);
    navigation.navigate('Home');
  }

  if (isLoading) {
    return (
      <>
        <HeaderBackground />
        <HeaderText>Escala</HeaderText>
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

      <Formik
        initialValues={formInitialValues}
        validationSchema={formYupSchema}
        validateOnChange={false}
        onSubmit={values => handleFormSubmit(values)}>
        {({ submitForm, setFieldValue, validateForm, errors }) => (
          <FormScrollView ref={scrollViewRef as any}>
            <HeaderBackground />
            <HeaderText>Escala</HeaderText>
            <ContentContainer>
              {questions?.statusQuestions.map(question => (
                <QuestionContainer
                  key={question.id}
                  onLayout={event =>
                    onLayout(event.nativeEvent.layout.y, question.id.toString())
                  }>
                  <QuestionText>{question.description}</QuestionText>

                  <FormRadioGroupInput
                    fieldName={`${question.id}`}
                    options={question.options}
                    multipleSelection={question.multipleSelection}
                    displayOtherField={question.displayOther}
                    error={(errors as { [k: string]: string })[question.id]}
                    onChange={setFieldValue}
                  />
                </QuestionContainer>
              ))}

              {situation !== '1' && questions?.feedingQuestion && (
                <QuestionContainer
                  key={questions?.feedingQuestion.id}
                  onLayout={event =>
                    onLayout(event.nativeEvent.layout.y, 'feeding')
                  }>
                  <QuestionText>
                    {questions?.feedingQuestion.description}
                  </QuestionText>

                  <FormRadioGroupInput
                    fieldName="feeding"
                    options={questions?.feedingQuestion.options}
                    multipleSelection={
                      questions?.feedingQuestion.multipleSelection
                    }
                    displayOtherField={questions?.feedingQuestion.displayOther}
                    error={(errors as { [k: string]: string }).feeding}
                    onChange={setFieldValue}
                  />
                </QuestionContainer>
              )}

              <Footer>
                <MainButton
                  text="Enviar"
                  disabled={isSendingForm}
                  onPress={async () => {
                    const newErrors = await validateForm();
                    if (Object.keys(newErrors).length > 0) {
                      scrollToError(newErrors);
                    } else {
                      submitForm();
                    }
                  }}
                />
              </Footer>
            </ContentContainer>
          </FormScrollView>
        )}
      </Formik>
    </>
  );
};

export default StatusForm;
