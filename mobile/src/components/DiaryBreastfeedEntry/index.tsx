import i18n from 'i18n-js';
import { View } from 'react-native';

import { formatWithLocale } from 'lib/date-fns';
import { OpenSansRegular, OpenSansBold } from 'lib/sharedStyles';

import type { BreastfeedEntry } from 'services/diaryRegistry';

import { BabyName, Breastfeed, Row, TextContainer } from './styles';

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
              <OpenSansBold>{i18n.t('Time')}: </OpenSansBold>
              <OpenSansRegular>
                {formatWithLocale(new Date(date), 'HH:mm')}
              </OpenSansRegular>
            </TextContainer>
            <TextContainer>
              <OpenSansBold>{i18n.t('Duration')}: </OpenSansBold>
              <OpenSansRegular>{duration} min</OpenSansRegular>
            </TextContainer>
          </Row>
          <Row>
            <TextContainer>
              <OpenSansBold>{i18n.t('Breast')}: </OpenSansBold>
              {breasts.map((breast, index) => (
                <OpenSansRegular key={breast}>
                  {index > 0 && ', '}
                  {breast === 'E' ? i18n.t('Left') : i18n.t('Right')}
                </OpenSansRegular>
              ))}
            </TextContainer>
          </Row>
        </Breastfeed>
      ))}
    </View>
  );
};

export default DiaryBreastfeedEntry;
