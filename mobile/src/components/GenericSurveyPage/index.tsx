import FormRadioGroupInput from '../FormRadioGroup';
import MainButton from '../MainButton';
import { SurveyPage } from '../Survey';

import type { SvgProps } from 'react-native-svg';

import {
  Container,
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
) => {
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
      <Container>
        <CurrentPageContainer color={color}>
          <CurrentPageText>
            {index + 1}/{pagesLength}
          </CurrentPageText>
        </CurrentPageContainer>
        {Image && (
          <ImageContainer>
            <FullWidthImage
              source={Image}
              resizeMode="contain"
              width="100%"
              height={180}
            />
          </ImageContainer>
        )}
        <QuestionText>{question.description}</QuestionText>

        <FormRadioGroupInput
          color={color}
          fieldName={`${question.id}`}
          options={question.options}
          multipleSelection={question.multipleSelection}
          displayOtherField={question.displayOther}
          error={isFormValid ? '' : 'Pergunta obrigatória'}
          onChange={setFieldValue}
        />

        <Footer>
          <MainButton
            color={color}
            text={index >= pagesLength - 1 ? 'Finalizar' : 'Próximo'}
            disabled={!isDirty || isSendingForm}
            onPress={() => handleChangePage(index + 1, onFormEnd)}
          />
        </Footer>
      </Container>
    );
  };

  return Page;
};

export default createGenericSurveyPage;
