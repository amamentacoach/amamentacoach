import { Action, AppScreen } from '@common/telemetria';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import { PaddedScrollView, Line } from 'lib/sharedStyles';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { RootStackProps } from 'routes/app';

import { OptionText } from './styles';

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
      <TouchableOpacity
        onPress={() => navigation.navigate('ReadTermsOfService')}>
        <OptionText>
          {i18n.t('MenuTermsOfServicePage.ReadTermsOfService')}
        </OptionText>
      </TouchableOpacity>
      <Line />
      <TouchableOpacity onPress={() => navigation.navigate('LeaveResearch')}>
        <OptionText>
          {i18n.t('MenuTermsOfServicePage.LeaveResearch')}
        </OptionText>
      </TouchableOpacity>
      <Line />
    </PaddedScrollView>
  );
};

export default MenuTermsOfService;
