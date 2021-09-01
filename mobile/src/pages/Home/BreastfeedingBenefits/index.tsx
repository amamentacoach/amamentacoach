import React from 'react';

import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';

import createGenericInfoPage from '../../../components/GenericInfoPage';
import InformationPages, {
  InfoPageItem,
} from '../../../components/InformationPages';

import BreastfeedBenefits1 from '../../../../assets/images/breastfeed_benefits_1.png';
import BreastfeedBenefits2 from '../../../../assets/images/breastfeed_benefits_2.png';
import BreastfeedBenefits3 from '../../../../assets/images/breastfeed_benefits_3.png';
import BreastfeedBenefits4 from '../../../../assets/images/breastfeed_benefits_4.png';
import BreastfeedBenefits5 from '../../../../assets/images/breastfeed_benefits_5.png';
import BreastfeedBenefits6 from '../../../../assets/images/breastfeed_benefits_6.png';

const BreastfeedingBenefits: React.FC = () => {
  const navigation = useNavigation();

  const pages: InfoPageItem[] = [
    {
      id: '1',
      image: BreastfeedBenefits1,
      title: i18n.t('BreastfeedingBenefitsPage.Page1.Title'),
      content: [
        { id: '1', text: i18n.t('BreastfeedingBenefitsPage.Page1.Text1') },
      ],
    },
    {
      id: '2',
      image: BreastfeedBenefits2,
      title: i18n.t('BreastfeedingBenefitsPage.TitleBaby'),
      content: [
        {
          id: '1',
          sectionHeader: i18n.t('BreastfeedingBenefitsPage.Page2.Section1'),
          text: i18n.t('BreastfeedingBenefitsPage.Page2.Text1'),
        },
      ],
    },
    {
      id: '3',
      image: BreastfeedBenefits3,
      title: i18n.t('BreastfeedingBenefitsPage.TitleBaby'),
      content: [
        {
          id: '1',
          sectionHeader: i18n.t('BreastfeedingBenefitsPage.Page3.Section1'),
          text: i18n.t('BreastfeedingBenefitsPage.Page3.Text1'),
        },
        {
          id: '2',
          sectionHeader: i18n.t('BreastfeedingBenefitsPage.Page3.Section2'),
          text: i18n.t('BreastfeedingBenefitsPage.Page3.Text2'),
        },
      ],
    },
    {
      id: '4',
      image: BreastfeedBenefits4,
      title: i18n.t('BreastfeedingBenefitsPage.TitleBaby'),
      content: [
        {
          id: '1',
          sectionHeader: i18n.t('BreastfeedingBenefitsPage.Page4.Section1'),
          text: i18n.t('BreastfeedingBenefitsPage.Page4.Text1'),
        },
        {
          id: '2',
          sectionHeader: i18n.t('BreastfeedingBenefitsPage.Page4.Section2'),
          text: i18n.t('BreastfeedingBenefitsPage.Page4.Text2'),
        },
      ],
    },
    {
      id: '5',
      image: BreastfeedBenefits5,
      title: i18n.t('BreastfeedingBenefitsPage.TitleMom'),
      content: [
        {
          id: '1',
          sectionHeader: i18n.t('BreastfeedingBenefitsPage.Page5.Section1'),
          text: i18n.t('BreastfeedingBenefitsPage.Page5.Text1'),
        },
      ],
    },
    {
      id: '6',
      image: BreastfeedBenefits6,
      title: i18n.t('BreastfeedingBenefitsPage.TitleMom'),
      content: [
        {
          id: '1',
          sectionHeader: i18n.t('BreastfeedingBenefitsPage.Page6.Section1'),
          text: i18n.t('BreastfeedingBenefitsPage.Page6.Text1'),
        },
        {
          id: '2',
          sectionHeader: i18n.t('BreastfeedingBenefitsPage.Page6.Section2'),
          text: i18n.t('BreastfeedingBenefitsPage.Page6.Text2'),
        },
        {
          id: '3',
          sectionHeader: i18n.t('BreastfeedingBenefitsPage.Page6.Section3'),
          text: i18n.t('BreastfeedingBenefitsPage.Page6.Text3'),
        },
      ],
    },
  ];

  function onEnd() {
    navigation.goBack();
  }

  return (
    <InformationPages
      data={pages}
      PageModel={createGenericInfoPage({ onEnd })}
    />
  );
};

export default BreastfeedingBenefits;
