import i18n from 'i18n-js';
import { memo, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';

import FormRadioGroupInput from 'components/FormRadioGroup';
import MainButton from 'components/MainButton';
import SecondaryButton from 'components/SecondaryButton';
import theme from 'config/theme';
import { Flex } from 'lib/sharedStyles';

import type { SurveyQuestion } from 'utils/surveyQuestionsRepository';

import {
  ContentContainer,
  FirstButtonContainer,
  Footer,
  HeaderBackground,
  HeaderText,
  QuestionText,
  ScrollView,
  ColoredInfoText,
  ValuesInfoText,
} from './styles';

// Página do formulário de escala.
interface PageProps {
  // Índice da página atual.
  pageIndex: number;
  // Número de páginas no formulário.
  numberOfPages: number;
  // Questões da página.
  questions: SurveyQuestion[];
  // Respostas do usuário para cada pergunta.
  values: {
    [key: string]: string[];
  };
  // Erros para cada pergunta.
  errors: {
    [key: string]: string;
  };
  // Flat list onde o formulário está contido.
  flatListRef: React.RefObject<FlatList>;
  // Define um erro para uma respostas
  setFieldError: (field: string, message: string) => void;
  // Define o valor de uma resposta.
  setFieldValue: (field: string, value: any) => void;
  // Envia o formulário.
  submitForm: () => Promise<void>;
}

// Página do formulário.
const StatusFormPage: React.FC<PageProps> = ({
  pageIndex,
  numberOfPages,
  questions,
  values,
  errors,
  flatListRef,
  setFieldValue,
  setFieldError,
  submitForm,
}) => {
  const { width } = Dimensions.get('window');
  const [isSendingForm, setIsSendingForm] = useState(false);

  // Verifica se pelo menos uma opção foi selecionada para cada pergunta da página.
  function validateCurrentFormPage(): boolean {
    let isValid = true;
    questions.forEach(question => {
      if (values[question.id]?.length > 0) {
        setFieldError(question.id.toString(), '');
      } else {
        setFieldError(question.id.toString(), i18n.t('Yup.AnswerRequired'));
        isValid = false;
      }
    });
    return isValid;
  }

  // Altera a página atual do formulário, entretanto a mudança de página só é possível se os campos
  // dá pagina atual estiverem preenchidos.
  // Caso a página atual seja a última o formulário é enviado.
  async function handleChangePage(
    currentPage: number,
    newPage: number,
  ): Promise<void> {
    // Verifica se pelo menos uma resposta foi selecionada ao avançar a página.
    if (newPage > currentPage && !validateCurrentFormPage()) {
      return;
    }

    if (newPage < numberOfPages) {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: newPage,
      });
      return;
    }

    // Envia o formulário caso seja a última página
    setIsSendingForm(true);
    await submitForm();
    setIsSendingForm(false);
  }

  return (
    <ScrollView width={width}>
      <HeaderBackground />
      <HeaderText>{i18n.t('StatusFormPage.Header')}</HeaderText>
      <ContentContainer>
        <ValuesInfoText>{i18n.t('StatusFormPage.Intro')}</ValuesInfoText>
        <ValuesInfoText>
          <ColoredInfoText>1</ColoredInfoText> ={' '}
          {i18n.t('StatusFormPage.InfoValue1')}
        </ValuesInfoText>
        <ValuesInfoText>
          <ColoredInfoText>2</ColoredInfoText> ={' '}
          {i18n.t('StatusFormPage.InfoValue2')}
        </ValuesInfoText>
        <ValuesInfoText>
          <ColoredInfoText>3</ColoredInfoText> ={' '}
          {i18n.t('StatusFormPage.InfoValue3')}
        </ValuesInfoText>
        <ValuesInfoText>
          <ColoredInfoText>4</ColoredInfoText> ={' '}
          {i18n.t('StatusFormPage.InfoValue4')}
        </ValuesInfoText>
        <ValuesInfoText>
          <ColoredInfoText>5</ColoredInfoText> ={' '}
          {i18n.t('StatusFormPage.InfoValue5')}
        </ValuesInfoText>

        <Flex>
          {questions.map((question, questionIndex) => (
            <Flex key={question.id}>
              <QuestionText>
                {pageIndex * questions.length + questionIndex + 1} -{' '}
                {question.description}
              </QuestionText>

              <FormRadioGroupInput
                color={theme.babyBlue}
                direction="row"
                displayOtherField={question.displayOther}
                error={errors[question.id]}
                options={question.options}
                values={values[question.id]}
                onChange={fieldValues =>
                  setFieldValue(question.id.toString(), fieldValues[0])
                }
              />
            </Flex>
          ))}
        </Flex>

        <Footer>
          {pageIndex > 0 && (
            <FirstButtonContainer>
              <SecondaryButton
                color={theme.babyBlue}
                disabled={isSendingForm}
                text={i18n.t('GoBack')}
                onPress={() => handleChangePage(pageIndex, pageIndex - 1)}
              />
            </FirstButtonContainer>
          )}
          <Flex>
            <MainButton
              color={theme.babyBlue}
              disabled={isSendingForm}
              text={
                pageIndex >= numberOfPages - 1
                  ? i18n.t('Actions.End')
                  : i18n.t('Next')
              }
              onPress={() => handleChangePage(pageIndex, pageIndex + 1)}
            />
          </Flex>
        </Footer>
      </ContentContainer>
    </ScrollView>
  );
};

// Evita redesenhar a página a não ser que as respostas ou erros tenham mudado.
const MemoizedStatusFormPage = memo(StatusFormPage, (prevProps, nextProps) => {
  return prevProps.questions.every(
    ({ id }) =>
      prevProps.values[id] === nextProps.values[id] &&
      prevProps.errors[id] === nextProps.errors[id],
  );
});

export default MemoizedStatusFormPage;
