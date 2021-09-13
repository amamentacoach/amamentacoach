import i18n from 'i18n-js';

import theme from 'config/theme';
import { useIsFirstRun } from 'contexts/firstRun';
import AdditionalInformation from 'pages/Home/AdditionalInformation';
import BabyCup from 'pages/Home/BabyCup';
import BabySling from 'pages/Home/BabySling';
import Breastfeeding from 'pages/Home/Breastfeeding';
import BreastfeedingBenefits from 'pages/Home/BreastfeedingBenefits';
import Credits from 'pages/Home/Credits';
import Distractions from 'pages/Home/Distractions';
import EmotionsAndBreastfeeding from 'pages/Home/EmotionsAndBreastfeeding';
import HowLongToBreastfeed from 'pages/Home/HowLongToBreastfeed';
import HowToBreastfeed from 'pages/Home/HowToBreastfeed';
import HU from 'pages/Home/HU';
import IntroductionStatusForm from 'pages/Home/IntroductionStatusForm';
import ManageExpectations from 'pages/Home/ManageExpectations';
import Messages from 'pages/Home/Messages';
import MilkAdditionalInformation from 'pages/Home/MilkAdditionalInformation';
import MusicPlaylists from 'pages/Home/MusicPlaylists';
import NewMessage from 'pages/Home/NewMessage';
import NewQuestion from 'pages/Home/NewQuestion';
import NotWhatIExpected from 'pages/Home/NotWhatIExpected';
import Premature from 'pages/Home/Premature';
import Questions from 'pages/Home/Questions';
import Resilience from 'pages/Home/Resilience';
import StatusForm from 'pages/Home/StatusForm';
import StepByStepPremature from 'pages/Home/StepByStepPremature';
import ThePremature from 'pages/Home/ThePremature';
import UploadBabyPhoto from 'pages/Home/UploadBabyPhoto';
import UploadFatherPhoto from 'pages/Home/UploadFatherPhoto';
import UploadMotherPhoto from 'pages/Home/UploadMotherPhoto';
import WhenToBreastfeed from 'pages/Home/WhenToBreastfeed';
import WhyBreastfeed from 'pages/Home/WhyBreastfeed';
import createColorHeader from 'routes/config/colorHeader';

import type { StackScreens } from 'routes/config/getNavigatorType';

const CreateHomeRoutes = (Stack: StackScreens) => {
  const { isFirstRun } = useIsFirstRun();
  const headerBabyBlue = createColorHeader(theme.babyBlue, 'black');
  const headerBabyGreen = createColorHeader(theme.babyGreen);

  return [
    <Stack.Screen
      key="AdditionalInformation"
      name="AdditionalInformation"
      component={AdditionalInformation}
      options={{ title: i18n.t('HomePage.Option5') }}
    />,
    <Stack.Screen
      key="BabyCup"
      name="BabyCup"
      component={BabyCup}
      options={{ title: i18n.t('PageTitles.2') }}
    />,
    <Stack.Screen
      key="BabySling"
      name="BabySling"
      component={BabySling}
      options={{ title: i18n.t('BabySlingPage.PageName') }}
    />,
    <Stack.Screen
      key="Breastfeeding"
      name="Breastfeeding"
      component={Breastfeeding}
      options={{ title: i18n.t('PageTitles.11') }}
    />,
    <Stack.Screen
      key="BreastfeedingBenefits"
      name="BreastfeedingBenefits"
      component={BreastfeedingBenefits}
      options={{ title: i18n.t('Infograph') }}
    />,
    <Stack.Screen
      key="Distractions"
      name="Distractions"
      component={Distractions}
      options={{ title: i18n.t('EmotionsAndBreastfeedingPage.1') }}
    />,
    <Stack.Screen
      key="EmotionsAndBreastfeeding"
      name="EmotionsAndBreastfeeding"
      component={EmotionsAndBreastfeeding}
      options={{ title: i18n.t('HomePage.Option4') }}
    />,
    <Stack.Screen
      key="HowLongToBreastfeed"
      name="HowLongToBreastfeed"
      component={HowLongToBreastfeed}
      options={{ title: i18n.t('PageTitles.11') }}
    />,
    <Stack.Screen
      key="HowToBreastfeed"
      name="HowToBreastfeed"
      component={HowToBreastfeed}
      options={{ title: i18n.t('PageTitles.11') }}
    />,
    <Stack.Screen
      key="HU"
      name="HU"
      component={HU}
      options={{ title: i18n.t('PageTitles.1') }}
    />,
    <Stack.Screen
      key="ManageExpectations"
      name="ManageExpectations"
      component={ManageExpectations}
      options={{ title: i18n.t('Expectations') }}
    />,
    <Stack.Screen
      key="Messages"
      name="Messages"
      component={Messages}
      options={{ title: i18n.t('PageTitles.3') }}
    />,
    <Stack.Screen
      key="MilkAdditionalInformation"
      name="MilkAdditionalInformation"
      component={MilkAdditionalInformation}
      options={{ title: i18n.t('PageTitles.4') }}
    />,
    <Stack.Screen
      key="MusicPlaylists"
      name="MusicPlaylists"
      component={MusicPlaylists}
      options={{ title: i18n.t('DistractionsPage.3') }}
    />,
    <Stack.Screen
      key="NewMessage"
      name="NewMessage"
      component={NewMessage}
      options={{ title: i18n.t('NewMessagePage.SendMessage') }}
    />,
    <Stack.Screen
      key="NewQuestion"
      name="NewQuestion"
      component={NewQuestion}
      options={{ title: i18n.t('Actions.SendQuestion') }}
    />,
    <Stack.Screen
      key="Credits"
      name="Credits"
      component={Credits}
      options={{ title: i18n.t('HomePage.Option8') }}
    />,
    <Stack.Screen
      key="NotWhatIExpected"
      name="NotWhatIExpected"
      component={NotWhatIExpected}
      options={{ title: i18n.t('PageTitles.5'), ...headerBabyGreen }}
    />,
    <Stack.Screen
      key="Premature"
      name="Premature"
      component={Premature}
      options={{ title: i18n.t('PageTitles.5') }}
    />,
    <Stack.Screen
      key="Questions"
      name="Questions"
      component={Questions}
      options={{ title: i18n.t('HomePage.Option7') }}
    />,
    <Stack.Screen
      key="Resilience"
      name="Resilience"
      component={Resilience}
      options={{ title: i18n.t('PageTitles.6') }}
    />,
    <Stack.Screen
      key="StatusForm"
      name="StatusForm"
      component={
        isFirstRun.persistent.statusFormIntroduction
          ? IntroductionStatusForm
          : StatusForm
      }
      options={
        isFirstRun.persistent.statusFormIntroduction
          ? { title: i18n.t('Survey') }
          : { title: i18n.t('Survey'), ...headerBabyBlue }
      }
    />,
    <Stack.Screen
      key="StepByStepPremature"
      name="StepByStepPremature"
      component={StepByStepPremature}
      options={{ title: i18n.t('Infograph') }}
    />,
    <Stack.Screen
      key="ThePremature"
      name="ThePremature"
      component={ThePremature}
      options={{ title: i18n.t('PageTitles.7') }}
    />,
    <Stack.Screen
      key="UploadBabyPhoto"
      name="UploadBabyPhoto"
      component={UploadBabyPhoto}
      options={{ title: i18n.t('PageTitles.8') }}
    />,
    <Stack.Screen
      key="UploadFatherPhoto"
      name="UploadFatherPhoto"
      component={UploadFatherPhoto}
      options={{ title: i18n.t('PageTitles.9') }}
    />,
    <Stack.Screen
      key="UploadMotherPhoto"
      name="UploadMotherPhoto"
      component={UploadMotherPhoto}
      options={{ title: i18n.t('PageTitles.10') }}
    />,
    <Stack.Screen
      key="WhenToBreastfeed"
      name="WhenToBreastfeed"
      component={WhenToBreastfeed}
      options={{ title: i18n.t('PageTitles.11') }}
    />,
    <Stack.Screen
      key="WhyBreastfeed"
      name="WhyBreastfeed"
      component={WhyBreastfeed}
      options={{ title: i18n.t('PageTitles.11') }}
    />,
  ];
};

export default CreateHomeRoutes;
