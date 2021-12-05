import { Action, AppScreen } from '@common/telemetria';
import i18n from 'i18n-js';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ThemeContext } from 'styled-components';

import FormPickerInput from 'components/FormPickerInput';
import { ScrollView } from 'lib/SharedStyles';
import { createTelemetryAction } from 'utils/telemetryAction';

import DailyReport from './DailyReport';
import { Center, Container } from './styles';
import WeeklyReport from './WeeklyReport';

enum Reports {
  Daily,
  Weekly,
}

const Report: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(Reports.Daily);
  const themeContext = useContext(ThemeContext);

  function handleChangeReport(value: string): void {
    if (!value) {
      return;
    }
    if (value === i18n.t('ReportPage.Weekly')) {
      setSelectedReport(Reports.Weekly);
    } else {
      setSelectedReport(Reports.Daily);
    }
  }

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.Report },
    });
  }, []);

  return (
    <ScrollView>
      <Container>
        <View>
          <FormPickerInput
            fieldName="reportSelected"
            label={i18n.t('ReportPage.Placeholder')}
            defaultValue={i18n.t('Diary')}
            placeholder={''}
            options={[i18n.t('ReportPage.Daily'), i18n.t('ReportPage.Weekly')]}
            onChange={(_, fieldValue): void => handleChangeReport(fieldValue)}
          />
        </View>
        {isLoading && (
          <Center>
            <ActivityIndicator
              size="large"
              color={themeContext.primary}
              animating={isLoading}
            />
          </Center>
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
