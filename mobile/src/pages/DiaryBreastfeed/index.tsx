import React, { useState, useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

import dateFormatVerbose from '../../utils/date';
import { useAuth } from '../../contexts/auth';
import {
  IBreastfeedEntry,
  listBreastfeedEntries,
} from '../../services/diaryRegistry';
import MainButton from '../../components/MainButton';

import {
  DateText,
  Registry,
  RegistryRow,
  RegistryText,
  RegistryTextContainer,
  RegistryContent,
  ListContainer,
  BabyName,
  ScrollView,
  Container,
} from './styles';

interface RegistryEntryProps {
  date: string;
  breast: 'E' | 'D';
  duration: number;
}

const DiaryRegistry: React.FC = () => {
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

  function RegistryEntry({ breast, date, duration }: RegistryEntryProps) {
    return (
      <Registry>
        <RegistryRow>
          <RegistryTextContainer>
            <RegistryText>Horário: </RegistryText>
            <RegistryContent>{moment(date).format('kk:mm')}</RegistryContent>
          </RegistryTextContainer>
          <RegistryTextContainer>
            <RegistryText>Duração: </RegistryText>
            <RegistryContent>{duration} min</RegistryContent>
          </RegistryTextContainer>
        </RegistryRow>
        <RegistryRow>
          <RegistryTextContainer>
            <RegistryText>Mama: </RegistryText>
            <RegistryContent>
              {breast === 'E' ? 'Esquerda' : 'Direita'}
            </RegistryContent>
          </RegistryTextContainer>
        </RegistryRow>
      </Registry>
    );
  }

  return (
    <ScrollView>
      <Container>
        <DateText>{dateFormatVerbose(currentDate)}</DateText>
        <ListContainer>
          {!isLoading ? (
            registries.map(registry => (
              <View key={registry.id}>
                <BabyName>{registry.name}</BabyName>
                {registry.entries.map(({ id, breast, date, duration }) => (
                  <RegistryEntry
                    key={id}
                    breast={breast}
                    date={date}
                    duration={duration}
                  />
                ))}
              </View>
            ))
          ) : (
            <ActivityIndicator
              size="large"
              color="#7d5cd7"
              animating={isLoading}
            />
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

export default DiaryRegistry;
