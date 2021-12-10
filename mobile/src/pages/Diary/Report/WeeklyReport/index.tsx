import i18n from 'i18n-js';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Line, Flex } from 'lib/sharedStyles';
import { getWeeklyReport } from 'services/report';

import type { WeeklyReportQuestion as WeeklyReportQuestion } from 'services/report';

import { Answer, AnswerHeader, Header, Question } from './styles';

interface WeeklyReportProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const WeeklyReport: React.FC<WeeklyReportProps> = ({
  isLoading,
  setIsLoading,
}) => {
  const [weeklyReport, setWeeklyReport] = useState<WeeklyReportQuestion[]>([]);

  useEffect(() => {
    async function fetchRegistries(): Promise<void> {
      const data = await getWeeklyReport();
      setWeeklyReport(data);
      setIsLoading(false);
    }
    fetchRegistries();
  }, []);

  function ReportEntry({
    description,
    answers,
  }: WeeklyReportQuestion): JSX.Element {
    return (
      <>
        <Question>{description}</Question>
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
    <Flex>
      <Header>{i18n.t('WeeklyReportPage.Header')}</Header>
      {weeklyReport.map((entry, index) => {
        return (
          <View key={entry.id}>
            <ReportEntry {...entry} />
            {index < weeklyReport.length - 1 && <Line />}
          </View>
        );
      })}
    </Flex>
  );
};

export default WeeklyReport;
