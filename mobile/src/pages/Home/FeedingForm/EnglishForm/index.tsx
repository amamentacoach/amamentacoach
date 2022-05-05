import { useNavigation } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import i18n from 'i18n-js';
import React from 'react';
import * as Yup from 'yup';

import FormRadioGroupInput from 'components/FormRadioGroup';
import MainButton from 'components/MainButton';
import theme from 'config/theme';
import { answerFeedingForm } from 'services/survey';

import type { GenericFeedingFormProps } from '..';
import type { RootStackProps } from 'routes/app';

interface FormValues {
  howMyBabyIsFeeding: string;
}

// Página do formulário.
const EnglishStatusForm: React.FC<GenericFeedingFormProps> = ({
  situation,
  setIsErrorModalVisible,
}) => {
  const navigation = useNavigation<RootStackProps>();
  const formInitialValues: FormValues = {
    howMyBabyIsFeeding: '',
  };

  const formValidationSchema: Yup.SchemaOf<FormValues> = Yup.object({
    howMyBabyIsFeeding: Yup.string().required(i18n.t('Yup.Required')),
  });

  async function handleSubmit(
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ): Promise<void> {
    setSubmitting(true);
    const answers = Object.values(values);
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
      {({ errors, isSubmitting, setFieldValue, submitForm }) => (
        <>
          <FormRadioGroupInput
            color={theme.babyBlue}
            error={errors.howMyBabyIsFeeding}
            label={i18n.t('FeedingFormPage.Questions.1.Description')}
            options={[
              i18n.t('FeedingFormPage.Questions.1.Options.1'),
              i18n.t('FeedingFormPage.Questions.1.Options.2'),
              i18n.t('FeedingFormPage.Questions.1.Options.3'),
              i18n.t('FeedingFormPage.Questions.1.Options.4'),
              i18n.t('FeedingFormPage.Questions.1.Options.5'),
            ]}
            onChange={selectedValues =>
              setFieldValue('howMyBabyIsFeeding', selectedValues[0])
            }
          />
          <MainButton
            color={theme.babyBlue}
            disabled={isSubmitting}
            text={i18n.t('Actions.End')}
            onPress={submitForm}
          />
        </>
      )}
    </Formik>
  );
};

export default EnglishStatusForm;
