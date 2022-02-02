import { Action, AppScreen } from '@common/telemetria';
import i18n from 'i18n-js';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import FormPickerInput from 'components/FormPickerInput';
import theme from 'config/theme';
import { ScrollView, Center } from 'lib/sharedStyles';
import { createTelemetryAction } from 'utils/telemetryAction';

import DailyReport from './DailyReport';
import { Container } from './styles';
import WeeklyReport from './WeeklyReport';

enum Reports {
  Daily,
  Weekly,
}

const Report: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(Reports.Daily);

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
            label={i18n.t('ReportPage.Placeholder')}
            options={[i18n.t('ReportPage.Daily'), i18n.t('ReportPage.Weekly')]}
            placeholder=""
            value={i18n.t('Diary')}
            onChange={(fieldValue): void => handleChangeReport(fieldValue)}
          />
        </View>
        {isLoading && (
          <Center>
            <ActivityIndicator
              animating={isLoading}
              color={theme.primary}
              size="large"
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
