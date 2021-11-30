import { Action, AppScreen } from '@common/telemetria';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import i18n from 'i18n-js';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemeContext } from 'styled-components';

import DiaryRegistryEntry from 'components/DiaryRegistryEntry';
import MainButton from 'components/MainButton';
import { dateFormatVerbose } from 'lib/date-fns';
import { listExtractionsEntries } from 'services/diaryRegistry';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { RootRouteProp, RootStackProps } from 'routes/app';
import type { ExtractionEntry } from 'services/diaryRegistry';

import { Container, DateText, ListContainer } from './styles';

const DiaryRegistry: React.FC = () => {
  const { params } = useRoute<RootRouteProp<'DiaryRegistry'>>();
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation<RootStackProps>();
  const isFocused = useIsFocused();
  const [registries, setRegistries] = useState<ExtractionEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const selectedDate = params?.date ? new Date(params?.date) : new Date();

  async function handleNewRegistryEntry(target: string): Promise<void> {
    await createTelemetryAction({
      action: Action.Pressed,
      context: { screen: AppScreen.DiaryRegistry, target },
    });
    navigation.navigate('NewDiaryRegistry');
  }

  useEffect(() => {
    async function fetchRegistries(): Promise<void> {
      setIsLoading(true);
      const oldRegistries = await listExtractionsEntries(selectedDate);
      setRegistries(oldRegistries);
      setIsLoading(false);
    }
    if (isFocused) {
      fetchRegistries();
    }

    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.DiaryRegistry },
    });
  }, [isFocused]);

  return (
    <Container>
      <DateText>{dateFormatVerbose(selectedDate)}</DateText>
      <ListContainer>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={themeContext.primary}
            animating={isLoading}
          />
        ) : (
          registries.map(entry => (
            <DiaryRegistryEntry key={entry.id} {...entry} />
          ))
        )}
      </ListContainer>
      <MainButton
        text={i18n.t('DiaryRegistryPage.CreateExtractionEntry')}
        onPress={() =>
          handleNewRegistryEntry('DiaryRegistryPage.CreateExtractionEntry')
        }
      />
    </Container>
  );
};

export default DiaryRegistry;
