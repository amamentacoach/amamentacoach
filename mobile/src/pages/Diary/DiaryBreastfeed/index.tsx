import { Action, AppScreen } from '@common/Telemetria';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import i18n from 'i18n-js';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemeContext } from 'styled-components';

import DiaryBreastfeedEntry from 'components/DiaryBreastfeedEntry';
import MainButton from 'components/MainButton';
import { useAuth } from 'contexts/auth';
import { dateFormatVerbose } from 'lib/date-fns';
import { listBreastfeedEntries } from 'services/diaryRegistry';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { RootRouteProp, RootStackProps } from 'routes/app';
import type { BreastfeedEntry } from 'services/diaryRegistry';

import { Container, DateText, ListContainer, ScrollView } from './styles';

const DiaryBreastfeed: React.FC = () => {
  const { params } = useRoute<RootRouteProp<'DiaryBreastfeed'>>();
  const navigation = useNavigation<RootStackProps>();
  const themeContext = useContext(ThemeContext);
  const { motherInfo } = useAuth();
  const isFocused = useIsFocused();
  const [registries, setRegistries] = useState<BreastfeedEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const selectedDate = params?.date ? new Date(params?.date) : new Date();

  async function handleNewBreastfeedEntry(target: string) {
    await createTelemetryAction({
      action: Action.Pressed,
      context: { screen: AppScreen.DiaryBreastfeed, target },
    });
    navigation.navigate('NewBreastfeedEntry');
  }

  useEffect(() => {
    async function fetchRegistries() {
      if (motherInfo.babies) {
        setIsLoading(true);
        // Recebe os registros de todos os bebês da mãe.
        const oldRegistries = await Promise.all(
          motherInfo.babies.map(async ({ id }) =>
            listBreastfeedEntries(id, selectedDate),
          ),
        );
        setRegistries(oldRegistries);
      }
      setIsLoading(false);
    }
    if (isFocused) {
      fetchRegistries();
      createTelemetryAction({
        action: Action.Opened,
        context: { screen: AppScreen.DiaryBreastfeed },
      });
    }
  }, [isFocused]);

  return (
    <ScrollView>
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
