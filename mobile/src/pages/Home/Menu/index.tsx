import { Action, AppScreen } from '@common/telemetria';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { hide } from 'react-native-bootsplash';

import FormPickerInput from 'components/FormPickerInput';
import Modal from 'components/Modal';
import OptionsList from 'components/OptionList';
import theme from 'config/theme';
import { useIsFirstRun } from 'contexts/firstRun';
import { storageIsToday } from 'lib/date-fns';
import { ScrollView } from 'lib/sharedStyles';
import { checkBabiesLocation, updateBabyLocation } from 'services/babyLocation';
import { setHomePageOpened } from 'services/telemetry';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { OptionListEntry } from 'components/OptionList';
import type { RootStackProps } from 'routes/app';
import type { BabyStatus } from 'services/babyLocation';

import {
  BannerImage,
  ContentContainer,
  ContentHeader,
  Header,
  HeaderBackground,
  HeaderText,
  HUButton,
  HUButtonText,
  InnerCircle,
  LocationContainer,
  ModalOption,
  OuterCircle,
  TextModal,
} from './styles';

import HomeBaby from '@assets/images/home_baby.svg';
import Banner from '@assets/images/home_banner.png';
import HomeBreastfeed from '@assets/images/home_breastfeed.svg';
import HomeCredits from '@assets/images/home_credits.svg';
import HomeEmotions from '@assets/images/home_emotions.svg';
import HomeMessage from '@assets/images/home_message.svg';
import HomeMilk from '@assets/images/home_milk.svg';
import HomeMoreInformation from '@assets/images/home_more_information.svg';

interface BabyModalOption {
  newLocation: string;
  selected: boolean;
}

const Home: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const { isFirstRun, setTemporaryNotFirstRun } = useIsFirstRun();
  const isFocused = useIsFocused();
  const [babiesData, setBabiesData] = useState<BabyStatus[]>([]);
  const [babyModalVisibility, setBabyModalVisibility] =
    useState<boolean>(false);
  const [selectedModalOptions, setSelectedModalOptions] = useState<
    BabyModalOption[]
  >([]);

  const [formModalVisibility, setFormModalVisibility] =
    useState<boolean>(false);
  const [formAction, setFormAction] = useState<'1D' | '15D' | '1M' | null>(
    null,
  );

  const [expectationsModalVisibility, setExpectationsModalVisibility] =
    useState<Boolean>(false);

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
      image: { source: HomeCredits, height: 100, width: 100 },
      title: i18n.t('StatusFormPage.FormName', { count: 1 }),
      onPress: () => navigation.navigate('StatusForm', { situation: null }),
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

  useEffect(() => {
    // Busca bebês que podem receber alta e exibe os modais necessários.
    async function checkBabies(): Promise<void> {
      const babiesToCheck = await checkBabiesLocation();
      if (babiesToCheck) {
        setSelectedModalOptions(
          babiesToCheck.map(() => ({
            selected: false,
            newLocation: '',
          })),
        );
        setBabyModalVisibility(true);
        setBabiesData(babiesToCheck);
      }
    }

    // Envia uma mensagem de telemetria que o usuário abriu o aplicativo e verifica se algum
    // formulário deve ser preenchido.
    async function checkForms(): Promise<void> {
      const action = await setHomePageOpened();
      if (action) {
        setFormAction(action);
        setFormModalVisibility(true);
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
    // vez abrindo o app é buscado os bebês que podem receber alta.
    async function checkUserActions(): Promise<void> {
      // Menos de um dia se passou.
      if (await storageIsToday('@AmamentaCoach:lastOpenedDate')) {
        return;
      }

      // Verifica se algum formulário deve ser respondido
      await checkForms();
      // Verifica se algum bebê pode receber alta.
      await checkBabies();
      // Verifica se o usuário já abriu as expectativas hoje.
      await checkExpectations();

      await AsyncStorage.setItem(
        '@AmamentaCoach:lastOpenedDate',
        new Date().toISOString(),
      );
      setTemporaryNotFirstRun('home');
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
    setBabyModalVisibility(false);
    setExpectationsModalVisibility(false);
    setFormModalVisibility(false);
  }

  // Fecha os modais, marca que os bebês selecionados tiveram alta e navega para o formulário.
  function handleUpdateBabyLocation(): void {
    hideAllModals();
    babiesData.forEach(async (baby, index) => {
      await updateBabyLocation(
        baby.id,
        selectedModalOptions[index].newLocation,
      );
    });
    navigation.navigate('StatusForm', {
      situation: 'ALTA',
    });
  }

  // Seleciona um bebê no modal.
  function handleBabySelected(index: number): void {
    const selected = [...selectedModalOptions];
    selected[index].selected = !selected[index].selected;
    if (!selected[index].selected) {
      selected[index].newLocation = '';
    }
    setSelectedModalOptions(selected);
  }

  // Atualiza o valor da localização de um bebê selecionado.
  function handleBabyLocationSelected(index: number, value: string): void {
    const values = [...selectedModalOptions];
    values[index].newLocation = value;
    setSelectedModalOptions(values);
  }

  // Checa se pelo menos um bebê foi selecionado e sua nova localização fornecida.
  function validateModalFields(): boolean {
    const atLeastOneSelected = selectedModalOptions.some(op => op.selected);
    const selectedAreValid = selectedModalOptions.every(op =>
      op.selected ? op.newLocation : !op.selected,
    );
    return atLeastOneSelected && selectedAreValid;
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
        visible={
          expectationsModalVisibility &&
          !babyModalVisibility &&
          !formModalVisibility
        }
      />
      <Modal
        color={theme.babyPink}
        content={
          formAction === '1D'
            ? i18n.t('HomePage.FirstStatusPopup')
            : i18n.t('HomePage.StatusPopup')
        }
        options={[
          {
            text: i18n.t('Yes'),
            onPress: () => {
              hideAllModals();
              navigation.navigate('StatusForm', {
                situation: formAction,
              });
            },
          },
          {
            text: i18n.t('No'),
            onPress: () => setFormModalVisibility(false),
          },
        ]}
        visible={formModalVisibility}
      />
      {babiesData.length > 0 && (
        <Modal
          color={theme.babyPurple}
          options={[
            {
              text: i18n.t('Yes'),
              disabled: !validateModalFields(),
              onPress: handleUpdateBabyLocation,
            },
            {
              text: i18n.t('No'),
              onPress: () => setBabyModalVisibility(false),
            },
          ]}
          visible={babyModalVisibility && !formModalVisibility}>
          <View>
            <TextModal>{i18n.t('HomePage.BabyStatusPopUp')}</TextModal>
            {babiesData.map((baby, index) => (
              <View key={baby.id}>
                <ModalOption
                  activeOpacity={0.7}
                  onPress={() => handleBabySelected(index)}>
                  <OuterCircle selected={selectedModalOptions[index].selected}>
                    <InnerCircle
                      selected={selectedModalOptions[index].selected}
                    />
                  </OuterCircle>
                  <TextModal key={baby.id}>{baby.name}</TextModal>
                </ModalOption>

                {selectedModalOptions[index].selected && (
                  <LocationContainer>
                    <FormPickerInput
                      fieldName=""
                      options={[
                        i18n.t('Lodging'),
                        i18n.t('Home'),
                        i18n.t('UCI'),
                      ]}
                      placeholder={i18n.t('HomePage.BabyLocation')}
                      onChange={(_, value) =>
                        handleBabyLocationSelected(index, value)
                      }
                    />
                  </LocationContainer>
                )}
              </View>
            ))}
          </View>
        </Modal>
      )}

      <ScrollView>
        <Header>
          <HeaderBackground>
            <HeaderText>{i18n.t('Begin')}</HeaderText>
          </HeaderBackground>
          <BannerImage source={Banner}>
            <HUButton
              activeOpacity={0.7}
              onPress={() => navigation.navigate('HU')}>
              <HUButtonText>{i18n.t('HomePage.HUButton')}</HUButtonText>
            </HUButton>
          </BannerImage>
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
