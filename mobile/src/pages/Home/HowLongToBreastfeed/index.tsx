import React from 'react';

import ImageWrapper from '../../../components/ImageWrapper';

import {
  ColoredText,
  ContentText,
  ContentTitleText,
  ContentWrapper,
  ScrollView,
} from './styles';

import Withdrawal1 from '../../../../assets/images/withdrawal_premature_1.png';
import Withdrawal2 from '../../../../assets/images/withdrawal_premature_2.png';

const HowLongToBreastfeed: React.FC = () => {
  return (
    <ScrollView>
      <ContentTitleText>
        Por quanto tempo fazer a retirada do leite?
      </ContentTitleText>
      <ContentWrapper>
        <ImageWrapper
          source={Withdrawal1}
          resizeMode="contain"
          width="100%"
          height={190}
        />
        <ContentText>
          Enquanto seu bebê ainda não estiver
          <ColoredText> mamando regularmente</ColoredText>.
        </ContentText>
        <ImageWrapper
          source={Withdrawal2}
          resizeMode="contain"
          width="100%"
          height={190}
        />
        <ContentText>
          Enquanto ele ainda não estiver mamando
          <ColoredText> exclusivamente em você</ColoredText>.
        </ContentText>
      </ContentWrapper>
    </ScrollView>
  );
};

export default HowLongToBreastfeed;
