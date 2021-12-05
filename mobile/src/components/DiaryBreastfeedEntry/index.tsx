import i18n from 'i18n-js';
import { View } from 'react-native';

import { formatWithLocale } from 'lib/date-fns';

import type { BreastfeedEntry } from 'services/diaryRegistry';

import {
  BabyName,
  Breastfeed,
  Content,
  Row,
  Text,
  TextContainer,
} from './styles';

const DiaryBreastfeedEntry: React.FC<BreastfeedEntry> = ({ name, entries }) => {
  if (entries.length <= 0) {
    return <></>;
  }

  return (
    <View>
      <BabyName>{name}</BabyName>
      {entries.map(({ id, breasts, date, duration }) => (
        <Breastfeed key={id}>
          <Row>
            <TextContainer>
              <Text>{i18n.t('Time')}: </Text>
              <Content>{formatWithLocale(new Date(date), 'HH:mm')}</Content>
            </TextContainer>
            <TextContainer>
              <Text>{i18n.t('Duration')}: </Text>
              <Content>{duration} min</Content>
            </TextContainer>
          </Row>
          <Row>
            <TextContainer>
              <Text>{i18n.t('Breast')}: </Text>
              {breasts.map((breast, index) => (
                <Content key={breast}>
                  {index > 0 && ', '}
                  {breast === 'E' ? i18n.t('Left') : i18n.t('Right')}
                </Content>
              ))}
            </TextContainer>
          </Row>
        </Breastfeed>
      ))}
    </View>
  );
};

export default DiaryBreastfeedEntry;
