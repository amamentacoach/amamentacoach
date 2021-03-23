import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

import { Formik } from 'formik';
import { useAuth } from '../../contexts/auth';
import { getDailyReport, IDailyReport } from '../../services/report';
import MainButton from '../../components/MainButton';

import {
  Registry,
  RegistryRow,
  RegistryText,
  RegistryTextContainer,
  RegistryContent,
  ListContainer,
  BabyName,
  ScrollView,
  Container,
  Header,
  Breastfeed,
  BreastfeedText,
  BreastfeedContent,
  BreastfeedTextContainer,
  BreastfeedRow,
  QuestionText,
} from './styles';
import FormRadioGroupInput from '../../components/FormRadioGroup';
import { answerQuestion } from '../../services/survey';

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

const Report: React.FC = () => {
  const { motherInfo } = useAuth();
  const [dailyReport, setDailyReport] = useState<IDailyReport>();
  const [formInitialValues, setFormInitialValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  dailyReport?.questions.reduce(
    (object, page) => ({
      ...object,
      [page.id]: [],
    }),
    {},
  );

  useEffect(() => {
    async function fetchRegistries() {
      if (motherInfo.babies) {
        setIsLoading(true);
        const data = await getDailyReport();

        // Exibe apenas perguntas de alvo GERAL ou aquelas que se aplicam ao usuário.
        const filteredQuestions = data.questions.filter(page => {
          if (page.target === 'GERAL') {
            return true;
          }
          if (page.target === 'AC' && motherInfo.babiesBirthLocations.AC) {
            return true;
          }
          if (
            page.target === 'UCI/UTI' &&
            (motherInfo.babiesBirthLocations.UCI ||
              motherInfo.babiesBirthLocations.UTI)
          ) {
            return true;
          }
          return false;
        });

        // Inicia todas as respostas vazias.
        const initialValues = filteredQuestions.reduce(
          (object: any, page: any) => ({
            ...object,
            [page.id]: [],
          }),
          {},
        );
        setFormInitialValues(initialValues);
        setDailyReport(data);
      }
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
                  <>
                    <QuestionText>{description} </QuestionText>
                    <FormRadioGroupInput
                      key={id}
                      fieldName={`${id}`}
                      options={options}
                      multipleSelection={multipleSelection}
                      displayOtherField={displayOther}
                      onChange={setFieldValue}
                    />
                  </>
                ),
              )}
              <MainButton text="Enviar" onPress={handleSubmit} />
            </>
          )}
        </Formik>
      </>
    );
  }

  return (
    <ScrollView>
      <Container>
        <ListContainer>
          {!isLoading ? (
            <>
              <View>
                <Header>Amamentações</Header>
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
              </View>
              <View>
                <Header>Retiradas de leite</Header>
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
              </View>
              <View>
                {dailyReport && dailyReport.questions.length > 0 && (
                  <Questions {...dailyReport} />
                )}
              </View>
            </>
          ) : (
            <ActivityIndicator
              size="large"
              color="#7d5cd7"
              animating={isLoading}
            />
          )}
        </ListContainer>
      </Container>
    </ScrollView>
  );
};

export default Report;
