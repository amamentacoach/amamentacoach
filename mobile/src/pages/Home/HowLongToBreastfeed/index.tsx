import React from 'react';
import { Image } from 'react-native';

import {
  ContentWrapper,
  ContentText,
  ContentTitleText,
  ColoredText,
  ScrollView,
} from './styles';

import WithdrawalOne from '../../../../assets/images/withdrawal_premature_one.png';
import WithdrawalTwo from '../../../../assets/images/withdrawal_premature_two.png';

const HowLongToBreastfeed: React.FC = () => {
  return (
    <ScrollView>
      <ContentTitleText>
        Por quanto tempo fazer a retirada do leite?
      </ContentTitleText>
      <ContentWrapper>
        <Image source={WithdrawalOne} />
        <ContentText>
          Enquanto seu bebê ainda não estiver
          <ColoredText> mamando regularmente</ColoredText>.
        </ContentText>
        <Image source={WithdrawalTwo} />
        <ContentText>
          Enquanto ele ainda não estiver mamando
          <ColoredText> exclusivamente em você</ColoredText>.
        </ContentText>
      </ContentWrapper>
    </ScrollView>
  );
};

export default HowLongToBreastfeed;
