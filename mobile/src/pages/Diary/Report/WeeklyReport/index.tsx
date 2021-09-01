import React, { useEffect, useState } from 'react';

import i18n from 'i18n-js';

import {
  getWeeklyReport,
  WeeklyReport as IWeeklyReport,
} from '../../../../services/report';

import {
  Answer,
  AnswerHeader,
  Container,
  EntryContainer,
  Header,
  Line,
  Question,
} from './styles';

interface WeeklyReportProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const WeeklyReport: React.FC<WeeklyReportProps> = ({
  isLoading,
  setIsLoading,
}) => {
  const [weeklyReport, setWeeklyReport] = useState<IWeeklyReport[]>([]);

  useEffect(() => {
    async function fetchRegistries() {
      const data = await getWeeklyReport();
      setWeeklyReport(data);
      setIsLoading(false);
    }
    fetchRegistries();
  }, []);

  function ReportEntry({ question, answers }: IWeeklyReport) {
    return (
      <>
        <Question>{question}</Question>
        {answers.length === 0 && (
          <AnswerHeader>{i18n.t('WeeklyReportPage.NotAnswered')}</AnswerHeader>
        )}
        {answers.length === 1 && (
          <AnswerHeader>{i18n.t('WeeklyReportPage.YourAnswer')}:</AnswerHeader>
        )}
        {answers.length > 1 && (
          <AnswerHeader>{i18n.t('WeeklyReportPage.YourAnswers')}:</AnswerHeader>
        )}
        {answers.map(answer => (
          <Answer key={answer}>{answer}</Answer>
        ))}
      </>
    );
  }

  if (isLoading) {
    return <></>;
  }

  return (
    <Container>
      <Header>{i18n.t('WeeklyReportPage.Header')}</Header>
      {weeklyReport.map((entry, index) => {
        return (
          <EntryContainer key={entry.question}>
            <ReportEntry question={entry.question} answers={entry.answers} />
            {index < weeklyReport.length - 1 && <Line />}
          </EntryContainer>
        );
      })}
    </Container>
  );
};

export default WeeklyReport;
