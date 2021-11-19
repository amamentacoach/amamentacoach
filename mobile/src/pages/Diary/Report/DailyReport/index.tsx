import i18n from 'i18n-js';
import React, { useEffect, useState } from 'react';

import DiaryBreastfeedEntry from 'components/DiaryBreastfeedEntry';
import DiaryRegistryEntry from 'components/DiaryRegistryEntry';
import { getDailyReport } from 'services/report';

import type { DailyReport as IDailyReport } from 'services/report';

import {
  Center,
  Container,
  EntryContainer,
  Header,
  NoRegistriesMessage,
} from './styles';

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
    async function fetchRegistries(): Promise<void> {
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
      {dailyReport?.registryEntries.length === 0 && (
        <Center>
          <NoRegistriesMessage>
            {i18n.t('DailyReportPage.NoRegistries')}
          </NoRegistriesMessage>
        </Center>
      )}

      {dailyReport?.breastfeedEntries.some(baby => baby.entries.length > 0) && (
        <EntryContainer>
          <Header>{i18n.t('DailyReportPage.Breastfeed')}</Header>
          {dailyReport?.breastfeedEntries.map(entry => (
            <DiaryBreastfeedEntry key={entry.id} {...entry} />
          ))}
        </EntryContainer>
      )}

      {dailyReport?.registryEntries.length > 0 && (
        <EntryContainer>
          <Header>{i18n.t('DailyReportPage.Extraction')}</Header>
          {dailyReport?.registryEntries.map(entry => (
            <DiaryRegistryEntry key={entry.id} {...entry} />
          ))}
        </EntryContainer>
      )}
    </Container>
  );
};

export default DailyReport;
