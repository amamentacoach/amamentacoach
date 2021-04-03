import React, { useState, useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/pt-br';

import { ActivityIndicator } from 'react-native';
import {
  IExtractionEntry,
  listExtractionsEntries,
} from '../../../services/diaryRegistry';
import dateFormatVerbose from '../../../utils/date';
import MainButton from '../../../components/MainButton';
import DiaryRegistryEntry from '../../../components/DiaryRegistryEntry';

import { DateText, Container, ListContainer } from './styles';

const DiaryRegistry: React.FC = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const currentDate = moment();
  const [registries, setRegistries] = useState<IExtractionEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRegistries() {
      setIsLoading(true);
      const oldRegistries = await listExtractionsEntries();
      setRegistries(oldRegistries);
      setIsLoading(false);
    }
    if (isFocused) {
      fetchRegistries();
    }
  }, [isFocused]);

  return (
    <Container>
      <DateText>{dateFormatVerbose(currentDate)}</DateText>
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
