import { Action, AppScreen } from '@common/Telemetria';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import PieChart from 'components/PieChart';
import { listSurveyStatistics } from 'services/survey';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { RootStackProps } from 'routes/app';
import type { SurveyStatistics as ISurveyStatistics } from 'services/survey';

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

import BackIcon from '@assets/images/icons/ic_back.svg';

const SurveyStatistics: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const [statistics, setStatistics] = useState<ISurveyStatistics[]>([]);
  const [loading, setLoading] = useState(true);

  // Faz com que o botão de retorno redirecione para a página de enquetes. Ao contrário do
  // comportamento padrão de voltar a tela anterior.
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackImage: ({ tintColor }) => (
        <BackIcon
          color={tintColor}
          onPress={() => navigation.navigate('Survey')}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    async function fetchStatistics() {
      const stats = await listSurveyStatistics();
      if (stats) {
        setStatistics(stats);
        setLoading(false);
      }
    }

    function navigateToSurveyPage(event: any) {
      // Impede a ação padrão de retornar a tela anterior.
      event.preventDefault();
      navigation.navigate('Survey');
    }

    // Faz com que o gesto de retorno carregue a página de enquetes.
    navigation.addListener('beforeRemove', navigateToSurveyPage);
    fetchStatistics();
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.SurveyStatistics },
    });

    return () => {
      navigation.removeListener('beforeRemove', navigateToSurveyPage);
    };
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
