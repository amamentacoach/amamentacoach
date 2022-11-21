import { Action, AppScreen } from '@common/telemetria';
import i18n from 'i18n-js';
import { useEffect } from 'react';

import ImageWrapper from 'components/ImageWrapper';
import { ScrollView } from 'lib/sharedStyles';
import { createTelemetryAction } from 'utils/telemetryAction';

import { ContentText, ContentWrapper } from './styles';

import MilkAdditionalInfoOne from '@assets/images/milk_additional_info_one.webp';
import MilkAdditionalInfoThree from '@assets/images/milk_additional_info_three.webp';
import MilkAdditionalInfoTwo from '@assets/images/milk_additional_info_two.webp';

const MilkAdditionalInformation: React.FC = () => {
  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.MilkAdditionalInformation },
    });
  }, []);

  return (
    <ScrollView>
      <ContentWrapper>
        <ImageWrapper
          height={200}
          resizeMode="contain"
          source={MilkAdditionalInfoOne}
          width="100%"
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
          height={200}
          resizeMode="contain"
          source={MilkAdditionalInfoTwo}
          width="100%"
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
          height={200}
          resizeMode="contain"
          source={MilkAdditionalInfoThree}
          width="100%"
        />
        <ContentText>
          {i18n.t('MilkAdditionalInformationPage.Text5')}
        </ContentText>
        <ContentText>
          {i18n.t('MilkAdditionalInformationPage.Text6')}
        </ContentText>
      </ContentWrapper>
    </ScrollView>
  );
};

export default MilkAdditionalInformation;
