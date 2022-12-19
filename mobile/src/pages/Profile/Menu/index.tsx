import { Action, AppScreen } from '@common/telemetria';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';

import PaddedScrollView from 'components/PaddedScrollView';
import { useAuth } from 'contexts/auth';
import { Line } from 'lib/sharedStyles';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { RootStackProps } from 'routes/app';

import { OptionText } from './styles';

const ProfileMenu: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const isFocused = useIsFocused();
  const { signOut } = useAuth();

  const options = [
    {
      onPress: () => navigation.navigate('NewPassword'),
      text: i18n.t('ProfileMenuPage.ChangePassword'),
    },
    {
      onPress: () => navigation.navigate('MenuTermsOfService'),
      text: i18n.t('TermsOfService'),
    },
    { onPress: signOut, text: i18n.t('Leave') },
  ];

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
      {options.map(({ text, onPress }) => (
        <View key={text}>
          <TouchableOpacity onPress={onPress}>
            <OptionText>{text}</OptionText>
          </TouchableOpacity>
          <Line />
        </View>
      ))}
    </PaddedScrollView>
  );
};

export default ProfileMenu;
