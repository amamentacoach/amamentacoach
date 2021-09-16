export enum Action {
  // Uma tela foi acessada.
  Opened,
  // Um botão foi pressionado.
  Pressed,
}

// Telas existentes no aplicativo, usado para mapear cada tela a um id único, facilitando a
// alteração e remoção de telas caso necessário. Ademais, padroniza os valores disponíveis para
// telemetria.
export enum AppScreen {
  AcceptTermsOfService,
  AdditionalInformation,
  BabyCup,
  BabyForm,
  BabySling,
  Breastfeeding,
  BreastfeedingBenefits,
  Credits,
  DiaryActions,
  DiaryBaby,
  DiaryBreastfeed,
  DiaryIntroduction,
  DiaryMenu,
  DiaryRegistry,
  Distractions,
  EmotionsAndBreastfeeding,
  Feelings,
  ForgotPassword,
  Goals,
  HelpReceived,
  HomeMenu,
  HowLongToBreastfeed,
  HowToBreastfeed,
  HU,
  Introduction,
  IntroductionStatusForm,
  LeaveResearch,
  Login,
  ManageExpectations,
  MenuTermsOfService,
  Messages,
  MilkAdditionalInformation,
  MotherForm,
  MusicPlaylists,
  NewBreastfeedEntry,
  NewDiaryRegistry,
  NewMessage,
  NewPassword,
  NewQuestion,
  NotWhatIExpected,
  Premature,
  ProfileMenu,
  Questions,
  ReadTermsOfService,
  Report,
  Resilience,
  SignUp,
  StatusForm,
  StepByStepPremature,
  SurveyBreastfeed,
  SurveyFather,
  SurveyHelp,
  SurveyMenu,
  SurveyMotivation,
  SurveyStatistics,
  ThePremature,
  UploadBabyPhoto,
  UploadFatherPhoto,
  UploadMotherPhoto,
  VideoPage,
  WhenToBreastfeed,
  WhyBreastfeed,
}

interface Context {
  // Tela onde a informação de telemetria ocorreu.
  screen: AppScreen;
  // Caso a telemetria seja específica a uma ação em uma página envia o texto da ação.
  // Ex: Caso um botão seja pressionado o seu texto é enviado.
  target?: string;
}

export interface TelemetryPayload {
  // Ação que foi realizada.
  action: Action;
  // Contexto da ação.
  context: Context;
  // Data de criação da telemetria.
  created_at: Date;
}
