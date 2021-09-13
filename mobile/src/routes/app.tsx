import { createStackNavigator } from '@react-navigation/stack';
import i18n from 'i18n-js';

import VideoPage from 'pages/Generic/VideoPage';
import createDiaryRoutes from 'routes/app/diary';
import createHomeRoutes from 'routes/app/home';
import createProfileRoutes from 'routes/app/profile';
import createSurveyRoutes from 'routes/app/survey';
import TabNavigator from 'routes/tabNavigator';

import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import BackIcon from '@assets/images/icons/ic_back.svg';

export type RootStackParamList = {
  TabNavigator: undefined;
  Home: undefined;
  Diary: undefined;
  Survey: undefined;
  Profile: undefined;
  VideoPage: {
    videos: string[];
  };
  AdditionalInformation: undefined;
  BabyCup: undefined;
  BabySling: undefined;
  Breastfeeding: undefined;
  BreastfeedingBenefits: undefined;
  Distractions: undefined;
  EmotionsAndBreastfeeding: undefined;
  HowLongToBreastfeed: undefined;
  HowToBreastfeed: undefined;
  HU: undefined;
  ManageExpectations: undefined;
  Messages: undefined;
  MilkAdditionalInformation: undefined;
  MusicPlaylists: undefined;
  NewMessage: undefined;
  NewQuestion: undefined;
  Credits: undefined;
  NotWhatIExpected: undefined;
  Premature: undefined;
  Questions: undefined;
  Resilience: undefined;
  StatusForm: { situation: 'ALTA' | '1D' | '15D' | '1M' };
  StepByStepPremature: undefined;
  ThePremature: undefined;
  UploadBabyPhoto: undefined;
  UploadFatherPhoto: undefined;
  UploadMotherPhoto: undefined;
  WhenToBreastfeed: undefined;
  WhyBreastfeed: undefined;
  DiaryActions: undefined;
  DiaryBaby: undefined;
  DiaryRegistry: { date: string } | undefined;
  Feelings: undefined;
  Goals: undefined;
  HelpReceived: undefined;
  NewBreastfeedEntry: undefined;
  NewDiaryRegistry: undefined;
  Report: undefined;
  NewPassword: undefined;
  MenuTermsOfService: undefined;
  ReadTermsOfService: undefined;
  LeaveResearch: undefined;
  SurveyBreastfeed: undefined;
  SurveyFather: undefined;
  SurveyHelp: undefined;
  SurveyMotivation: undefined;
  SurveyStatistics: undefined;
  DiaryBreastfeed: { date: string } | undefined;
};

export type RootStackProps = StackNavigationProp<RootStackParamList>;

export type RootRouteProp<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;

const AppRoutes: React.FC = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackImage: ({ tintColor }) => <BackIcon color={tintColor} />,
      }}>
      <Stack.Screen
        key="TabNavigator"
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      {createHomeRoutes(Stack)}
      {createDiaryRoutes(Stack)}
      {createSurveyRoutes(Stack)}
      {createProfileRoutes(Stack)}
      <Stack.Screen
        key="VideoPage"
        name="VideoPage"
        component={VideoPage}
        options={{ title: i18n.t('Video') }}
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;
