import React from 'react';

import { format } from '../../lib/date-fns';
import { ExtractionEntry } from '../../services/diaryRegistry';

import { Content, Registry, Row, Text, TextContainer } from './styles';

const DiaryRegistryEntry: React.FC<ExtractionEntry> = ({
  breast,
  date,
  duration,
  quantity,
}) => {
  return (
    <Registry>
      <Row>
        <TextContainer>
          <Text>Horário: </Text>
          <Content>{format(new Date(date), 'kk:mm')}</Content>
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
        <TextContainer>
          <Text>Quantidade: </Text>
          <Content>{quantity} ml</Content>
        </TextContainer>
      </Row>
    </Registry>
  );
};

export default DiaryRegistryEntry;
