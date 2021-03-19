import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DiaryForm, { IDiaryFormInfoPage } from '../../components/DiaryForm';
import MainButton from '../../components/MainButton';
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
  FirstSubOptionContainer,
  SecondSubOptionContainer,
} from './styles';
import SecondaryButton from '../../components/SecondaryButton';

const SurveyBreastfeed: React.FC = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
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
    async function handleNextPage(pageIndex: number) {
      // Verifica se pelo menos uma resposta foi selecionada
      if (isFormValid(values, question)) {
        setDisplayError(true);
        return;
      }

      setDisplayError(false);
      if (pageIndex === pagesLength - 1) {
        // Envia o formulário caso seja a última página
        setIsSendingForm(true);
        await submitForm();
        setIsSendingForm(false);
        navigation.navigate('SurveyStatistics');
      } else {
        goToPage(index + 1);
      }
    }

    return (
      <ScrollView width={width}>
        <HeaderBackground />
        <HeaderText>Amamentar um prematuro</HeaderText>
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
            {index > 0 ? (
              <FirstSubOptionContainer>
                <SecondaryButton
                  onPress={() => goToPage(index - 1)}
                  text="Voltar"
                />
              </FirstSubOptionContainer>
            ) : null}
            <SecondSubOptionContainer>
              <MainButton
                text={index === pagesLength - 1 ? 'Finalizar' : 'Próximo'}
                disabled={isSendingForm}
                onPress={() => handleNextPage(index)}
              />
            </SecondSubOptionContainer>
          </Footer>
        </ContentContainer>
      </ScrollView>
    );
  };

  return (
    <DiaryForm
      title="Amamentar um prematuro"
      category={1}
      InfoPage={InfoPage}
    />
  );
};

export default SurveyBreastfeed;
