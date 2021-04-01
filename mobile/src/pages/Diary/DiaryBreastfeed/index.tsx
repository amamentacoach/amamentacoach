import React, { useState, useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

import dateFormatVerbose from '../../../utils/date';
import { useAuth } from '../../../contexts/auth';
import {
  IBreastfeedEntry,
  listBreastfeedEntries,
} from '../../../services/diaryRegistry';
import MainButton from '../../../components/MainButton';

import {
  DateText,
  Breastfeed,
  Row,
  Text,
  TextContainer,
  Content,
  ListContainer,
  BabyName,
  ScrollView,
  Container,
} from './styles';

interface BreastfeedEntryProps {
  date: string;
  breast: 'E' | 'D';
  duration: number;
}

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

  function BreastfeedEntry({ breast, date, duration }: BreastfeedEntryProps) {
    return (
      <Breastfeed>
        <Row>
          <TextContainer>
            <Text>Horário: </Text>
            <Content>{moment(date).format('kk:mm')}</Content>
          </TextContainer>
          <TextContainer>
            <Text>Duração: </Text>
            <Content>{duration} min</Content>
          </TextContainer>
        </Row>
        <Row>
          <TextContainer>
            <Text>Mama: </Text>
            <Content>{breast === 'E' ? 'Esquerda' : 'Direita'}</Content>
          </TextContainer>
        </Row>
      </Breastfeed>
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
                {registry.entries.length > 0 && (
                  <BabyName>{registry.name}</BabyName>
                )}
                {registry.entries.map(({ id, breast, date, duration }) => (
                  <BreastfeedEntry
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

export default DiaryBreastfeed;
