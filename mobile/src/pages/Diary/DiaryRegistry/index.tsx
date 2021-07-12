import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/pt-br';

import { useIsFirstRun } from '../../../contexts/firstRun';
import { setExtractionPageOpened } from '../../../services/telemetry';
import {
  ExtractionEntry,
  listExtractionsEntries,
} from '../../../services/diaryRegistry';
import { dateFormatVerbose } from '../../../utils/date';
import MainButton from '../../../components/MainButton';
import DiaryRegistryEntry from '../../../components/DiaryRegistryEntry';

import { DateText, Container, ListContainer } from './styles';

type ScreenParams = {
  DiaryRegistry: {
    date: string;
  };
};

const DiaryRegistry: React.FC = () => {
  const { date } = useRoute<RouteProp<ScreenParams, 'DiaryRegistry'>>().params;

  const navigation = useNavigation();
  const { isFirstRun, setTemporaryNotFirstRun } = useIsFirstRun();
  const isFocused = useIsFocused();
  const [registries, setRegistries] = useState<ExtractionEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRegistries() {
      setIsLoading(true);
      const oldRegistries = await listExtractionsEntries(moment(date));
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
      <DateText>{dateFormatVerbose(moment(date))}</DateText>
      <ListContainer>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#7d5cd7"
            animating={isLoading}
          />
        ) : (
          registries.map(entry => (
            <DiaryRegistryEntry key={entry.id} {...entry} />
          ))
        )}
      </ListContainer>
      <MainButton
        text="Registrar retirada"
        onPress={() => navigation.navigate('NewDiaryRegistry')}
      />
    </Container>
  );
};

export default DiaryRegistry;
