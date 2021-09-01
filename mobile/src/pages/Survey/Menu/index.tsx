import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';

import Modal from '../../../components/Modal';
import OptionsList, { Options } from '../../../components/OptionList';
import { useAuth } from '../../../contexts/auth';
import { storageIsToday } from '../../../lib/date-fns';

import { Header, HeaderTitle, ScrollView } from './styles';

import SurveysFour from '../../../../assets/images/surveys_four.svg';
import SurveysOne from '../../../../assets/images/surveys_one.svg';
import SurveysThree from '../../../../assets/images/surveys_three.svg';
import SurveysTwo from '../../../../assets/images/surveys_two.svg';

const SurveyMenu: React.FC = () => {
  const { motherInfo } = useAuth();
  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);

  let options: Options[] = [
    {
      image: SurveysOne,
      title: i18n.t('PrematureBreastfeed'),
      onPress: async () => {
        // Checa se o usuário já respondeu o formulário no dia.
        if (
          await storageIsToday('@AmamentaCoach:DiarySurveyBreastfeedLastDate')
        ) {
          navigation.navigate('SurveyBreastfeed');
        } else {
          setIsModalVisible(true);
        }
      },
    },
    {
      image: SurveysTwo,
      title: i18n.t('SurveyMenuPage.3'),
      onPress: async () => {
        // Checa se o usuário já respondeu o formulário no dia.
        if (
          await storageIsToday('@AmamentaCoach:DiarySurveyMotivationLastDate')
        ) {
          navigation.navigate('SurveyMotivation');
        } else {
          setIsModalVisible(true);
        }
      },
    },
    {
      image: SurveysThree,
      title: i18n.t('SurveyMenuPage.5'),
      onPress: async () => {
        // Checa se o usuário já respondeu o formulário no dia.
        if (await storageIsToday('@AmamentaCoach:DiarySurveyHelpLastDate')) {
          navigation.navigate('SurveyHelp');
        } else {
          setIsModalVisible(true);
        }
      },
    },
  ];

  // Exibe o formulário de participação do pai apenas se a mãe tem um companheiro.
  if (motherInfo.partner) {
    options = [
      ...options,
      {
        image: SurveysFour,
        title: i18n.t('SurveyMenuPage.6'),
        onPress: async () => {
          // Checa se o usuário já respondeu o formulário no dia.
          if (
            await storageIsToday('@AmamentaCoach:DiarySurveyFatherLastDate')
          ) {
            navigation.navigate('SurveyFather');
          } else {
            setIsModalVisible(true);
          }
        },
      },
    ];
  }

  return (
    <>
      <Modal
        content={i18n.t('ErrorSurveyAlreadyAnswered')}
        options={[
          {
            text: i18n.t('Close'),
            onPress: () => setIsModalVisible(false),
          },
        ]}
        visible={isModalVisible}
      />
      <ScrollView>
        <Header>
          <HeaderTitle>{i18n.t('Surveys')}</HeaderTitle>
        </Header>
        <OptionsList options={options} />
      </ScrollView>
    </>
  );
};

export default SurveyMenu;
