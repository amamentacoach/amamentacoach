import { Action, AppScreen } from '@common/telemetria';
import i18n from 'i18n-js';
import { useEffect } from 'react';

import ImageWrapper from 'components/ImageWrapper';
import { ScrollView } from 'lib/sharedStyles';
import { getBestLocale } from 'utils/localize';
import { createTelemetryAction } from 'utils/telemetryAction';

import {
  ColoredText,
  ContentText,
  ContentTitleText,
  ContentWrapper,
} from './styles';

import Withdrawal from '@assets/images/withdrawal_premature.webp';

const HowLongToBreastfeed: React.FC = () => {
  const { languageTag } = getBestLocale();

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.HowLongToBreastfeed },
    });
  }, []);

  return (
    <ScrollView>
      <ContentTitleText>
        {i18n.t('HowLongToBreastfeedPage.Header')}
      </ContentTitleText>

      <ContentWrapper>
        {languageTag === 'pt' && (
          <ContentText>
            {i18n.t('HowLongToBreastfeedPage.Text1')}{' '}
            <ColoredText>{i18n.t('HowLongToBreastfeedPage.Text2')}</ColoredText>
          </ContentText>
        )}
        <ImageWrapper
          height={190}
          resizeMode="contain"
          source={Withdrawal}
          width="100%"
        />
        <ContentText>
          {i18n.t('HowLongToBreastfeedPage.Text3')}{' '}
          <ColoredText>{i18n.t('HowLongToBreastfeedPage.Text4')}</ColoredText>.
          {i18n.t('HowLongToBreastfeedPage.Text5')}
        </ContentText>
      </ContentWrapper>
    </ScrollView>
  );
};

export default HowLongToBreastfeed;
