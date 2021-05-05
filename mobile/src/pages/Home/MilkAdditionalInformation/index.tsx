import React from 'react';

import { ContentWrapper, ContentText, ScrollView } from './styles';

import MilkAdditionalInfoOne from '../../../../assets/images/milk_additional_info_one.svg';
import MilkAdditionalInfoTwo from '../../../../assets/images/milk_additional_info_two.svg';
import MilkAdditionalInfoThree from '../../../../assets/images/milk_additional_info_three.svg';

const MilkAdditionalInformation: React.FC = () => {
  return (
    <ScrollView>
      <ContentWrapper>
        <MilkAdditionalInfoOne />
        <ContentText>
          Quando o bebê nasce e a placenta sai, acontecem alterações importantes
          no corpo que ajudam a dar início na produção de leite. Os hormônios
          saem do cérebro e agem nas mamas.
        </ContentText>
        <ContentText>
          Nesse processo, os lóbulos mamários – que se parecem com cachos de uva
          e estão localizados no final de canais conhecidos como ductos –
          começam a produzir e armazenar o leite materno.
        </ContentText>
      </ContentWrapper>
      <ContentWrapper>
        <MilkAdditionalInfoTwo />
        <ContentText>
          Conforme o bebê suga o peito, ou conforme o leite é retirado, o
          cérebro produz mais e mais hormônio ocitocina. Dentro da mama, a
          ocitocina é responsável por “espremer” os lóbulos, o que ajuda a
          empurrar o leite com mais naturalidade pelos ductos até os saquinhos
          chamados ampolas.
        </ContentText>
      </ContentWrapper>
      <ContentWrapper>
        <MilkAdditionalInfoThree />
        <ContentText>
          A ocitocina é produzida e liberada com mais facilidade quando a mulher
          sente-se bem, está calma e confiante. Também quando vê o bebê, toca
          nele e sente seu cheirinho, ou até quando pensa nele.
        </ContentText>
        <ContentText>
          Quanto mais se retira o leite (seja pela sucção do bebê, seja
          manualmente ou com bombinha), mais hormônios do leite o cérebro produz
        </ContentText>
      </ContentWrapper>
      <ContentWrapper>
        <ContentText>
          Fonte: Adaptado do site
          https://bebe.abril.com.br/amamentacao/leite-materno-infografico-mostra-como-ele-e-produzido/
        </ContentText>
      </ContentWrapper>
    </ScrollView>
  );
};

export default MilkAdditionalInformation;
