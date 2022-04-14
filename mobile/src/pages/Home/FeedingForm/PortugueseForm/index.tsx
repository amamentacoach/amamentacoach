import { useNavigation } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import i18n from 'i18n-js';
import React from 'react';
import * as Yup from 'yup';

import FormRadioGroupInput from 'components/FormRadioGroup';
import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';
import theme from 'config/theme';
import { Flex, Row, Spacer } from 'lib/sharedStyles';
import { answerFeedingForm } from 'services/survey';

import type { GenericFeedingFormProps } from '../';
import type { RootStackProps } from 'routes/app';

interface FormValues {
  currentMoment: string;
  feedingType: string[];
  feedingMethod: string[];
  milkExtractionPeriod: string;
  extractionTechnique: string;
  largestVolume: string;
  currentFelling: string;
  alreadyBreastfeed: string;
  daysFirstBreastfeed: string;
  weeksFirstBreastfeed: string;
  gestationalAge: string;
  skinToSkinContactPeriod: string;
}

// Página do formulário.
const PortugueseStatusForm: React.FC<GenericFeedingFormProps> = ({
  situation,
  setIsErrorModalVisible,
}) => {
  const navigation = useNavigation<RootStackProps>();
  const formInitialValues: FormValues = {
    currentMoment: '',
    feedingType: [],
    feedingMethod: [],
    milkExtractionPeriod: '',
    extractionTechnique: '',
    largestVolume: '',
    currentFelling: '',
    alreadyBreastfeed: '',
    daysFirstBreastfeed: '',
    weeksFirstBreastfeed: '',
    gestationalAge: '',
    skinToSkinContactPeriod: '',
  };

  const radioGroupSchema = Yup.array()
    .of(Yup.string())
    .min(1, i18n.t('Yup.NoOptionSelectedError'))
    .required(i18n.t('Yup.Required'));
  const milkExtractionPeriodOptionalQuestions = Yup.string().when(
    'milkExtractionPeriod',
    {
      is: i18n.t('FeedingFormPage.Questions.4.Options.4'),
      then: Yup.string().nullable(),
      otherwise: Yup.string().required(i18n.t('Yup.Required')),
    },
  );
  const alreadyBreastfeedOptionalQuestions = Yup.number()
    .typeError(i18n.t('Yup.MustBeANumberError'))
    .when('alreadyBreastfeed', {
      is: i18n.t('FeedingFormPage.Questions.8.Options.1'),
      then: Yup.number().nullable().defined(i18n.t('Yup.Required')),
      otherwise: Yup.number(),
    });

  const formValidationSchema = Yup.object({
    currentMoment: Yup.string().required(i18n.t('Yup.Required')),
    feedingType: radioGroupSchema,
    feedingMethod: radioGroupSchema,
    milkExtractionPeriod: Yup.string().required(i18n.t('Yup.Required')),
    extractionTechnique: milkExtractionPeriodOptionalQuestions,
    largestVolume: milkExtractionPeriodOptionalQuestions,
    currentFelling: Yup.string().required(i18n.t('Yup.Required')),
    alreadyBreastfeed: Yup.string().required(i18n.t('Yup.Required')),
    daysFirstBreastfeed: alreadyBreastfeedOptionalQuestions
      .min(0, i18n.t('Yup.MinEqualError', { num: 0 }))
      .max(6, i18n.t('Yup.MaxEqualError', { num: 6 })),
    weeksFirstBreastfeed: alreadyBreastfeedOptionalQuestions
      .min(30, i18n.t('Yup.MinEqualError', { num: 30 }))
      .max(40, i18n.t('Yup.MaxEqualError', { num: 40 })),
    gestationalAge: alreadyBreastfeedOptionalQuestions
      .min(0, i18n.t('Yup.MinEqualError', { num: 0 }))
      .max(6, i18n.t('Yup.MaxEqualError', { num: 6 })),
    skinToSkinContactPeriod: Yup.string().required(i18n.t('Yup.Required')),
  });

  async function handleSubmit(
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ): Promise<void> {
    setSubmitting(true);
    const answers = [
      values.currentMoment,
      values.feedingType.join('|'),
      values.feedingMethod.join('|'),
      values.milkExtractionPeriod,
      values.extractionTechnique || 'null',
      values.largestVolume || 'null',
      values.currentFelling,
      values.alreadyBreastfeed,
      `${values.weeksFirstBreastfeed || 'null'},${
        values.daysFirstBreastfeed || 'null'
      }`,
      values.skinToSkinContactPeriod,
    ];
    const status = await answerFeedingForm(situation, answers);
    setSubmitting(false);
    if (status) {
      navigation.navigate('Home');
    } else {
      setIsErrorModalVisible(true);
    }
  }

  return (
    <Formik
      initialValues={formInitialValues}
      validateOnChange={false}
      validationSchema={formValidationSchema}
      onSubmit={handleSubmit}>
      {({
        values,
        errors,
        isSubmitting,
        handleChange,
        submitForm,
        setFieldValue,
      }) => (
        <Flex>
          <FormRadioGroupInput
            color={theme.babyBlue}
            error={errors.currentMoment}
            label={i18n.t('FeedingFormPage.Questions.1.Description')}
            options={[
              i18n.t('FeedingFormPage.Questions.1.Options.1'),
              i18n.t('FeedingFormPage.Questions.1.Options.2'),
              i18n.t('FeedingFormPage.Questions.1.Options.3'),
              i18n.t('FeedingFormPage.Questions.1.Options.4'),
            ]}
            onChange={selectedValues =>
              setFieldValue('currentMoment', selectedValues[0])
            }
          />
          <FormRadioGroupInput
            color={theme.babyBlue}
            error={errors.feedingType}
            label={i18n.t('FeedingFormPage.Questions.2.Description')}
            options={[
              i18n.t('FeedingFormPage.Questions.2.Options.1'),
              i18n.t('FeedingFormPage.Questions.2.Options.2'),
              i18n.t('FeedingFormPage.Questions.2.Options.3'),
              i18n.t('FeedingFormPage.Questions.2.Options.4'),
            ]}
            multipleSelection
            onChange={selectedValues =>
              setFieldValue('feedingType', selectedValues)
            }
          />
          <FormRadioGroupInput
            color={theme.babyBlue}
            error={errors.feedingMethod}
            label={i18n.t('FeedingFormPage.Questions.3.Description')}
            options={[
              i18n.t('FeedingFormPage.Questions.3.Options.1'),
              i18n.t('FeedingFormPage.Questions.3.Options.2'),
              i18n.t('FeedingFormPage.Questions.3.Options.3'),
              i18n.t('FeedingFormPage.Questions.3.Options.4'),
              i18n.t('FeedingFormPage.Questions.3.Options.5'),
              i18n.t('FeedingFormPage.Questions.3.Options.6'),
              i18n.t('FeedingFormPage.Questions.3.Options.7'),
            ]}
            multipleSelection
            onChange={selectedValues =>
              setFieldValue('feedingMethod', selectedValues)
            }
          />
          <FormRadioGroupInput
            color={theme.babyBlue}
            error={errors.milkExtractionPeriod}
            label={i18n.t('FeedingFormPage.Questions.4.Description')}
            options={[
              i18n.t('FeedingFormPage.Questions.4.Options.1'),
              i18n.t('FeedingFormPage.Questions.4.Options.2'),
              i18n.t('FeedingFormPage.Questions.4.Options.3'),
              i18n.t('FeedingFormPage.Questions.4.Options.4'),
            ]}
            onChange={selectedValues => {
              const value = selectedValues[0];
              setFieldValue('milkExtractionPeriod', value);
              if (value === i18n.t('FeedingFormPage.Questions.4.Options.4')) {
                setFieldValue('extractionTechnique', null);
                setFieldValue('largestVolume', null);
              } else if (!values.extractionTechnique && !values.largestVolume) {
                setFieldValue('extractionTechnique', '');
                setFieldValue('largestVolume', '');
              }
            }}
          />
          {values.milkExtractionPeriod !==
            i18n.t('FeedingFormPage.Questions.4.Options.4') && (
            <>
              <FormRadioGroupInput
                color={theme.babyBlue}
                error={errors.extractionTechnique}
                label={i18n.t('FeedingFormPage.Questions.5.Description')}
                options={[
                  i18n.t('FeedingFormPage.Questions.5.Options.1'),
                  i18n.t('FeedingFormPage.Questions.5.Options.2'),
                ]}
                multipleSelection
                onChange={selectedValues =>
                  setFieldValue('extractionTechnique', selectedValues[0])
                }
              />
              <FormTextInput
                color={theme.babyBlue}
                error={errors.largestVolume}
                keyboardType="numeric"
                label={i18n.t('FeedingFormPage.Questions.6.Description')}
                placeholder="ml"
                onChangeText={handleChange('largestVolume')}
              />
            </>
          )}
          <FormRadioGroupInput
            color={theme.babyBlue}
            error={errors.currentFelling}
            label={i18n.t('FeedingFormPage.Questions.7.Description')}
            options={[
              i18n.t('FeedingFormPage.Questions.7.Options.1'),
              i18n.t('FeedingFormPage.Questions.7.Options.2'),
              i18n.t('FeedingFormPage.Questions.7.Options.3'),
              i18n.t('FeedingFormPage.Questions.7.Options.4'),
              i18n.t('FeedingFormPage.Questions.7.Options.5'),
            ]}
            onChange={selectedValues =>
              setFieldValue('currentFelling', selectedValues[0])
            }
          />
          <FormRadioGroupInput
            color={theme.babyBlue}
            error={errors.alreadyBreastfeed}
            label={i18n.t('FeedingFormPage.Questions.8.Description')}
            options={[
              i18n.t('FeedingFormPage.Questions.8.Options.1'),
              i18n.t('FeedingFormPage.Questions.8.Options.2'),
            ]}
            onChange={selectedValues =>
              setFieldValue('alreadyBreastfeed', selectedValues[0])
            }
          />
          {values.alreadyBreastfeed ===
            i18n.t('FeedingFormPage.Questions.8.Options.1') && (
            <>
              <FormRadioGroupInput
                color={theme.babyBlue}
                label={i18n.t('FeedingFormPage.Questions.9.Description')}
                options={[i18n.t('FeedingFormPage.Questions.9.Options.1')]}
                onChange={_ => {
                  let value = null;
                  // Alterna a ativação dos campos abaixo (inserção de semanas e dias).
                  if (values.weeksFirstBreastfeed === null) {
                    value = '';
                  }
                  setFieldValue('weeksFirstBreastfeed', value);
                  setFieldValue('daysFirstBreastfeed', value);
                }}
              />
              {values.weeksFirstBreastfeed !== null && (
                <>
                  <Row>
                    <FormTextInput
                      color={theme.babyBlue}
                      error={errors.weeksFirstBreastfeed}
                      keyboardType="numeric"
                      label={i18n.t('Week', { count: 2 })}
                      onChangeText={handleChange('weeksFirstBreastfeed')}
                    />
                    <Spacer width={4} />
                    <FormTextInput
                      color={theme.babyBlue}
                      error={errors.daysFirstBreastfeed}
                      keyboardType="numeric"
                      label={i18n.t('Day', { count: 2 })}
                      onChangeText={handleChange('daysFirstBreastfeed')}
                    />
                  </Row>
                  <FormTextInput
                    color={theme.babyBlue}
                    error={errors.gestationalAge}
                    keyboardType="numeric"
                    label={i18n.t('FeedingFormPage.Questions.10.Description')}
                    onChangeText={handleChange('gestationalAge')}
                  />
                </>
              )}
            </>
          )}
          <FormRadioGroupInput
            color={theme.babyBlue}
            error={errors.skinToSkinContactPeriod}
            label={i18n.t('FeedingFormPage.Questions.11.Description')}
            options={[
              i18n.t('FeedingFormPage.Questions.11.Options.1'),
              i18n.t('FeedingFormPage.Questions.11.Options.2'),
              i18n.t('FeedingFormPage.Questions.11.Options.3'),
              i18n.t('FeedingFormPage.Questions.11.Options.4'),
              i18n.t('FeedingFormPage.Questions.11.Options.5'),
            ]}
            onChange={selectedValues =>
              setFieldValue('skinToSkinContactPeriod', selectedValues[0])
            }
          />
          <MainButton
            color={theme.babyBlue}
            disabled={isSubmitting}
            text={i18n.t('Actions.End')}
            onPress={submitForm}
          />
        </Flex>
      )}
    </Formik>
  );
};

export default PortugueseStatusForm;
