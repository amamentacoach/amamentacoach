import React, { useState, useEffect } from 'react';

import {
  getDailyReport,
  DailyReport as IDailyReport,
} from '../../../../services/report';
import DiaryBreastfeedEntry from '../../../../components/DiaryBreastfeedEntry';
import DiaryRegistryEntry from '../../../../components/DiaryRegistryEntry';

import { Header, Container, EntryContainer } from './styles';

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
  });

  useEffect(() => {
    async function fetchRegistries() {
      const data = await getDailyReport();
      setDailyReport(data);
      setIsLoading(false);
    }
    fetchRegistries();
  }, []);

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
    </Container>
  );
};

export default DailyReport;
