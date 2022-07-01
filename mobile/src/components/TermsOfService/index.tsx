import i18n from 'i18n-js';
import { View } from 'react-native';

import { BoldMainText, Container, MainText, Title } from './styles';

export const AdultTermsOfService: React.FC = () => {
  return (
    <>
      <BoldMainText>{i18n.t('TermsOfServiceText.Header.Text1')}</BoldMainText>
      <MainText>
        {i18n.t('TermsOfServiceText.Header.Text2')}{' '}
        <BoldMainText>{i18n.t('TermsOfServiceText.Header.Text3')}</BoldMainText>
        {i18n.t('TermsOfServiceText.Header.Text4')}
      </MainText>
      <MainText>{i18n.t('TermsOfServiceText.Header.Text5')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text1')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text2')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text3')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text4')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text5')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text6')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Footer.Text1')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Footer.Text2')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Footer.Text3')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Footer.Text4')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Footer.Text5')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Footer.Text6')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Footer.Text7')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Footer.Text8')}</MainText>
    </>
  );
};

export const MinorTermsOfService: React.FC = () => {
  return (
    <>
      <View>
        <BoldMainText>{i18n.t('TermsOfServiceText.Header.Text1')}</BoldMainText>
        <MainText>
          {i18n.t('TermsOfServiceText.Header.Text2')}{' '}
          <BoldMainText>
            {i18n.t('TermsOfServiceText.Header.Text3')}
          </BoldMainText>
          {i18n.t('TermsOfServiceText.Header.Text4')}
        </MainText>
        <MainText>{i18n.t('TermsOfServiceText.Header.Text5')} </MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text1')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text2')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text3')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text4')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text5')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text6')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Footer.Text1')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Footer.Text2')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Footer.Text3')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Footer.Text4')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Footer.Text5')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Footer.Text6')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Footer.Text7')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Footer.Text8')}</MainText>
      </View>
      <Container>
        <Title>{i18n.t('TermsOfServiceText.Header.Title')}</Title>
        <BoldMainText>{i18n.t('TermsOfServiceText.Header.Text1')}</BoldMainText>
        <MainText>
          {i18n.t('TermsOfServiceText.Header.Text2')}{' '}
          <BoldMainText>
            {i18n.t('TermsOfServiceText.Header.Text3')}
          </BoldMainText>
          {i18n.t('TermsOfServiceText.Header.Text4')}
        </MainText>
        <MainText>{i18n.t('TermsOfServiceText.Header.Text5')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text1')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text2')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text3')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text4')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text5')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text6')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Footer.Text1')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Footer.Text2')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Footer.Text3')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Footer.Text4')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Footer.Text5')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Footer.Text6')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Footer.Text7')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Footer.Text8')}</MainText>
      </Container>
    </>
  );
};
