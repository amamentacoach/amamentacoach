import { Action, AppScreen } from '@common/telemetria';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { isToday } from 'date-fns';
import i18n from 'i18n-js';
import { useEffect, useState } from 'react';
import { hide } from 'react-native-bootsplash';

import ImageWrapper from 'components/ImageWrapper';
import Modal from 'components/Modal';
import OptionsList from 'components/OptionList';
import theme from 'config/theme';
import { useAuth } from 'contexts/auth';
import { useIsFirstRun } from 'contexts/firstRun';
import { storageIsToday } from 'lib/date-fns';
import { ScrollView } from 'lib/sharedStyles';
import { setHomePageOpened } from 'services/telemetry';
import { UserTypes } from 'services/user';
import { getBestLocale } from 'utils/localize';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { OptionListEntry } from 'components/OptionList';
import type { RootStackProps } from 'routes/app';
import type { PendingForms } from 'services/telemetry';

import {
  ContentContainer,
  ContentHeader,
  Header,
  HeaderBackground,
  HeaderText,
  Banner,
  BannerButtonTextContainer,
  BannerButtonText,
} from './styles';

import HomeBaby from '@assets/images/home_baby.svg';
import HomeBreastfeed from '@assets/images/home_breastfeed.svg';
import HomeCredits from '@assets/images/home_credits.svg';
import HomeEmotions from '@assets/images/home_emotions.svg';
import HomeMessage from '@assets/images/home_message.svg';
import HomeMilk from '@assets/images/home_milk.svg';
import HomeMoreInformation from '@assets/images/home_more_information.svg';
import LogoEN from '@assets/images/logo_white_en.svg';
import LogoPT from '@assets/images/logo_white_pt.svg';

interface FormsModal {
  isVisible: boolean;
  action: PendingForms;
}

const Home: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const isFocused = useIsFocused();
  const { userInfo } = useAuth();
  const { isFirstRun, setTemporaryNotFirstRun } = useIsFirstRun();
  const { languageTag } = getBestLocale();
  const [formsModalData, setFormsModalData] = useState<FormsModal>({
    action: null,
    isVisible: false,
  });
  const [expectationsModalVisibility, setExpectationsModalVisibility] =
    useState<Boolean>(false);

  const Logo = languageTag === 'pt' ? LogoPT : LogoEN;

  const options: OptionListEntry[] = [
    {
      image: { source: HomeBaby, height: 100, width: 100 },
      title: i18n.t('HomePage.Option1'),
      onPress: () => navigation.navigate('Premature'),
    },
    {
      image: { source: HomeBreastfeed, height: 100, width: 100 },
      title: i18n.t('HomePage.Option2'),
      onPress: () => navigation.navigate('StepByStepPremature'),
    },
    {
      image: { source: HomeMilk, height: 100, width: 100 },
      title: i18n.t('HomePage.Option3'),
      onPress: () => navigation.navigate('Breastfeeding'),
    },
    {
      image: { source: HomeEmotions, height: 100, width: 100 },
      title: i18n.t('HomePage.Option4'),
      onPress: () => navigation.navigate('EmotionsAndBreastfeeding'),
    },
    {
      image: { source: HomeMoreInformation, height: 100, width: 100 },
      title: i18n.t('HomePage.Option5'),
      onPress: () => navigation.navigate('AdditionalInformation'),
    },
    {
      image: { source: HomeMessage, height: 100, width: 100 },
      title: i18n.t('HomePage.Option6'),
      onPress: () => navigation.navigate('Messages'),
    },
    {
      image: { source: HomeMessage, height: 100, width: 100 },
      title: i18n.t('HomePage.Option7'),
      onPress: () => navigation.navigate('Questions'),
    },
    {
      image: { source: HomeCredits, height: 100, width: 100 },
      title: i18n.t('HomePage.Option8'),
      onPress: () => navigation.navigate('Credits'),
    },
  ];

  // Exibe a escala apenas se for mãe.
  if (userInfo.type === UserTypes.MOTHER) {
    options.splice(5, 0, {
      image: { source: HomeCredits, height: 100, width: 100 },
      title: i18n.t('StatusFormPage.FormName', { count: 1 }),
      onPress: () => navigation.navigate('StatusForm', { situation: null }),
    });
  }
  // Exibe um botão para informar o nascimento do bebê se for gestante.
  if (userInfo.type === UserTypes.PREGNANT) {
    options.splice(5, 0, {
      image: { source: HomeCredits, height: 100, width: 100 },
      title: i18n.t('HomePage.UpdateBabyBirthStatus.Text'),
      subtitle: i18n.t('HomePage.UpdateBabyBirthStatus.Subtext'),
      onPress: () => navigation.navigate('BabyBirthStatusUpdate'),
    });
  }

  useEffect(() => {
    // Envia uma mensagem de telemetria que o usuário abriu o aplicativo e verifica se algum
    // formulário deve ser preenchido.
    async function checkForms(): Promise<void> {
      const action = await setHomePageOpened();
      if (action) {
        setFormsModalData({
          action,
          isVisible: true,
        });
      }
    }

    // Verifica se o usuário acessou a tela de expectativas hoje.
    async function checkExpectations(): Promise<void> {
      const openedToday = await storageIsToday(
        '@AmamentaCoach:alreadySelectedExpectations',
        storage => storage.lastRunDate,
      );
      if (!openedToday) {
        setExpectationsModalVisibility(true);
      }
    }

    // Verifica a última data que o aplicativo foi aberto. Se um dia tiver passado ou é a primeira
    // vez abrindo o app.
    async function checkUserActions(): Promise<void> {
      setTemporaryNotFirstRun('home');
      const storageString = await AsyncStorage.getItem(
        '@AmamentaCoach:lastOpenedDate',
      );
      // Verifica se a última data de acesso foi hoje.
      const alreadyDisplayedToday = storageString
        ? isToday(new Date(storageString))
        : false;

      if (!alreadyDisplayedToday) {
        // Caso não seja a primeira vez utilizando o app.
        if (storageString) {
          // Apresenta o popup para visitar a tela de expectativas.
          checkExpectations();
          // Verifica se algum formulário deve ser respondido
          checkForms();
        }

        // Atualiza a data do último acesso ao app.
        AsyncStorage.setItem(
          '@AmamentaCoach:lastOpenedDate',
          new Date().toISOString(),
        );
      }
    }

    // Executa pela primeira vez ao abrir o aplicativo
    if (isFirstRun.temporary.home) {
      checkUserActions();
    }
    hide({ duration: 250 });
  }, []);

  useEffect(() => {
    // Cria um registro de telemetria quando o usuário acessa a página.
    if (isFocused) {
      createTelemetryAction({
        action: Action.Opened,
        context: { screen: AppScreen.HomeMenu },
      });
    }
  }, [isFocused]);

  // Fecha todos os modais.
  function hideAllModals(): void {
    setExpectationsModalVisibility(false);
    setFormsModalData({
      action: null,
      isVisible: false,
    });
  }

  return (
    <>
      <Modal
        color={theme.babyPink}
        content={i18n.t('HomePage.ExpectationPopUp')}
        options={[
          {
            text: i18n.t('Yes'),
            onPress: () => {
              hideAllModals();
              navigation.navigate('ManageExpectations');
            },
          },
          {
            text: i18n.t('No'),
            onPress: () => setExpectationsModalVisibility(false),
          },
        ]}
        visible={expectationsModalVisibility && !formsModalData.isVisible}
      />
      <Modal
        color={theme.babyPink}
        content={
          formsModalData.action === '1D'
            ? i18n.t('HomePage.FirstStatusPopup')
            : i18n.t('HomePage.StatusPopup')
        }
        options={[
          {
            text: i18n.t('Yes'),
            onPress: () => {
              hideAllModals();
              navigation.navigate('StatusForm', {
                situation: formsModalData.action,
              });
            },
          },
          {
            text: i18n.t('No'),
            onPress: () =>
              setFormsModalData({ action: null, isVisible: false }),
          },
        ]}
        visible={formsModalData.isVisible}
      />
      <ScrollView>
        <Header>
          <HeaderBackground>
            <HeaderText>{i18n.t('Begin')}</HeaderText>
            <Banner activeOpacity={1} onPress={() => navigation.navigate('HU')}>
              <ImageWrapper height={100} resizeMode="contain" source={Logo} />
              <BannerButtonTextContainer>
                <BannerButtonText>
                  {i18n.t('HomePage.BannerButton')}
                </BannerButtonText>
              </BannerButtonTextContainer>
            </Banner>
          </HeaderBackground>
        </Header>
        <ContentContainer>
          <ContentHeader>{i18n.t('Content')}</ContentHeader>
          <OptionsList options={options} />
        </ContentContainer>
      </ScrollView>
    </>
  );
};

export default Home;
