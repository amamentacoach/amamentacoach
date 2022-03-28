import i18n from 'i18n-js';

import { formatWithLocale } from 'lib/date-fns';
import { OpenSansBold, OpenSansRegular, Row } from 'lib/sharedStyles';

import type { ExtractionEntry } from 'services/diaryRegistry';

import { Registry, TextContainer } from './styles';

const DiaryRegistryEntry: React.FC<ExtractionEntry> = ({
  breasts,
  date,
  duration,
  quantity,
}) => {
  return (
    <Registry>
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
          <TextContainer>
            {breasts.map((breast, index) => (
              <OpenSansRegular key={breast}>
                {index > 0 && ', '}
                {breast === 'E' ? i18n.t('Left') : i18n.t('Right')}
              </OpenSansRegular>
            ))}
          </TextContainer>
        </TextContainer>
        <TextContainer>
          <OpenSansBold>{i18n.t('Quantity')}: </OpenSansBold>
          <OpenSansRegular>{quantity} ml</OpenSansRegular>
        </TextContainer>
      </Row>
    </Registry>
  );
};

export default DiaryRegistryEntry;
