import React from 'react';
import { useNavigation, StackActions } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/pt-br';

import dateFormatVerbose from '../../../utils/date';
import DiaryForm, { IDiaryFormPage } from '../../../components/DiaryForm';
import MainButton from '../../../components/MainButton';
import SecondaryButton from '../../../components/SecondaryButton';
import FormRadioGroupInput from '../../../components/FormRadioGroup';

import {
  Container,
  Footer,
  QuestionText,
  CurrentPageContainer,
  CurrentPageText,
  SecondFooterButtonContainer,
} from './styles';

const Feelings: React.FC = () => {
  const navigation = useNavigation();
  const currentDate = dateFormatVerbose(moment());

  const InfoPage: React.FC<IDiaryFormPage> = ({
    index,
    pagesLength,
    question,
    isFormValid,
    isSendingForm,
    setFieldValue,
    handleChangePage,
  }) => {
    const onFormEndGoals = () =>
      navigation.dispatch(StackActions.replace('Goals'));
    const onFormEndDiary = () => navigation.navigate('Diary');

    return (
      <Container>
        <CurrentPageContainer>
          <CurrentPageText>
            {index + 1}/{pagesLength}
          </CurrentPageText>
        </CurrentPageContainer>
        <QuestionText>{question.description}</QuestionText>

        <FormRadioGroupInput
          fieldName={`${question.id}`}
          options={question.options}
          multipleSelection={question.multipleSelection}
          displayOtherField={question.displayOther}
          error={isFormValid ? '' : 'Pergunta obrigatória'}
          onChange={setFieldValue}
        />

        <Footer>
          <MainButton
            text={
              index === pagesLength - 1 ? 'Salvar e traçar metas' : 'Próximo'
            }
            disabled={isSendingForm}
            onPress={() => handleChangePage(index + 1, onFormEndGoals)}
          />
          {index === pagesLength - 1 && (
            <SecondFooterButtonContainer>
              <SecondaryButton
                text="Salvar e sair"
                disabled={isSendingForm}
                onPress={() => handleChangePage(index + 1, onFormEndDiary)}
              />
            </SecondFooterButtonContainer>
          )}
        </Footer>
      </Container>
    );
  };

  return <DiaryForm title={currentDate} category={2} Page={InfoPage} />;
};

export default Feelings;
