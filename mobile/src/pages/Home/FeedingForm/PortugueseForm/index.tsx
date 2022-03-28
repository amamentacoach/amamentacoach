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
    skinToSkinContactPeriod: '',
  };

  const formValidationSchema = Yup.object({
    currentMoment: Yup.string().required(i18n.t('Yup.Required')),
    feedingType: Yup.array()
      .of(Yup.string())
      .min(1, i18n.t('Yup.NoOptionSelectedError'))
      .required(i18n.t('Yup.Required')),
    feedingMethod: Yup.array()
      .of(Yup.string())
      .min(1, i18n.t('Yup.NoOptionSelectedError'))
      .required(i18n.t('Yup.Required')),
    milkExtractionPeriod: Yup.string().required(i18n.t('Yup.Required')),
    extractionTechnique: Yup.string().when('milkExtractionPeriod', {
      is: i18n.t('StatusFormPage.Questions.4.Options.4'),
      then: Yup.string().nullable(),
      otherwise: Yup.string().required(i18n.t('Yup.Required')),
    }),
    largestVolume: Yup.string().when('milkExtractionPeriod', {
      is: i18n.t('StatusFormPage.Questions.4.Options.4'),
      then: Yup.string().nullable(),
      otherwise: Yup.string().required(i18n.t('Yup.Required')),
    }),
    currentFelling: Yup.string().required(i18n.t('Yup.Required')),
    alreadyBreastfeed: Yup.string().required(i18n.t('Yup.Required')),
    daysFirstBreastfeed: Yup.string().when('alreadyBreastfeed', {
      is: i18n.t('StatusFormPage.Questions.8.Options.1'),
      then: Yup.string().nullable().defined(i18n.t('Yup.Required')),
      otherwise: Yup.string(),
    }),
    weeksFirstBreastfeed: Yup.string().when('alreadyBreastfeed', {
      is: i18n.t('StatusFormPage.Questions.8.Options.1'),
      then: Yup.string().nullable().defined(i18n.t('Yup.Required')),
      otherwise: Yup.string(),
    }),
    skinToSkinContactPeriod: Yup.string().required(i18n.t('Yup.Required')),
  });

  async function handleSubmit(
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ): Promise<void> {
    setSubmitting(true);
    const answers = Object.values(values).map(value =>
      Array.isArray(value) ? value.join('|') : value,
    );
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
            label={i18n.t('StatusFormPage.Questions.1.Description')}
            options={[
              i18n.t('StatusFormPage.Questions.1.Options.1'),
              i18n.t('StatusFormPage.Questions.1.Options.2'),
              i18n.t('StatusFormPage.Questions.1.Options.3'),
              i18n.t('StatusFormPage.Questions.1.Options.4'),
            ]}
            onChange={selectedValues =>
              setFieldValue('currentMoment', selectedValues[0])
            }
          />
          <FormRadioGroupInput
            color={theme.babyBlue}
            error={errors.feedingType}
            label={i18n.t('StatusFormPage.Questions.2.Description')}
            options={[
              i18n.t('StatusFormPage.Questions.2.Options.1'),
              i18n.t('StatusFormPage.Questions.2.Options.2'),
              i18n.t('StatusFormPage.Questions.2.Options.3'),
              i18n.t('StatusFormPage.Questions.2.Options.4'),
            ]}
            multipleSelection
            onChange={selectedValues =>
              setFieldValue('feedingType', selectedValues)
            }
          />
          <FormRadioGroupInput
            color={theme.babyBlue}
            error={errors.feedingMethod}
            label={i18n.t('StatusFormPage.Questions.3.Description')}
            options={[
              i18n.t('StatusFormPage.Questions.3.Options.1'),
              i18n.t('StatusFormPage.Questions.3.Options.2'),
              i18n.t('StatusFormPage.Questions.3.Options.3'),
              i18n.t('StatusFormPage.Questions.3.Options.4'),
              i18n.t('StatusFormPage.Questions.3.Options.5'),
              i18n.t('StatusFormPage.Questions.3.Options.6'),
              i18n.t('StatusFormPage.Questions.3.Options.7'),
            ]}
            multipleSelection
            onChange={selectedValues =>
              setFieldValue('feedingMethod', selectedValues)
            }
          />
          <FormRadioGroupInput
            color={theme.babyBlue}
            error={errors.milkExtractionPeriod}
            label={i18n.t('StatusFormPage.Questions.4.Description')}
            options={[
              i18n.t('StatusFormPage.Questions.4.Options.1'),
              i18n.t('StatusFormPage.Questions.4.Options.2'),
              i18n.t('StatusFormPage.Questions.4.Options.3'),
              i18n.t('StatusFormPage.Questions.4.Options.4'),
            ]}
            onChange={selectedValues => {
              const value = selectedValues[0];
              setFieldValue('milkExtractionPeriod', value);
              let extractionTechnique = null;
              let largestVolume = null;
              if (value !== i18n.t('StatusFormPage.Questions.4.Options.4')) {
                extractionTechnique = '';
                largestVolume = '';
              }
              setFieldValue('extractionTechnique', extractionTechnique);
              setFieldValue('largestVolume', largestVolume);
            }}
          />
          {values.milkExtractionPeriod !==
            i18n.t('StatusFormPage.Questions.4.Options.4') && (
            <>
              <FormRadioGroupInput
                color={theme.babyBlue}
                error={errors.extractionTechnique}
                label={i18n.t('StatusFormPage.Questions.5.Description')}
                options={[
                  i18n.t('StatusFormPage.Questions.5.Options.1'),
                  i18n.t('StatusFormPage.Questions.5.Options.2'),
                ]}
                onChange={selectedValues =>
                  setFieldValue('extractionTechnique', selectedValues[0])
                }
              />
              <FormTextInput
                color={theme.babyBlue}
                error={errors.largestVolume}
                keyboardType="numeric"
                label={i18n.t('StatusFormPage.Questions.6.Description')}
                placeholder="ml"
                onChangeText={handleChange('largestVolume')}
              />
            </>
          )}
          <FormRadioGroupInput
            color={theme.babyBlue}
            error={errors.currentFelling}
            label={i18n.t('StatusFormPage.Questions.7.Description')}
            options={[
              i18n.t('StatusFormPage.Questions.7.Options.1'),
              i18n.t('StatusFormPage.Questions.7.Options.2'),
              i18n.t('StatusFormPage.Questions.7.Options.3'),
              i18n.t('StatusFormPage.Questions.7.Options.4'),
              i18n.t('StatusFormPage.Questions.7.Options.5'),
            ]}
            onChange={selectedValues =>
              setFieldValue('currentFelling', selectedValues[0])
            }
          />
          <FormRadioGroupInput
            color={theme.babyBlue}
            error={errors.alreadyBreastfeed}
            label={i18n.t('StatusFormPage.Questions.8.Description')}
            options={[
              i18n.t('StatusFormPage.Questions.8.Options.1'),
              i18n.t('StatusFormPage.Questions.8.Options.2'),
            ]}
            onChange={selectedValues =>
              setFieldValue('alreadyBreastfeed', selectedValues[0])
            }
          />
          {values.alreadyBreastfeed ===
            i18n.t('StatusFormPage.Questions.8.Options.1') && (
            <>
              <FormRadioGroupInput
                color={theme.babyBlue}
                label={i18n.t('StatusFormPage.Questions.9.Description')}
                options={[i18n.t('StatusFormPage.Questions.9.Options.1')]}
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
                <Row>
                  <FormTextInput
                    color={theme.babyBlue}
                    error={errors.weeksFirstBreastfeed}
                    keyboardType="numeric"
                    label="Semanas"
                    onChangeText={handleChange('weeksFirstBreastfeed')}
                  />
                  <Spacer width={4} />
                  <FormTextInput
                    color={theme.babyBlue}
                    error={errors.daysFirstBreastfeed}
                    keyboardType="numeric"
                    label="Dias"
                    onChangeText={handleChange('daysFirstBreastfeed')}
                  />
                </Row>
              )}
            </>
          )}
          <FormRadioGroupInput
            color={theme.babyBlue}
            error={errors.skinToSkinContactPeriod}
            label={i18n.t('StatusFormPage.Questions.10.Description')}
            options={[
              i18n.t('StatusFormPage.Questions.10.Options.1'),
              i18n.t('StatusFormPage.Questions.10.Options.2'),
              i18n.t('StatusFormPage.Questions.10.Options.3'),
              i18n.t('StatusFormPage.Questions.10.Options.4'),
              i18n.t('StatusFormPage.Questions.10.Options.5'),
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
