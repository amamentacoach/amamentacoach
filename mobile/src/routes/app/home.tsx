import i18n from 'i18n-js';

import theme from 'config/theme';
import { useIsFirstRun } from 'contexts/firstRun';
import AdditionalInformation from 'pages/Home/AdditionalInformation';
import BabyBirthStatusUpdate from 'pages/Home/BabyBirthStatusUpdate';
import BabyCup from 'pages/Home/BabyCup';
import BabyLocationUpdate from 'pages/Home/BabyLocationUpdate';
import BabySling from 'pages/Home/BabySling';
import Breastfeeding from 'pages/Home/Breastfeeding';
import BreastfeedingBenefits from 'pages/Home/BreastfeedingBenefits';
import Credits from 'pages/Home/Credits';
import Distractions from 'pages/Home/Distractions';
import EmotionsAndBreastfeeding from 'pages/Home/EmotionsAndBreastfeeding';
import FeedingForm from 'pages/Home/FeedingForm';
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

const CreateHomeRoutes = (Stack: StackScreens): JSX.Element[] => {
  const { isFirstRun } = useIsFirstRun();
  const headerBabyBlue = createColorHeader(theme.babyBlue, 'black');
  const headerBabyGreen = createColorHeader(theme.babyGreen);

  return [
    <Stack.Screen
      component={AdditionalInformation}
      key="AdditionalInformation"
      name="AdditionalInformation"
      options={{ title: i18n.t('HomePage.Option5') }}
    />,
    <Stack.Screen
      component={BabyBirthStatusUpdate}
      key="BabyBirthStatusUpdate"
      name="BabyBirthStatusUpdate"
      options={{ title: i18n.t('BabyBirthStatusUpdate.PageName') }}
    />,
    <Stack.Screen
      component={BabyCup}
      key="BabyCup"
      name="BabyCup"
      options={{ title: i18n.t('PageTitles.2') }}
    />,
    <Stack.Screen
      component={BabyLocationUpdate}
      key="BabyLocationUpdate"
      name="BabyLocationUpdate"
      options={{ title: i18n.t('BabyLocationUpdate.PageName') }}
    />,
    <Stack.Screen
      component={BabySling}
      key="BabySling"
      name="BabySling"
      options={{ title: i18n.t('BabySlingPage.PageName') }}
    />,
    <Stack.Screen
      component={Breastfeeding}
      key="Breastfeeding"
      name="Breastfeeding"
      options={{ title: i18n.t('PageTitles.11') }}
    />,
    <Stack.Screen
      component={BreastfeedingBenefits}
      key="BreastfeedingBenefits"
      name="BreastfeedingBenefits"
      options={{ title: i18n.t('Infograph') }}
    />,
    <Stack.Screen
      component={Distractions}
      key="Distractions"
      name="Distractions"
      options={{ title: i18n.t('EmotionsAndBreastfeedingPage.1') }}
    />,
    <Stack.Screen
      component={EmotionsAndBreastfeeding}
      key="EmotionsAndBreastfeeding"
      name="EmotionsAndBreastfeeding"
      options={{ title: i18n.t('HomePage.Option4') }}
    />,
    <Stack.Screen
      component={FeedingForm}
      key="FeedingForm"
      name="FeedingForm"
      options={{
        title: i18n.t('FeedingFormPage.FormName', { count: 1 }),
        ...headerBabyBlue,
      }}
    />,
    <Stack.Screen
      component={HowLongToBreastfeed}
      key="HowLongToBreastfeed"
      name="HowLongToBreastfeed"
      options={{ title: i18n.t('PageTitles.11') }}
    />,
    <Stack.Screen
      component={HowToBreastfeed}
      key="HowToBreastfeed"
      name="HowToBreastfeed"
      options={{ title: i18n.t('PageTitles.11') }}
    />,
    <Stack.Screen
      component={HU}
      key="HU"
      name="HU"
      options={{ title: i18n.t('PageTitles.1') }}
    />,
    <Stack.Screen
      component={ManageExpectations}
      key="ManageExpectations"
      name="ManageExpectations"
      options={{ title: i18n.t('Expectations') }}
    />,
    <Stack.Screen
      component={Messages}
      key="Messages"
      name="Messages"
      options={{ title: i18n.t('PageTitles.3') }}
    />,
    <Stack.Screen
      component={MilkAdditionalInformation}
      key="MilkAdditionalInformation"
      name="MilkAdditionalInformation"
      options={{ title: i18n.t('PageTitles.4') }}
    />,
    <Stack.Screen
      component={MusicPlaylists}
      key="MusicPlaylists"
      name="MusicPlaylists"
      options={{ title: i18n.t('DistractionsPage.3') }}
    />,
    <Stack.Screen
      component={NewMessage}
      key="NewMessage"
      name="NewMessage"
      options={{ title: i18n.t('NewMessagePage.SendMessage') }}
    />,
    <Stack.Screen
      component={NewQuestion}
      key="NewQuestion"
      name="NewQuestion"
      options={{ title: i18n.t('Actions.SubmitQuestion') }}
    />,
    <Stack.Screen
      component={Credits}
      key="Credits"
      name="Credits"
      options={{ title: i18n.t('HomePage.Option8') }}
    />,
    <Stack.Screen
      component={NotWhatIExpected}
      key="NotWhatIExpected"
      name="NotWhatIExpected"
      options={{ title: i18n.t('PageTitles.5'), ...headerBabyGreen }}
    />,
    <Stack.Screen
      component={Premature}
      key="Premature"
      name="Premature"
      options={{ title: i18n.t('PageTitles.5') }}
    />,
    <Stack.Screen
      component={Questions}
      key="Questions"
      name="Questions"
      options={{ title: i18n.t('HomePage.Option7') }}
    />,
    <Stack.Screen
      component={Resilience}
      key="Resilience"
      name="Resilience"
      options={{ title: i18n.t('PageTitles.6') }}
    />,
    <Stack.Screen
      component={
        isFirstRun.persistent.statusFormIntroduction
          ? IntroductionStatusForm
          : StatusForm
      }
      key="StatusForm"
      name="StatusForm"
      options={
        isFirstRun.persistent.statusFormIntroduction
          ? { title: i18n.t('StatusFormPage.FormName', { count: 1 }) }
          : {
              title: i18n.t('StatusFormPage.FormName', { count: 1 }),
              ...headerBabyBlue,
            }
      }
    />,
    <Stack.Screen
      component={StepByStepPremature}
      key="StepByStepPremature"
      name="StepByStepPremature"
      options={{ title: i18n.t('Infograph') }}
    />,
    <Stack.Screen
      component={ThePremature}
      key="ThePremature"
      name="ThePremature"
      options={{ title: i18n.t('PageTitles.7') }}
    />,
    <Stack.Screen
      component={UploadBabyPhoto}
      key="UploadBabyPhoto"
      name="UploadBabyPhoto"
      options={{ title: i18n.t('PageTitles.8') }}
    />,
    <Stack.Screen
      component={UploadFatherPhoto}
      key="UploadFatherPhoto"
      name="UploadFatherPhoto"
      options={{ title: i18n.t('PageTitles.9') }}
    />,
    <Stack.Screen
      component={UploadMotherPhoto}
      key="UploadMotherPhoto"
      name="UploadMotherPhoto"
      options={{ title: i18n.t('PageTitles.10') }}
    />,
    <Stack.Screen
      component={WhenToBreastfeed}
      key="WhenToBreastfeed"
      name="WhenToBreastfeed"
      options={{ title: i18n.t('PageTitles.11') }}
    />,
    <Stack.Screen
      component={WhyBreastfeed}
      key="WhyBreastfeed"
      name="WhyBreastfeed"
      options={{ title: i18n.t('PageTitles.11') }}
    />,
  ];
};

export default CreateHomeRoutes;
