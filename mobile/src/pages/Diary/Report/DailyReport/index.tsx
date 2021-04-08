import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';

import { getDailyReport, IDailyReport } from '../../../../services/report';
import MainButton from '../../../../components/MainButton';
import FormRadioGroupInput from '../../../../components/FormRadioGroup';
import { answerQuestion } from '../../../../services/survey';
import DiaryBreastfeedEntry from '../../../../components/DiaryBreastfeedEntry';
import DiaryRegistryEntry from '../../../../components/DiaryRegistryEntry';

import { Header, QuestionText, Container, EntryContainer } from './styles';

interface DailyReportProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const DailyReport: React.FC<DailyReportProps> = ({
  isLoading,
  setIsLoading,
}) => {
  const [dailyReport, setDailyReport] = useState<IDailyReport>({
    breastfeedEntries: [],
    registryEntries: [],
    questions: [],
  });
  const [formInitialValues, setFormInitialValues] = useState({});
  const [isFormValid, setIsFormValid] = useState(true);
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    async function fetchRegistries() {
      const data = await getDailyReport();

      // Inicia todas as respostas vazias.
      const initialValues = data.questions.reduce(
        (object: any, page: any) => ({
          ...object,
          [page.id]: [],
        }),
        {},
      );
      setFormInitialValues(initialValues);
      setDailyReport(data);
      setIsLoading(false);
    }
    fetchRegistries();
  }, []);

  // Envia as respostas do usuário.
  async function handleFormSubmit(answers: { [key: string]: string[] }) {
    if (Object.keys(answers).some(key => answers[key].length <= 0)) {
      setIsFormValid(false);
      return;
    }

    Object.keys(answers).forEach(async questionId =>
      answerQuestion(parseInt(questionId, 10), answers[questionId]),
    );
    setFormSent(true);
  }

  function Questions({ questions }: IDailyReport) {
    return (
      <>
        <Header>Perguntas</Header>
        <Formik
          initialValues={formInitialValues}
          onSubmit={async values => handleFormSubmit(values)}>
          {({ values, setFieldValue, handleSubmit }) => (
            <>
              <Container>
                {questions.map(
                  ({
                    id,
                    description,
                    options,
                    displayOther,
                    multipleSelection,
                  }) => (
                    <View key={id}>
                      <QuestionText>{description}</QuestionText>
                      <FormRadioGroupInput
                        fieldName={`${id}`}
                        options={options}
                        multipleSelection={multipleSelection}
                        displayOtherField={displayOther}
                        initialValues={
                          (values as { [key: string]: string[] })[id]
                        }
                        error={isFormValid ? '' : 'Pergunta obrigatória'}
                        onChange={setFieldValue}
                      />
                    </View>
                  ),
                )}
              </Container>
              <MainButton
                disabled={formSent}
                text="Enviar"
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </>
    );
  }

  if (isLoading) {
    return <></>;
  }

  return (
    <Container>
      {dailyReport?.breastfeedEntries.some(baby => baby.entries.length > 0) && (
        <EntryContainer>
          <Header>Amamentações</Header>
          {dailyReport?.breastfeedEntries.map(entry => (
            <DiaryBreastfeedEntry key={entry.id} {...entry} />
          ))}
        </EntryContainer>
      )}

      {dailyReport?.registryEntries.length > 0 && (
        <EntryContainer>
          <Header>Retiradas de leite</Header>
          {dailyReport?.registryEntries.map(entry => (
            <DiaryRegistryEntry key={entry.id} {...entry} />
          ))}
        </EntryContainer>
      )}

      {dailyReport && dailyReport.questions.length > 0 && (
        <Questions {...dailyReport} />
      )}
    </Container>
  );
};

export default DailyReport;
