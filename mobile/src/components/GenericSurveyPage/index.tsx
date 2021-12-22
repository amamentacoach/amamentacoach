import i18n from 'i18n-js';

import FormRadioGroupInput from 'components/FormRadioGroup';
import MainButton from 'components/MainButton';
import { Flex } from 'lib/sharedStyles';

import type { SurveyPage } from 'components/Survey';
import type { SvgProps } from 'react-native-svg';

import {
  CurrentPageContainer,
  CurrentPageText,
  Footer,
  FullWidthImage,
  ImageContainer,
  QuestionText,
} from './styles';

// Retorna uma página genérica que pode ser fornecida a um componente Survey.
// Ao final do formulário a função onFormEnd é executada.
const createGenericSurveyPage = (
  onFormEnd: () => void,
  Images?: React.FC<SvgProps>[],
): React.FC<SurveyPage> => {
  const Page: React.FC<SurveyPage> = ({
    index,
    pagesLength,
    question,
    isFormValid,
    isDirty,
    isSendingForm,
    color,
    setFieldValue,
    handleChangePage,
  }) => {
    const Image = Images ? Images[index] : undefined;

    return (
      <Flex>
        <CurrentPageContainer color={color}>
          <CurrentPageText>
            {index + 1}/{pagesLength}
          </CurrentPageText>
        </CurrentPageContainer>
        {Image && (
          <ImageContainer>
            <FullWidthImage
              height={180}
              resizeMode="contain"
              source={Image}
              width="100%"
            />
          </ImageContainer>
        )}
        <QuestionText>{question.description}</QuestionText>

        <FormRadioGroupInput
          color={color}
          displayOtherField={question.displayOther}
          error={isFormValid ? '' : i18n.t('Yup.AnswerRequired')}
          fieldName={`${question.id}`}
          multipleSelection={question.multipleSelection}
          options={question.options}
          onChange={setFieldValue}
        />

        <Footer>
          <MainButton
            color={color}
            disabled={!isDirty || isSendingForm}
            text={
              index >= pagesLength - 1 ? i18n.t('Actions.End') : i18n.t('Next')
            }
            onPress={() => handleChangePage(index + 1, onFormEnd)}
          />
        </Footer>
      </Flex>
    );
  };

  return Page;
};

export default createGenericSurveyPage;
