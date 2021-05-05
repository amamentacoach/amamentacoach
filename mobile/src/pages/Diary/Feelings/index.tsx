import React from 'react';
import { useNavigation, StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import 'moment/locale/pt-br';

import theme from '../../../config/theme';
import { dateFormatVerbose } from '../../../utils/date';
import DiaryForm, { DiaryFormPage } from '../../../components/DiaryForm';
import MainButton from '../../../components/MainButton';
import SecondaryButton from '../../../components/SecondaryButton';
import FormRadioGroupInput from '../../../components/FormRadioGroup';

import { Container, Footer, SecondFooterButtonContainer } from './styles';
import {
  CurrentPageContainer,
  CurrentPageText,
  QuestionText,
} from '../../../components/GenericDiaryFormPage/styles';

const Feelings: React.FC = () => {
  const navigation = useNavigation();
  const currentDate = dateFormatVerbose(moment());

  // Marca o formulário como enviado no dia.
  async function setFormSent() {
    await AsyncStorage.setItem(
      '@AmamentaCoach:DiaryFeelingsLastDate',
      new Date().toISOString(),
    );
  }

  // Executada caso o usuário decida traçar suas metas.
  const onFormEndGoals = async () => {
    await setFormSent();
    navigation.dispatch(StackActions.replace('Goals'));
  };

  // Executada se o usuário decidir não traçar suas metas.
  const onFormEndDiary = async () => {
    await setFormSent();
    navigation.navigate('Diary');
  };

  const FormPage: React.FC<DiaryFormPage> = ({
    index,
    pagesLength,
    question,
    isFormValid,
    isDirty,
    isSendingForm,
    setFieldValue,
    handleChangePage,
  }) => (
    <Container>
      <CurrentPageContainer color={theme.babyPurple}>
        <CurrentPageText>
          {index + 1}/{pagesLength}
        </CurrentPageText>
      </CurrentPageContainer>
      <QuestionText>{question.description}</QuestionText>

      <FormRadioGroupInput
        color={theme.babyPurple}
        fieldName={`${question.id}`}
        options={question.options}
        multipleSelection={question.multipleSelection}
        displayOtherField={question.displayOther}
        error={isFormValid ? '' : 'Pergunta obrigatória'}
        onChange={setFieldValue}
      />

      <Footer>
        <MainButton
          color={theme.babyPurple}
          text={index === pagesLength - 1 ? 'Salvar e traçar metas' : 'Próximo'}
          disabled={!isDirty || isSendingForm}
          onPress={() => handleChangePage(index + 1, onFormEndGoals)}
        />
        {index === pagesLength - 1 && (
          <SecondFooterButtonContainer>
            <SecondaryButton
              color={theme.babyPurple}
              text="Salvar e sair"
              disabled={!isDirty || isSendingForm}
              onPress={() => handleChangePage(index + 1, onFormEndDiary)}
            />
          </SecondFooterButtonContainer>
        )}
      </Footer>
    </Container>
  );

  return (
    <DiaryForm
      title={currentDate}
      color={theme.babyPurple}
      category={2}
      Page={FormPage}
      onFeedbackAccepted={setFormSent}
    />
  );
};

export default Feelings;
