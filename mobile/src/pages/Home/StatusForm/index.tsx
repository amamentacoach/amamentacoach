import { Action, AppScreen } from '@common/telemetria';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';

import Modal from 'components/Modal';
import theme from 'config/theme';
import { useAuth } from 'contexts/auth';
import { answerFeedingForm, answerStatusForm } from 'services/survey';
import { getSurveyQuestions } from 'utils/getSurveyQuestions';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { StatusFormQuestion } from './StatusFormPage';
import type { RootRouteProp, RootStackProps } from 'routes/app';

import StatusFormPage from './StatusFormPage';
import {
  ColoredText,
  HeaderInfoModal,
  InfoButton,
  TextInfoModal,
} from './styles';

import QuestionIcon from '@assets/images/icons/ic_question_white.svg';

const StatusForm: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const { motherInfo } = useAuth();
  const { situation } = useRoute<RootRouteProp<'StatusForm'>>().params;
  const pagesFlatListRef = useRef<FlatList>(null);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [formScore, setFormScore] = useState<number | null>(null);

  // Não exibe a questão de alimentação se for a primeira vez do usuário respondendo a escala.
  const displayFeedingForm = situation && situation !== '1D';
  // Id da pergunta de alimentação.
  const feedingQuestionId = 6;

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
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.StatusForm },
    });
  }, []);

  // Envia as respostas do usuário.
  async function handleFormSubmit(values: {
    [key: string]: string[];
  }): ReturnType<typeof answerStatusForm> {
    if (displayFeedingForm) {
      // await answerFeedingForm(situation, values[feedingQuestionId][0]);
      await answerFeedingForm(null, values[feedingQuestionId][0]);
      delete values[feedingQuestionId];
    }

    // Envia as respostas do usuário para cada a pergunta.
    const answers = Object.keys(values).map(key => ({
      id: parseInt(key, 10),
      content: values[key][0],
    }));
    const statusFormScore = await answerStatusForm(situation, answers);
    return statusFormScore;
  }

  function fetchQuestions(): StatusFormQuestion[][] {
    const questions = getSurveyQuestions({
      category: 7,
      motherInfo,
    }).map(question => ({ ...question, isHorizontal: false }));

    let pages = [];
    // Separa 3 perguntas por página.
    for (let i = 0; i < questions.length; i += 3) {
      pages.push(questions.slice(i, i + 3));
    }
    // Adiciona a pergunta de alimentação caso necessário.
    if (displayFeedingForm) {
      const feedingQuestions = getSurveyQuestions({
        id: feedingQuestionId,
      }).map(question => ({ ...question, isHorizontal: true }));

      pages[pages.length - 1] = [
        ...pages[pages.length - 1],
        ...feedingQuestions,
      ];
    }
    return pages;
  }

  const pagesQuestions = fetchQuestions();

  return (
    <>
      <Modal
        content={i18n.t('StatusFormPage.Score', { score: formScore })}
        options={[
          {
            text: i18n.t('Close'),
            isBold: true,
            onPress: () => navigation.navigate('Home'),
          },
        ]}
        visible={!!formScore}
        color={theme.babyBlue}
      />
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
        color={theme.babyBlue}
      />
      <Modal
        options={[
          {
            text: i18n.t('Close'),
            isBold: true,
            onPress: () => setIsInfoModalVisible(false),
          },
        ]}
        visible={isInfoModalVisible}
        color={theme.babyBlue}>
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
        initialValues={{}}
        validateOnChange={false}
        onSubmit={values => handleFormSubmit(values)}>
        {({ values, errors, setFieldError, submitForm, setFieldValue }) => (
          <FlatList<StatusFormQuestion[]>
            ref={pagesFlatListRef}
            data={pagesQuestions}
            renderItem={({ item, index }) => (
              <StatusFormPage
                pageIndex={index}
                numberOfPages={pagesQuestions.length}
                questions={item}
                values={values}
                errors={errors}
                flatListRef={pagesFlatListRef}
                setFieldValue={setFieldValue}
                setFieldError={setFieldError}
                submitForm={submitForm}
                setIsErrorModalVisible={setIsErrorModalVisible}
                setFormScore={setFormScore}
              />
            )}
            keyExtractor={item => item[0].id.toString()}
            horizontal
            scrollEnabled={false}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        )}
      </Formik>
    </>
  );
};

export default StatusForm;
