import React, { useState, useEffect } from 'react';

import { getWeeklyReport, IWeeklyReport } from '../../../services/report';

import {
  Header,
  Container,
  Question,
  Answer,
  EntryContainer,
  Line,
  AnswerHeader,
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
        {answers.length === 0 && <AnswerHeader>Não respondida</AnswerHeader>}
        {answers.length === 1 && <AnswerHeader>Sua resposta:</AnswerHeader>}
        {answers.length > 1 && <AnswerHeader>Suas respostas:</AnswerHeader>}
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
      <Header>Perguntas da semana</Header>
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
