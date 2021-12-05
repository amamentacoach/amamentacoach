import i18n from 'i18n-js';
import { View } from 'react-native';

import { formatWithLocale } from 'lib/date-fns';

import { BoldMainText, Container, MainText, Title } from './styles';

interface Props {
  name: string;
}

const date = formatWithLocale(new Date(), 'PPP');

export const AdultTermsOfService: React.FC<Props> = ({ name }) => {
  return (
    <>
      <Title>{i18n.t('TermsOfServiceText.Adult.Title')}</Title>
      <BoldMainText>{i18n.t('TermsOfServiceText.Adult.Text1')}</BoldMainText>
      <MainText>
        {i18n.t('TermsOfServiceText.Adult.Text2')}{' '}
        <BoldMainText>{i18n.t('TermsOfServiceText.Adult.Text3')}</BoldMainText>
        {i18n.t('TermsOfServiceText.Adult.Text4')}
      </MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text5')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text6')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text7')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text8')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text9')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text10')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text11')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text12')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text13')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text14')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text15')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text16')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text17')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text18', { date })}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text19')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text20')}</MainText>
      <MainText>{i18n.t('TermsOfServiceText.Adult.Text21', { name })}</MainText>
    </>
  );
};

export const MinorTermsOfService: React.FC<Props> = ({ name }) => {
  return (
    <>
      <View>
        <Title>{i18n.t('TermsOfServiceText.Parent.Title')}</Title>
        <BoldMainText>{i18n.t('TermsOfServiceText.Parent.Text1')}</BoldMainText>
        <MainText>
          {i18n.t('TermsOfServiceText.Parent.Text2')}{' '}
          <BoldMainText>
            {i18n.t('TermsOfServiceText.Parent.Text3')}
          </BoldMainText>
          {i18n.t('TermsOfServiceText.Parent.Text4')}
        </MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text5')} </MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text6')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text7')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text8')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text9')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text10')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text11')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text12')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text13')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text14')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text15')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text16')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text17')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text18')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text19')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text20')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text21')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text22')}</MainText>
        <MainText>
          {i18n.t('TermsOfServiceText.Parent.Text23', { date })}
        </MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text24')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text25')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Parent.Text26')}</MainText>
      </View>
      <Container>
        <Title>{i18n.t('TermsOfServiceText.Minor.Title')}</Title>
        <BoldMainText>{i18n.t('TermsOfServiceText.Minor.Text1')}</BoldMainText>
        <MainText>
          {i18n.t('TermsOfServiceText.Minor.Text2')}{' '}
          <BoldMainText>
            {i18n.t('TermsOfServiceText.Minor.Text3')}
          </BoldMainText>
          {i18n.t('TermsOfServiceText.Minor.Text4')}
        </MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text5')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text6')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text7')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text8')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text9')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text10')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text11')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text12')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text13')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text14')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text15')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text16')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text17')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text18')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text19')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text20')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text21')}</MainText>
        <MainText>
          {i18n.t('TermsOfServiceText.Minor.Text22', { date })}
        </MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text23')}</MainText>
        <MainText>{i18n.t('TermsOfServiceText.Minor.Text24')}</MainText>
        <MainText>
          {i18n.t('TermsOfServiceText.Minor.Text25', { name })}
        </MainText>
      </Container>
    </>
  );
};
