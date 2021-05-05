import React from 'react';

import {
  ContentWrapper,
  ContentText,
  ContentTitleText,
  ColoredText,
  ScrollView,
} from './styles';

import Withdrawal1 from '../../../../assets/images/withdrawal_premature_1.svg';
import Withdrawal2 from '../../../../assets/images/withdrawal_premature_2.svg';

const HowLongToBreastfeed: React.FC = () => {
  return (
    <ScrollView>
      <ContentTitleText>
        Por quanto tempo fazer a retirada do leite?
      </ContentTitleText>
      <ContentWrapper>
        <Withdrawal1 />
        <ContentText>
          Enquanto seu bebê ainda não estiver
          <ColoredText> mamando regularmente</ColoredText>.
        </ContentText>
        <Withdrawal2 />
        <ContentText>
          Enquanto ele ainda não estiver mamando
          <ColoredText> exclusivamente em você</ColoredText>.
        </ContentText>
      </ContentWrapper>
    </ScrollView>
  );
};

export default HowLongToBreastfeed;
