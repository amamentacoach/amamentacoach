import i18n from 'i18n-js';

import ImageWrapper from 'components/ImageWrapper';

import {
  ColoredText,
  ContentText,
  ContentTitleText,
  ContentWrapper,
  ScrollView,
} from './styles';

import WithdrawalWhen from '@assets/images/withdrawal_when.png';

const WhenToBreastfeed: React.FC = () => {
  return (
    <ScrollView>
      <ContentTitleText>
        {i18n.t('WhenToBreastfeedPage.Header')}
      </ContentTitleText>
      <ContentWrapper>
        <ImageWrapper source={WithdrawalWhen} />
        <ContentText>
          {i18n.t('WhenToBreastfeedPage.Text1')}{' '}
          <ColoredText>{i18n.t('WhenToBreastfeedPage.Text2')}</ColoredText>{' '}
          {i18n.t('WhenToBreastfeedPage.Text3')}{' '}
          <ColoredText>{i18n.t('WhenToBreastfeedPage.Text4')}</ColoredText>{' '}
          {i18n.t('WhenToBreastfeedPage.Text5')}
        </ContentText>
      </ContentWrapper>
    </ScrollView>
  );
};

export default WhenToBreastfeed;
