import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

import { useAuth } from '../../contexts/auth';
import {
  listDiaryRegistries,
  IListDiaryEntry,
} from '../../services/diaryRegistry';

import {
  DateText,
  Container,
  Registry,
  RegistryRow,
  RegistryText,
  RegistryTextContainer,
  RegistryContent,
  ListContainer,
} from './styles';
import MainButton from '../../components/MainButton';

const DiaryRegistry: React.FC = () => {
  const navigation = useNavigation();
  const { motherInfo } = useAuth();
  const [currentDate] = useState(moment());
  const [registries, setRegistries] = useState<IListDiaryEntry[]>();

  useEffect(() => {
    async function fetchRegistries() {
      if (motherInfo.babies) {
        const oldRegistries = await Promise.all(
          motherInfo.babies.map(async ({ id }) => listDiaryRegistries(id)),
        );
        // Ordena os registros de acordo com suas datas em ordem decrescente.
        const sortedRegistries = ([] as IListDiaryEntry[]).concat(
          ...oldRegistries,
        );
        sortedRegistries.sort((a, b) => (a.date < b.date ? 1 : -1));
        setRegistries(sortedRegistries);
      }
    }
    fetchRegistries();
  }, [motherInfo]);

  function formatCurrentDate() {
    const day = currentDate.format('DD');
    const dayName = currentDate.format('dddd');
    const capitalizedDayName =
      dayName.charAt(0).toUpperCase() + dayName.slice(1);

    const month = currentDate.format('MMMM').toString();
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

    const year = currentDate.format('YYYY');

    return `${capitalizedDayName}, ${day} de ${capitalizedMonth} de ${year}`;
  }

  function InfoPage({ date, breast, duration, quantity }: IListDiaryEntry) {
    return (
      <Registry>
        <RegistryRow>
          <RegistryTextContainer>
            <RegistryText>Horário: </RegistryText>
            <RegistryContent>{moment(date).format('hh:mm')}</RegistryContent>
          </RegistryTextContainer>
          <RegistryTextContainer>
            <RegistryText>Duração: </RegistryText>
            <RegistryContent>{duration} min</RegistryContent>
          </RegistryTextContainer>
        </RegistryRow>
        <RegistryRow>
          <RegistryTextContainer>
            <RegistryText>Quantidade: </RegistryText>
            <RegistryContent>{quantity} ml</RegistryContent>
          </RegistryTextContainer>
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
    <Container>
      <DateText>{formatCurrentDate()}</DateText>
      <ListContainer>
        <FlatList
          data={registries}
          renderItem={({ item }) => <InfoPage {...item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </ListContainer>
      <MainButton
        buttonText="Registrar retirada"
        onPress={() => navigation.navigate('NewDiaryRegistry')}
      />
    </Container>
  );
};

export default DiaryRegistry;
