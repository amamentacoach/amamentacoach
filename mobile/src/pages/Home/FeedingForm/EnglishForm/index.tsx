import { Formik } from 'formik';
import i18n from 'i18n-js';
import * as Yup from 'yup';

import FormRadioGroupInput from 'components/FormRadioGroup';
import MainButton from 'components/MainButton';
import theme from 'config/theme';

import type { GenericFeedingFormProps } from '..';
import type { FormikHelpers } from 'formik';

interface FormValues {
  howMyBabyIsFeeding: string;
}

const EnglishStatusForm: React.FC<GenericFeedingFormProps> = ({
  handleSubmitAnswers,
}) => {
  const formInitialValues: FormValues = {
    howMyBabyIsFeeding: '',
  };

  const formValidationSchema: Yup.SchemaOf<FormValues> = Yup.object({
    howMyBabyIsFeeding: Yup.string().required(i18n.t('Yup.Required')),
  });

  function handleSubmit(
    values: FormValues,
    helpers: FormikHelpers<FormValues>,
  ): void {
    const answers = Object.values(values);
    handleSubmitAnswers(answers, helpers);
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
