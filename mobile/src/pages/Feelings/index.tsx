import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/pt-br';

import dateFormatVerbose from '../../utils/date';
import DiaryForm, { IDiaryFormInfoPage } from '../../components/DiaryForm';
import MainButton from '../../components/MainButton';
import SecondaryButton from '../../components/SecondaryButton';
import FormRadioGroupInput from '../../components/FormRadioGroup';

import {
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
  SecondFooterButtonContainer,
} from './styles';

const Feelings: React.FC = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const currentDate = dateFormatVerbose(moment());

  const [displayError, setDisplayError] = useState(false);
  const [isSendingForm, setIsSendingForm] = useState(false);

  const InfoPage: React.FC<IDiaryFormInfoPage> = ({
    index,
    pagesLength,
    question,
    values,
    setFieldValue,
    isFormValid,
    submitForm,
    goToPage,
  }) => {
    // Caso seja a última página envia o formulário, caso contrário avança para a próxima página.
    async function handleNextPage(pageIndex: number) {
      if (isFormValid(values, question)) {
        setDisplayError(true);
        return;
      }

      setDisplayError(false);
      if (pageIndex === pagesLength - 1) {
        setIsSendingForm(true);
        await submitForm();
        navigation.dispatch(StackActions.replace('Goals'));
      } else {
        goToPage(index + 1);
      }
    }

    // Envia o formulário e retorna para o diário.
    async function handleSaveAndExit() {
      if (isFormValid(values, question)) {
        setDisplayError(true);
        return;
      }
      setIsSendingForm(true);
      await submitForm();
      navigation.navigate('Diary');
    }

    return (
      <ScrollView width={width}>
        <HeaderBackground />
        <HeaderText>{currentDate}</HeaderText>
        <ContentContainer>
          <CurrentPageContainer>
            <CurrentPageText>
              {index + 1}/{pagesLength}
            </CurrentPageText>
          </CurrentPageContainer>
          <QuestionText>{question.description}</QuestionText>

          <ErrorContainer>
            {displayError ? <ErrorText>Pergunta obrigatória</ErrorText> : null}
          </ErrorContainer>

          <FormRadioGroupInput
            fieldName={`${question.id}`}
            options={question.options}
            multipleSelection={question.multipleSelection}
            displayOtherField={question.displayOther}
            onChange={setFieldValue}
          />

          <Footer>
            <MainButton
              text={
                index === pagesLength - 1 ? 'Salvar e traçar metas' : 'Próximo'
              }
              disabled={isSendingForm}
              onPress={() => handleNextPage(index)}
            />
            {index === pagesLength - 1 ? (
              <SecondFooterButtonContainer>
                <SecondaryButton
                  text="Salvar e sair"
                  disabled={isSendingForm}
                  onPress={handleSaveAndExit}
                />
              </SecondFooterButtonContainer>
            ) : null}
          </Footer>
        </ContentContainer>
      </ScrollView>
    );
  };

  return <DiaryForm title={currentDate} category={2} InfoPage={InfoPage} />;
};

export default Feelings;
