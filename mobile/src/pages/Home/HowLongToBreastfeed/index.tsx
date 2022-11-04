import { Action, AppScreen } from '@common/telemetria';
import i18n from 'i18n-js';
import { useEffect } from 'react';

import ImageWrapper from 'components/ImageWrapper';
import { ScrollView } from 'lib/sharedStyles';
import { createTelemetryAction } from 'utils/telemetryAction';

import {
  ColoredText,
  ContentText,
  ContentTitleText,
  ContentWrapper,
} from './styles';

import Withdrawal1 from '@assets/images/withdrawal_premature_1.webp';
import Withdrawal2 from '@assets/images/withdrawal_premature_2.webp';

const HowLongToBreastfeed: React.FC = () => {
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
        <ImageWrapper
          height={190}
          resizeMode="contain"
          source={Withdrawal1}
          width="100%"
        />
        <ContentText>
          {i18n.t('HowLongToBreastfeedPage.Text1')}{' '}
          <ColoredText>{i18n.t('HowLongToBreastfeedPage.Text2')}</ColoredText>.
        </ContentText>
        <ImageWrapper
          height={190}
          resizeMode="contain"
          source={Withdrawal2}
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
