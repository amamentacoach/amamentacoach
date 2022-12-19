import { Action, AppScreen } from '@common/telemetria';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { useEffect } from 'react';
import * as Yup from 'yup';

import FormRadioGroup from 'components/FormRadioGroup';
import MainButton from 'components/MainButton';
import theme from 'config/theme';
import { Flex, ScrollView } from 'lib/sharedStyles';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { RootRouteProp, RootStackProps } from 'routes/app';

import {
  CenterAlignedText,
  ContentContainer,
  Footer,
  HeaderBackground,
  HeaderText,
  HighlightedText,
  TextContainer,
  ValuesInfoText,
} from './styles';

type FormValues = {
  [key: string]: string;
};

type FormValuesKey = keyof FormValues;

const StatusForm: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const { situation } = useRoute<RootRouteProp<'StatusForm'>>().params;

  // Perguntas da escala possuem id entre 17-34 (veja perguntas.ts).
  const questionsIds = Array.from(new Array(18), (_, i) => i + 17);
  // Inicia todas as respostas vazias.
  const initialValues: FormValues = questionsIds.reduce(
    (previous, current) => ({
      ...previous,
      [current]: '',
    }),
    {},
  );
  // Todas as perguntas da escala são obrigatórias.
  const validationSchema = Yup.object().shape(
    questionsIds.reduce(
      (previous, current) => ({
        ...previous,
        [current]: Yup.string().required(i18n.t('Yup.Required')),
      }),
      {},
    ),
  );

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.StatusForm },
    });
  }, []);

  // Navega para a página do formulário de alimentação..
  function handleFormSubmit(values: FormValues): void {
    createTelemetryAction({
      action: Action.Pressed,
      context: {
        screen: AppScreen.StatusForm,
        target: 'Actions.End',
      },
    });

    const statusFormAnswers = Object.keys(values).map(id => ({
      id: Number(id),
      content: values[id as unknown as FormValuesKey],
    }));
    navigation.navigate('FeedingForm', {
      situation,
      statusFormAnswers,
    });
  }

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}>
      {({ errors, submitForm, setFieldValue }) => (
        <ScrollView>
          <HeaderBackground />
          <HeaderText>{i18n.t('StatusFormPage.Header')}</HeaderText>
          <ContentContainer>
            <ValuesInfoText>{i18n.t('StatusFormPage.Intro')}</ValuesInfoText>
            <ValuesInfoText>
              <HighlightedText>1</HighlightedText> ={' '}
              {i18n.t('StatusFormPage.InfoValue1')}
            </ValuesInfoText>
            <ValuesInfoText>
              <HighlightedText>2</HighlightedText> ={' '}
              {i18n.t('StatusFormPage.InfoValue2')}
            </ValuesInfoText>
            <ValuesInfoText>
              <HighlightedText>3</HighlightedText> ={' '}
              {i18n.t('StatusFormPage.InfoValue3')}
            </ValuesInfoText>
            <ValuesInfoText>
              <HighlightedText>4</HighlightedText> ={' '}
              {i18n.t('StatusFormPage.InfoValue4')}
            </ValuesInfoText>
            <ValuesInfoText>
              <HighlightedText>5</HighlightedText> ={' '}
              {i18n.t('StatusFormPage.InfoValue5')}
            </ValuesInfoText>

            <Flex>
              {Object.keys(initialValues)
                .slice(0, 7)
                .map((questionId, index) => (
                  <FormRadioGroup
                    color={theme.babyBlue}
                    direction="row"
                    displayOtherField={false}
                    error={errors[questionId as unknown as FormValuesKey]}
                    key={questionId}
                    label={`${index + 1} - ${i18n.t(
                      `StatusFormPage.Questions.${index + 1}.Description`,
                    )}`}
                    options={['1', '2', '3', '4', '5']}
                    onChange={fieldValues =>
                      setFieldValue(questionId, fieldValues[0])
                    }
                  />
                ))}

              <TextContainer>
                <CenterAlignedText>
                  {i18n.t('StatusFormPage.WhenMyBaby')}
                </CenterAlignedText>
              </TextContainer>

              {Object.keys(initialValues)
                .slice(7, 18)
                .map((questionId, index) => (
                  <FormRadioGroup
                    color={theme.babyBlue}
                    direction="row"
                    displayOtherField={false}
                    error={errors[questionId as unknown as FormValuesKey]}
                    key={questionId}
                    label={`${index + 8} - ${i18n.t(
                      `StatusFormPage.Questions.${index + 8}.Description`,
                    )}`}
                    options={['1', '2', '3', '4', '5']}
                    onChange={fieldValues =>
                      setFieldValue(questionId, fieldValues[0])
                    }
                  />
                ))}
            </Flex>

            <Footer>
              <MainButton
                color={theme.babyBlue}
                text={i18n.t('Next')}
                onPress={submitForm}
              />
            </Footer>
          </ContentContainer>
        </ScrollView>
      )}
    </Formik>
  );
};

export default StatusForm;
