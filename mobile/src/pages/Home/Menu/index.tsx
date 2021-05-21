import React, { useEffect, useState } from 'react';
import { View, Image as ReactImage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import moment from 'moment';
import 'moment/locale/pt-br';

import { checkOneDayPassed } from '../../../utils/date';
import { OptionList } from '../../../components/OptionList';
import theme from '../../../config/theme';
import { useIsFirstRun } from '../../../contexts/firstRun';
import FormPickerInput from '../../../components/FormPickerInput';
import { setHomePageOpened } from '../../../services/telemetry';
import {
  checkBabiesLocation,
  BabyStatus,
  updateBabyLocation,
} from '../../../services/babyLocation';
import Modal from '../../../components/Modal';

import {
  ScrollView,
  Header,
  HeaderText,
  HUButton,
  HUButtonText,
  ContentContainer,
  ContentHeader,
  ContentOption,
  HeaderBackground,
  BannerImage,
  ContentTitle,
  ContentSeparator,
  Option,
  ContentTextContainer,
  TextModal,
  InnerCircle,
  OuterCircle,
  ModalOption,
  LocationContainer,
} from './styles';

import Banner from '../../../../assets/images/home_banner.png';
import HomeBaby from '../../../../assets/images/home_baby.svg';
import HomeBreastfeed from '../../../../assets/images/home_breastfeed.svg';
import HomeMilk from '../../../../assets/images/home_milk.svg';
import HomeEmotions from '../../../../assets/images/home_emotions.svg';
import HomeMoreInformation from '../../../../assets/images/home_more_information.svg';
import HomeMessage from '../../../../assets/images/home_message.svg';

interface BabyModalOption {
  newLocation: string;
  selected: boolean;
}

const Home: React.FC = () => {
  const navigation = useNavigation();
  const { isFirstRun, setTemporaryNotFirstRun } = useIsFirstRun();

  const [babiesData, setBabiesData] = useState<BabyStatus[]>([]);
  const [babyModalVisibility, setBabyModalVisibility] = useState<boolean>(
    false,
  );
  const [selectedModalOptions, setSelectedModalOptions] = useState<
    BabyModalOption[]
  >([]);

  const [formModalVisibility, setFormModalVisibility] = useState<boolean>(
    false,
  );
  const [formAction, setFormAction] = useState<string>('');

  const [
    expectationsModalVisibility,
    setExpectationsModalVisibility,
  ] = useState<Boolean>(false);

  const options: OptionList[] = [
    {
      Image: HomeBaby,
      title: 'Olá, sou o prematuro',
      onPress: () => navigation.navigate('Premature'),
    },
    {
      Image: HomeBreastfeed,
      title: 'Passo a passo para amamentar o prematuro',
      onPress: () => navigation.navigate('StepByStepPremature'),
    },
    {
      Image: HomeMilk,
      title: 'A retirada do leite',
      onPress: () => navigation.navigate('Breastfeeding'),
    },
    {
      Image: HomeEmotions,
      title: 'Emoções e Amamentação ',
      onPress: () => navigation.navigate('EmotionsAndBreastfeeding'),
    },
    {
      Image: HomeMoreInformation,
      title: 'Você sabia?',
      onPress: () => navigation.navigate('AdditionalInformation'),
    },
    {
      Image: HomeMessage,
      title: 'Depoimento das mamães',
      onPress: () => navigation.navigate('Messages'),
    },
    {
      Image: HomeMessage,
      title: 'Perguntas',
      onPress: () => navigation.navigate('Questions'),
    },
  ];

  useEffect(() => {
    // Busca bebês que podem receber alta e exibe os modais necessários.
    async function checkBabies() {
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
    async function checkForms() {
      const action = await setHomePageOpened();
      if (action) {
        setFormAction(action);
        setFormModalVisibility(true);
      }
    }

    // Verifica se o usuário acessou a tela de expectativas hoje.
    async function checkExpectations() {
      const expectationsStorage = await AsyncStorage.getItem(
        '@AmamentaCoach:alreadySelectedExpectations',
      );
      if (!expectationsStorage) {
        setExpectationsModalVisibility(true);
        return;
      }

      const { lastRunDate } = JSON.parse(expectationsStorage);
      if (moment().diff(moment(lastRunDate), 'days') >= 1) {
        setExpectationsModalVisibility(true);
      }
    }

    // Verifica a última data que o aplicativo foi aberto. Se um dia tiver passado ou é a primeira
    // vez abrindo o app é buscado os bebês que podem receber alta.
    async function checkUserActions() {
      // Menos de um dia se passou.
      if (!checkOneDayPassed('@AmamentaCoach:lastOpenedDate')) {
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
    RNBootSplash.hide({ duration: 250 });
  }, []);

  // Fecha todos os modais.
  function hideAllModals() {
    setBabyModalVisibility(false);
    setExpectationsModalVisibility(false);
    setFormModalVisibility(false);
  }

  // Fecha os modais, marca que os bebês selecionados tiveram alta e navega para o formulário.
  function handleUpdateBabyLocation() {
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
  function handleBabySelected(index: number) {
    const selected = [...selectedModalOptions];
    selected[index].selected = !selected[index].selected;
    if (!selected[index].selected) {
      selected[index].newLocation = '';
    }
    setSelectedModalOptions(selected);
  }

  // Atualiza o valor da localização de um bebê selecionado.
  function handleBabyLocationSelected(index: number, value: string) {
    const values = [...selectedModalOptions];
    values[index].newLocation = value;
    setSelectedModalOptions(values);
  }

  // Checa se pelo menos um bebê foi selecionado e sua nova localização fornecida.
  function validateModalFields() {
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
        content="Você gostaria de visitar as expectativas hoje?"
        options={[
          {
            text: 'Sim',
            onPress: () => {
              hideAllModals();
              navigation.navigate('ManageExpectations');
            },
          },
          {
            text: 'Não',
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
        content="Chegou o momento de avaliar novamente sua pontuação na escala de confiança materna para amamentar! Vamos lá?"
        options={[
          {
            text: 'Sim',
            onPress: () => {
              hideAllModals();
              navigation.navigate('StatusForm', {
                situation: formAction,
              });
            },
          },
          {
            text: 'Não',
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
              text: 'Sim',
              disabled: !validateModalFields(),
              onPress: handleUpdateBabyLocation,
            },
            {
              text: 'Não',
              onPress: () => setBabyModalVisibility(false),
            },
          ]}
          visible={babyModalVisibility && !formModalVisibility}>
          <View>
            <TextModal>Algum dos(as) seus(as) bebês já recebeu alta?</TextModal>
            {babiesData.map((baby, index) => (
              <View key={baby.id}>
                <ModalOption
                  onPress={() => handleBabySelected(index)}
                  activeOpacity={0.7}>
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
                      placeholder="Onde se encontra agora?"
                      options={['Alojamento Conjunto', 'Casa', 'UCI Neonatal']}
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
            <HeaderText>Início</HeaderText>
          </HeaderBackground>
          <BannerImage source={Banner}>
            <HUButton
              onPress={() => navigation.navigate('HU')}
              activeOpacity={0.7}>
              <HUButtonText>Comece por aqui!</HUButtonText>
            </HUButton>
          </BannerImage>
        </Header>
        <ContentContainer>
          <ContentHeader>Conteúdo</ContentHeader>
          {options.map(({ Image, title, onPress }, index) => (
            <Option key={title}>
              <ContentOption activeOpacity={0.7} onPress={onPress}>
                {Image &&
                  (typeof Image === 'number' ? (
                    <ReactImage source={Image} width={100} height={100} />
                  ) : (
                    <Image width={100} height={100} />
                  ))}
                <ContentTextContainer>
                  <ContentTitle>{title}</ContentTitle>
                </ContentTextContainer>
              </ContentOption>
              {index < options.length - 1 && <ContentSeparator />}
            </Option>
          ))}
        </ContentContainer>
      </ScrollView>
    </>
  );
};

export default Home;
