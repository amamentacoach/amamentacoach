import { Action, AppScreen } from '@common/telemetria';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import DiaryBreastfeedEntry from 'components/DiaryBreastfeedEntry';
import MainButton from 'components/MainButton';
import theme from 'config/theme';
import { useAuth } from 'contexts/auth';
import { dateFormatVerbose } from 'lib/date-fns';
import { ScrollView } from 'lib/sharedStyles';
import { listBreastfeedEntries } from 'services/diaryRegistry';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { RootRouteProp, RootStackProps } from 'routes/app';
import type { BreastfeedEntry } from 'services/diaryRegistry';

import { Container, DateText, ListContainer } from './styles';

const DiaryBreastfeed: React.FC = () => {
  const { params } = useRoute<RootRouteProp<'DiaryBreastfeed'>>();
  const navigation = useNavigation<RootStackProps>();
  const { motherInfo } = useAuth();
  const isFocused = useIsFocused();
  const [registries, setRegistries] = useState<BreastfeedEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(
    params?.date ? new Date(params.date) : new Date(),
  );

  async function handleNewBreastfeedEntry(target: string): Promise<void> {
    await createTelemetryAction({
      action: Action.Pressed,
      context: { screen: AppScreen.DiaryBreastfeed, target },
    });
    navigation.navigate('NewBreastfeedEntry');
  }

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.DiaryBreastfeed },
    });
  }, []);

  useEffect(() => {
    async function fetchRegistries(): Promise<void> {
      const selectedDate = params?.date ? new Date(params.date) : new Date();
      setIsLoading(true);
      // Recebe os registros de todos os bebês da mãe.
      const oldRegistries = await Promise.all(
        motherInfo.babies.map(async ({ id }) =>
          listBreastfeedEntries(id, selectedDate),
        ),
      );
      setRegistries(oldRegistries);
      setDate(selectedDate);
      setIsLoading(false);
    }
    if (isFocused) {
      fetchRegistries();
    }
  }, [isFocused]);

  return (
    <ScrollView>
      <Container>
        <DateText>{dateFormatVerbose(date)}</DateText>
        <ListContainer>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={theme.primary}
              animating={isLoading}
            />
          ) : (
            registries.map(entry => (
              <DiaryBreastfeedEntry key={entry.id} {...entry} />
            ))
          )}
        </ListContainer>
        <MainButton
          text={i18n.t('DiaryBreastfeedPage.CreateBreastfeedingEntry')}
          onPress={() =>
            handleNewBreastfeedEntry(
              'DiaryBreastfeedPage.CreateBreastfeedingEntry',
            )
          }
        />
      </Container>
    </ScrollView>
  );
};

export default DiaryBreastfeed;
