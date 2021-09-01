import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import i18n from 'i18n-js';
import { ActivityIndicator } from 'react-native';

import PieChart from '../../../components/PieChart';
import {
  listSurveyStatistics,
  SurveyStatistics as ISurveyStatistics,
} from '../../../services/survey';

import {
  ContentContainer,
  ContentHeader,
  ContentSeparator,
  HeaderBackground,
  HeaderText,
  Question,
  QuestionContainer,
  QuestionIndex,
  ScrollView,
} from './styles';

const SurveyStatistics: React.FC = () => {
  const navigation = useNavigation();
  const [statistics, setStatistics] = useState<ISurveyStatistics[]>([]);
  const [loading, setLoading] = useState(true);

  // Faz com que o botão de retorno redirecione para a página de enquetes. Ao contrário do
  // comportamento padrão de voltar a tela anterior.
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          tintColor="#ffffff"
          onPress={() => navigation.navigate('Survey')}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    // Faz com que o gesto de retorno carregue a página de enquetes.
    navigation.addListener('beforeRemove', e => {
      // Impede a ação padrão de retornar a tela anterior.
      e.preventDefault();
      navigation.navigate('Survey');
    });

    async function fetchStatistics() {
      const stats = await listSurveyStatistics();
      if (stats) {
        setStatistics(stats);
        setLoading(false);
      }
    }
    fetchStatistics();
  }, []);

  return (
    <ScrollView>
      <HeaderBackground />
      <HeaderText>{i18n.t('PrematureBreastfeed')}</HeaderText>

      <ContentContainer>
        {loading ? (
          <ActivityIndicator size="large" color="#7d5cd7" animating={loading} />
        ) : (
          <>
            <ContentHeader>
              {i18n.t('SurveyStatisticsPage.FormSubmitted')}
            </ContentHeader>
            {statistics.map(({ id, question, options }, index) => (
              <QuestionContainer key={id}>
                <QuestionIndex>
                  {i18n.t('Question')} {(index + 1).toString().padStart(2, '0')}
                </QuestionIndex>
                <Question>{question}</Question>

                <PieChart label={question} data={options} />
                {index !== statistics.length - 1 && <ContentSeparator />}
              </QuestionContainer>
            ))}
          </>
        )}
      </ContentContainer>
    </ScrollView>
  );
};

export default SurveyStatistics;
