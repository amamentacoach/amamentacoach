import React from 'react';
import { View } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

import { IBreastfeedEntry } from '../../services/diaryRegistry';

import {
  Breastfeed,
  Row,
  Text,
  TextContainer,
  Content,
  BabyName,
} from './styles';

const DiaryBreastfeedEntry: React.FC<IBreastfeedEntry> = ({
  name,
  entries,
}) => {
  if (entries.length <= 0) {
    return <></>;
  }

  return (
    <View>
      <BabyName>{name}</BabyName>
      {entries.map(({ id, breast, date, duration }) => (
        <Breastfeed key={id}>
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
      ))}
    </View>
  );
};

export default DiaryBreastfeedEntry;
