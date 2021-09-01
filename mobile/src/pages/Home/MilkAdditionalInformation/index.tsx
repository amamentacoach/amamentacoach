import React from 'react';

import i18n from 'i18n-js';

import ImageWrapper from '../../../components/ImageWrapper';

import { ContentText, ContentWrapper, ScrollView } from './styles';

import MilkAdditionalInfoOne from '../../../../assets/images/milk_additional_info_one.png';
import MilkAdditionalInfoThree from '../../../../assets/images/milk_additional_info_three.png';
import MilkAdditionalInfoTwo from '../../../../assets/images/milk_additional_info_two.png';

const MilkAdditionalInformation: React.FC = () => {
  return (
    <ScrollView>
      <ContentWrapper>
        <ImageWrapper
          source={MilkAdditionalInfoOne}
          resizeMode="contain"
          width="100%"
          height={200}
        />
        <ContentText>
          {i18n.t('MilkAdditionalInformationPage.Text1')}
        </ContentText>
        <ContentText>
          {i18n.t('MilkAdditionalInformationPage.Text2')}
        </ContentText>
      </ContentWrapper>
      <ContentWrapper>
        <ImageWrapper
          source={MilkAdditionalInfoTwo}
          resizeMode="contain"
          width="100%"
          height={200}
        />
        <ContentText>
          {i18n.t('MilkAdditionalInformationPage.Text3')}
        </ContentText>
        <ContentText>
          {i18n.t('MilkAdditionalInformationPage.Text4')}
        </ContentText>
      </ContentWrapper>
      <ContentWrapper>
        <ImageWrapper
          source={MilkAdditionalInfoThree}
          resizeMode="contain"
          width="100%"
          height={200}
        />
        <ContentText>
          {i18n.t('MilkAdditionalInformationPage.Text5')}
        </ContentText>
        <ContentText>
          {i18n.t('MilkAdditionalInformationPage.Text6')}
        </ContentText>
        <ContentText>
          {i18n.t('MilkAdditionalInformationPage.Text7')}
        </ContentText>
      </ContentWrapper>
    </ScrollView>
  );
};

export default MilkAdditionalInformation;
