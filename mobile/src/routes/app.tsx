import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import i18n from 'i18n-js';

import VideoPage from 'pages/Generic/VideoPage';
import createDiaryRoutes from 'routes/app/diary';
import createHomeRoutes from 'routes/app/home';
import createProfileRoutes from 'routes/app/profile';
import createSurveyRoutes from 'routes/app/survey';
import TabNavigator from 'routes/tabNavigator';

import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { StatusFormSituation } from 'services/survey';

import BackIcon from '@assets/images/icons/ic_back.svg';

// Parâmetros aceitos por cada tela do aplicativo.
export type RootStackParamList = {
  AdditionalInformation: undefined;
  BabyCup: undefined;
  BabySling: undefined;
  BreastfeedingBenefits: undefined;
  Breastfeeding: undefined;
  Credits: undefined;
  DiaryActions: undefined;
  DiaryBaby: undefined;
  DiaryBreastfeed: { date: string } | undefined;
  DiaryRegistry: { date: string } | undefined;
  Diary: undefined;
  Distractions: undefined;
  EmotionsAndBreastfeeding: undefined;
  Feelings: undefined;
  Goals: undefined;
  HelpReceived: undefined;
  Home: undefined;
  HowLongToBreastfeed: undefined;
  HowToBreastfeed: undefined;
  HU: undefined;
  LeaveResearch: undefined;
  ManageExpectations: undefined;
  MenuTermsOfService: undefined;
  Messages: undefined;
  MilkAdditionalInformation: undefined;
  MusicPlaylists: undefined;
  NewBreastfeedEntry: undefined;
  NewDiaryRegistry: undefined;
  NewMessage: undefined;
  NewPassword: undefined;
  NewQuestion: undefined;
  NotWhatIExpected: undefined;
  Premature: undefined;
  Profile: undefined;
  Questions: undefined;
  ReadTermsOfService: undefined;
  Report: undefined;
  Resilience: undefined;
  StatusForm: { situation: StatusFormSituation };
  StepByStepPremature: undefined;
  SurveyBreastfeed: undefined;
  SurveyFather: undefined;
  SurveyHelp: undefined;
  SurveyMotivation: undefined;
  SurveyStatistics: undefined;
  Survey: undefined;
  TabNavigator: undefined;
  ThePremature: undefined;
  UploadBabyPhoto: undefined;
  UploadFatherPhoto: undefined;
  UploadMotherPhoto: undefined;
  VideoPage: {
    videos: string[];
  };
  WhenToBreastfeed: undefined;
  WhyBreastfeed: undefined;
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
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
        options={{ title: i18n.t('Video', { count: 1 }) }}
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;
