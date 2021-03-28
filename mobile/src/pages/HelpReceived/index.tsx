import React from 'react';
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
} from './styles';

const HelpReceived: React.FC = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');

  const InfoPage: React.FC<IDiaryFormInfoPage> = ({
    index,
    pagesLength,
    question,
    isFormValid,
    isSendingForm,
    setFieldValue,
    handleChangePage,
  }) => {
    return (
      <ScrollView width={width}>
        <HeaderBackground />
        <HeaderText>Minha rede de apoio</HeaderText>
        <ContentContainer>
          <CurrentPageContainer>
            <CurrentPageText>
              {index + 1}/{pagesLength}
            </CurrentPageText>
          </CurrentPageContainer>
          <QuestionText>{question.description}</QuestionText>

          <ErrorContainer>
            {!isFormValid && <ErrorText>Pergunta obrigatória</ErrorText>}
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
              text={index === pagesLength - 1 ? 'Finalizar' : 'Próximo'}
              disabled={isSendingForm}
              onPress={() =>
                handleChangePage(index + 1, () => navigation.navigate('Diary'))
              }
            />
          </Footer>
        </ContentContainer>
      </ScrollView>
    );
  };

  return (
    <DiaryForm title="Minha rede de apoio" category={4} InfoPage={InfoPage} />
  );
};

export default HelpReceived;
