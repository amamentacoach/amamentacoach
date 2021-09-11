import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';

import { useAuth } from '../../../contexts/auth';

import type { RootStackProps } from '../../../routes/app';

import { Line, OptionButton, OptionText, ScrollView } from './styles';

const Profile: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const { signOut } = useAuth();

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

export default Profile;
