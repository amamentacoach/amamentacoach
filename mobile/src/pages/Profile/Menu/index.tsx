import { Action, AppScreen } from '@common/telemetria';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import { useAuth } from 'contexts/auth';
import { PaddedScrollView, Line } from 'lib/sharedStyles';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { RootStackProps } from 'routes/app';

import { OptionText } from './styles';

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
    <PaddedScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('NewPassword')}>
        <OptionText>{i18n.t('ProfileMenuPage.ChangePassword')}</OptionText>
      </TouchableOpacity>
      <Line />
      <TouchableOpacity
        onPress={() => navigation.navigate('MenuTermsOfService')}>
        <OptionText>{i18n.t('TermsOfService')}</OptionText>
      </TouchableOpacity>
      <Line />
      <TouchableOpacity onPress={signOut}>
        <OptionText>{i18n.t('Leave')}</OptionText>
      </TouchableOpacity>
      <Line />
    </PaddedScrollView>
  );
};

export default ProfileMenu;
