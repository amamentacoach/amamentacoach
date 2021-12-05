import { Action, AppScreen } from '@common/telemetria';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';

import { PaddedScrollView } from 'lib/SharedStyles';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { RootStackProps } from 'routes/app';

import { Line, OptionButton, OptionText } from './styles';

const MenuTermsOfService: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.MenuTermsOfService },
    });
  }, []);

  return (
    <PaddedScrollView>
      <OptionButton onPress={() => navigation.navigate('ReadTermsOfService')}>
        <OptionText>
          {i18n.t('MenuTermsOfServicePage.ReadTermsOfService')}
        </OptionText>
      </OptionButton>
      <Line />
      <OptionButton onPress={() => navigation.navigate('LeaveResearch')}>
        <OptionText>
          {i18n.t('MenuTermsOfServicePage.LeaveResearch')}
        </OptionText>
      </OptionButton>
      <Line />
    </PaddedScrollView>
  );
};

export default MenuTermsOfService;
