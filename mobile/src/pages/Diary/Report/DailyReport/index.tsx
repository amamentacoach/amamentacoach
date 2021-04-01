import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

import { Formik } from 'formik';
import { getDailyReport, IDailyReport } from '../../../../services/report';
import MainButton from '../../../../components/MainButton';

import {
  Registry,
  RegistryRow,
  RegistryText,
  RegistryTextContainer,
  RegistryContent,
  BabyName,
  Header,
  Breastfeed,
  BreastfeedText,
  BreastfeedContent,
  BreastfeedTextContainer,
  BreastfeedRow,
  QuestionText,
  Container,
  SubmitButtonContainer,
} from './styles';
import FormRadioGroupInput from '../../../../components/FormRadioGroup';
import { answerQuestion } from '../../../../services/survey';

interface BreastfeedEntryProps {
  date: string;
  breast: 'E' | 'D';
  duration: number;
}

interface RegistryEntryProps {
  date: string;
  breast: 'E' | 'D';
  duration: number;
  quantity: number;
}

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
    Object.keys(answers).forEach(async questionId =>
      answerQuestion(parseInt(questionId, 10), answers[questionId]),
    );
  }

  function BreastfeedEntry({ breast, date, duration }: BreastfeedEntryProps) {
    return (
      <Breastfeed>
        <BreastfeedRow>
          <BreastfeedTextContainer>
            <BreastfeedText>Horário: </BreastfeedText>
            <BreastfeedContent>
              {moment(date).format('kk:mm')}
            </BreastfeedContent>
          </BreastfeedTextContainer>
          <BreastfeedTextContainer>
            <BreastfeedText>Duração: </BreastfeedText>
            <BreastfeedContent>{duration} min</BreastfeedContent>
          </BreastfeedTextContainer>
        </BreastfeedRow>
        <BreastfeedRow>
          <BreastfeedTextContainer>
            <BreastfeedText>Mama: </BreastfeedText>
            <BreastfeedContent>
              {breast === 'E' ? 'Esquerda' : 'Direita'}
            </BreastfeedContent>
          </BreastfeedTextContainer>
        </BreastfeedRow>
      </Breastfeed>
    );
  }

  function RegistryEntry({
    breast,
    date,
    duration,
    quantity,
  }: RegistryEntryProps) {
    return (
      <Registry>
        <RegistryRow>
          <RegistryTextContainer>
            <RegistryText>Horário: </RegistryText>
            <RegistryContent>{moment(date).format('kk:mm')}</RegistryContent>
          </RegistryTextContainer>
          <RegistryTextContainer>
            <RegistryText>Duração: </RegistryText>
            <RegistryContent>{duration} min</RegistryContent>
          </RegistryTextContainer>
        </RegistryRow>
        <RegistryRow>
          <RegistryTextContainer>
            <RegistryText>Mama: </RegistryText>
            <RegistryContent>
              {breast === 'E' ? 'Esquerda' : 'Direita'}
            </RegistryContent>
          </RegistryTextContainer>
          <RegistryTextContainer>
            <RegistryText>Quantidade: </RegistryText>
            <RegistryContent>{quantity} ml</RegistryContent>
          </RegistryTextContainer>
        </RegistryRow>
      </Registry>
    );
  }

  function Questions({ questions }: IDailyReport) {
    return (
      <>
        <Header>Perguntas</Header>
        <Formik
          initialValues={formInitialValues}
          onSubmit={async values => handleFormSubmit(values)}>
          {({ setFieldValue, handleSubmit }) => (
            <>
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
                      onChange={setFieldValue}
                    />
                  </View>
                ),
              )}
              <SubmitButtonContainer>
                <MainButton text="Enviar" onPress={handleSubmit} />
              </SubmitButtonContainer>
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
      {dailyReport?.breastfeedEntries.length > 0 && (
        <Header>Amamentações</Header>
      )}
      {dailyReport?.breastfeedEntries.map(
        ({ id, baby_name, breast, date, duration }) => (
          <View key={id}>
            <BabyName>{baby_name}</BabyName>
            <BreastfeedEntry
              key={id}
              breast={breast}
              date={date}
              duration={duration}
            />
          </View>
        ),
      )}
      {dailyReport?.registryEntries.length > 0 && (
        <Header>Retiradas de leite</Header>
      )}
      {dailyReport?.registryEntries.map(
        ({ id, breast, date, quantity, duration }) => (
          <RegistryEntry
            key={id}
            breast={breast}
            date={date}
            duration={duration}
            quantity={quantity}
          />
        ),
      )}
      {dailyReport && dailyReport.questions.length > 0 && (
        <Questions {...dailyReport} />
      )}
    </Container>
  );
};

export default DailyReport;
