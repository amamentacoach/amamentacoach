import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';

import type { RootStackProps } from 'routes/app';

import { Line, OptionButton, OptionText, ScrollView } from './styles';

const MenuTermsOfService: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();

  return (
    <ScrollView>
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
    </ScrollView>
  );
};

export default MenuTermsOfService;
