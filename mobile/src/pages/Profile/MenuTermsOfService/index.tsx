import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Line, OptionButton, OptionText, ScrollView } from './styles';

const MenuTermsOfService: React.FC = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <OptionButton onPress={() => navigation.navigate('ReadTermsOfService')}>
        <OptionText>Ler Termo de Consentimento</OptionText>
      </OptionButton>
      <Line />
      <OptionButton onPress={() => navigation.navigate('LeaveResearch')}>
        <OptionText>Descadastrar da pesquisa</OptionText>
      </OptionButton>
      <Line />
    </ScrollView>
  );
};

export default MenuTermsOfService;
