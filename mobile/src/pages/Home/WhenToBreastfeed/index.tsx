import React from 'react';
import { Image } from 'react-native';

import {
  ContentWrapper,
  ContentText,
  ContentTitleText,
  ColoredText,
  ScrollView,
} from './styles';

import WithdrawalWhen from '../../../../assets/images/withdrawal_when.png';

const WhenToBreastfeed: React.FC = () => {
  return (
    <ScrollView>
      <ContentTitleText>Quando retirar o leite?</ContentTitleText>
      <ContentWrapper>
        <Image source={WithdrawalWhen} />
        <ContentText>
          Estamos tentando <ColoredText>fazer seu corpo entender </ColoredText>
          que precisa produzir leite para o bebê, lembra? Então, a retirada do
          leite deve ser regular e no mínimo de{' '}
          <ColoredText>3 em 3 horas</ColoredText> para que as mamas fiquem
          sempre vazias.
        </ContentText>
      </ContentWrapper>
    </ScrollView>
  );
};

export default WhenToBreastfeed;
