import React, { useState, useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

import dateFormatVerbose from '../../../utils/date';
import { useAuth } from '../../../contexts/auth';
import {
  IBreastfeedEntry,
  listBreastfeedEntries,
} from '../../../services/diaryRegistry';
import DiaryBreastfeedEntry from '../../../components/DiaryBreastfeedEntry';
import MainButton from '../../../components/MainButton';

import { DateText, ListContainer, ScrollView, Container } from './styles';

const DiaryBreastfeed: React.FC = () => {
  const navigation = useNavigation();
  const { motherInfo } = useAuth();
  const currentDate = moment();
  const isFocused = useIsFocused();
  const [registries, setRegistries] = useState<IBreastfeedEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRegistries() {
      if (motherInfo.babies) {
        setIsLoading(true);
        // Recebe os registros de todos os bebês da mãe.
        const oldRegistries = await Promise.all(
          motherInfo.babies.map(async ({ id }) => listBreastfeedEntries(id)),
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
              <DiaryBreastfeedEntry key={entry.id} {...entry} />
            ))
          )}
        </ListContainer>
        <MainButton
          text="Registrar amamentação"
          onPress={() => navigation.navigate('NewBreastfeedEntry')}
        />
      </Container>
    </ScrollView>
  );
};

export default DiaryBreastfeed;
