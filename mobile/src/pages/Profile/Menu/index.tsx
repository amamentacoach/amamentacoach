import { Action, AppScreen } from '@common/Telemetria';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';

import { useAuth } from 'contexts/auth';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { RootStackProps } from 'routes/app';

import { Line, OptionButton, OptionText, ScrollView } from './styles';

const ProfileMenu: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const isFocused = useIsFocused();
  const { signOut } = useAuth();

  useEffect(() => {
    if (isFocused) {
      createTelemetryAction({
        action: Action.Opened,
        context: { screen: AppScreen.ProfileMenu },
      });
    }
  }, [isFocused]);

  return (
    <ScrollView>
      <OptionButton onPress={() => navigation.navigate('NewPassword')}>
        <OptionText>{i18n.t('ProfileMenuPage.ChangePassword')}</OptionText>
      </OptionButton>
      <Line />
      <OptionButton onPress={() => navigation.navigate('MenuTermsOfService')}>
        <OptionText>{i18n.t('TermsOfService')}</OptionText>
      </OptionButton>
      <Line />
      <OptionButton onPress={signOut}>
        <OptionText>{i18n.t('Leave')}</OptionText>
      </OptionButton>
      <Line />
    </ScrollView>
  );
};

export default ProfileMenu;
