import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import FormPickerInput from '../../components/FormPickerInput';
import DailyReport from './DailyReport';
import WeeklyReport from './WeeklyReport';

import { ScrollView, Container } from './styles';

enum Reports {
  Daily,
  Weekly,
}

const Report: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(Reports.Daily);

  function handleChangeReport(value: string) {
    if (!value) {
      return;
    }
    if (value === 'Semanal') {
      setSelectedReport(Reports.Weekly);
    } else {
      setSelectedReport(Reports.Daily);
    }
  }

  return (
    <ScrollView>
      <Container>
        <View>
          <FormPickerInput
            fieldName="reportSelected"
            label="Relatório desejado:"
            defaultValue="Diário"
            options={['Diário', 'Semanal']}
            onChange={(_, fieldValue) => handleChangeReport(fieldValue)}
          />
        </View>
        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#7d5cd7"
            animating={isLoading}
          />
        )}
        {selectedReport === Reports.Daily && (
          <DailyReport isLoading={isLoading} setIsLoading={setIsLoading} />
        )}
        {selectedReport === Reports.Weekly && (
          <WeeklyReport isLoading={isLoading} setIsLoading={setIsLoading} />
        )}
      </Container>
    </ScrollView>
  );
};

export default Report;
