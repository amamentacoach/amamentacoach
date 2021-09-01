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

import DiaryRegistryEntry from '../../../components/DiaryRegistryEntry';
import MainButton from '../../../components/MainButton';
import { useIsFirstRun } from '../../../contexts/firstRun';
import { dateFormatVerbose } from '../../../lib/date-fns';
import {
  ExtractionEntry,
  listExtractionsEntries,
} from '../../../services/diaryRegistry';
import { setExtractionPageOpened } from '../../../services/telemetry';

import { Container, DateText, ListContainer } from './styles';

type ScreenParams = {
  DiaryRegistry: {
    date: string;
  };
};

const DiaryRegistry: React.FC = () => {
  const { date } = useRoute<RouteProp<ScreenParams, 'DiaryRegistry'>>().params;
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  const { isFirstRun, setTemporaryNotFirstRun } = useIsFirstRun();
  const isFocused = useIsFocused();
  const [registries, setRegistries] = useState<ExtractionEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRegistries() {
      setIsLoading(true);
      const oldRegistries = await listExtractionsEntries(new Date(date));
      setRegistries(oldRegistries);
      setIsLoading(false);
    }
    if (isFocused) {
      fetchRegistries();
    }

    if (isFirstRun.temporary.extraction) {
      setExtractionPageOpened();
      setTemporaryNotFirstRun('extraction');
    }
  }, [isFocused]);

  return (
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
            <DiaryRegistryEntry key={entry.id} {...entry} />
          ))
        )}
      </ListContainer>
      <MainButton
        text={i18n.t('DiaryRegistryPage.CreateExtractionEntry')}
        onPress={() => navigation.navigate('NewDiaryRegistry')}
      />
    </Container>
  );
};

export default DiaryRegistry;
