import React, { useContext, useEffect, useState } from 'react';

import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import i18n from 'i18n-js';
import { ActivityIndicator } from 'react-native';
import { ThemeContext } from 'styled-components';

import DiaryBreastfeedEntry from '../../../components/DiaryBreastfeedEntry';
import MainButton from '../../../components/MainButton';
import { useAuth } from '../../../contexts/auth';
import { dateFormatVerbose } from '../../../lib/date-fns';
import {
  BreastfeedEntry,
  listBreastfeedEntries,
} from '../../../services/diaryRegistry';

import { Container, DateText, ListContainer, ScrollView } from './styles';

type ScreenParams = {
  DiaryBreastfeed: {
    date: string;
  };
};

const DiaryBreastfeed: React.FC = () => {
  const { date } = useRoute<
    RouteProp<ScreenParams, 'DiaryBreastfeed'>
  >().params;
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  const { motherInfo } = useAuth();
  const isFocused = useIsFocused();
  const [registries, setRegistries] = useState<BreastfeedEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRegistries() {
      if (motherInfo.babies) {
        setIsLoading(true);
        // Recebe os registros de todos os bebês da mãe.
        const oldRegistries = await Promise.all(
          motherInfo.babies.map(async ({ id }) =>
            listBreastfeedEntries(id, new Date(date)),
          ),
        );
        setRegistries(oldRegistries);
      }
      setIsLoading(false);
    }
    if (isFocused) {
      fetchRegistries();
    }
  }, [isFocused]);

  return (
    <ScrollView>
      <Container>
        <DateText>{dateFormatVerbose(new Date(date))}</DateText>
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
          onPress={() => navigation.navigate('NewBreastfeedEntry')}
        />
      </Container>
    </ScrollView>
  );
};

export default DiaryBreastfeed;
