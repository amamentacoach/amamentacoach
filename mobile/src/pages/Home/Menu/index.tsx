import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/pt-br';

import { useIsFirstRun } from '../../../contexts/firstRun';
import FormPickerInput from '../../../components/FormPickerInput';
import { setHomePageOpened } from '../../../services/telemetry';
import {
  checkBabiesLocation,
  IBabyStatus,
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
  ContentImage,
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

import HUBanner from '../../../../assets/images/banner_hu.png';

interface BabyModalOption {
  newLocation: string;
  selected: boolean;
}

const Home: React.FC = () => {
  const navigation = useNavigation();
  const { isFirstRun, setTemporaryNotFirstRun } = useIsFirstRun();

  const [babiesData, setBabiesData] = useState<IBabyStatus[]>([]);
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

  const options = [
    {
      image: require('../../../../assets/images/home_baby.png'),
      title: 'Olá, sou o prematuro',
      onPress: () => navigation.navigate('Premature'),
    },
    {
      image: require('../../../../assets/images/home_breastfeed.png'),
      title: 'Passo a passo para amamentar o prematuro',
      onPress: () => navigation.navigate('StepByStepPremature'),
    },
    {
      image: require('../../../../assets/images/home_milk.png'),
      title: 'A retirada do leite',
      onPress: () => navigation.navigate('Breastfeeding'),
    },
    {
      image: require('../../../../assets/images/home_emotions.png'),
      title: 'Emoções e Amamentação ',
      onPress: () => navigation.navigate('EmotionsAndBreastfeeding'),
    },
    {
      image: require('../../../../assets/images/home_more_information.png'),
      title: 'Mais informações',
      onPress: () => navigation.navigate('AdditionalInformation'),
    },
    {
      image: require('../../../../assets/images/home_message.png'),
      title: 'Depoimento das mamães',
      onPress: () => navigation.navigate('Messages'),
    },
    {
      image: require('../../../../assets/images/home_message.png'),
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
        setBabiesData(babiesToCheck);
        setBabyModalVisibility(true);
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

    // Verifica a última data que o aplicativo foi aberto. Se um dia tiver passado ou é a primeira
    // vez abrindo o app é buscado os bebês que podem receber alta.
    async function checkOneDayPassed() {
      const lastDateStorage = await AsyncStorage.getItem(
        '@AmamentaCoach:lastOpenedDate',
      );
      const currentDate = moment();

      // Menos de um dia se passou.
      if (
        !!lastDateStorage &&
        currentDate.diff(moment(lastDateStorage, 'YYYY-MM-DD'), 'days') < 1
      ) {
        return;
      }

      // Verifica se algum formulário deve ser respondido
      await checkForms();
      // Verifica se algum bebê pode receber alta.
      await checkBabies();

      await AsyncStorage.setItem(
        '@AmamentaCoach:lastOpenedDate',
        currentDate.format('YYYY-MM-DD'),
      );
    }

    // Executa pela primeira vez ao abrir o aplicativo
    if (isFirstRun.temporary.home) {
      checkOneDayPassed();
      setTemporaryNotFirstRun('home');
    }
  }, []);

  // Fecha o modal, marca que os bebês selecionados tiveram alta e navega para o formulário.
  function handleUpdateBabyLocation() {
    setFormModalVisibility(false);
    setBabyModalVisibility(false);
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
        content="Chegou o momento de avaliar novamente sua pontuação na escala de confiança materna para amamentar! Vamos lá?"
        options={[
          {
            text: 'Sim',
            onPress: () => {
              setFormModalVisibility(false);
              setBabyModalVisibility(false);
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
          visible={babyModalVisibility}
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
          ]}>
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
          <BannerImage source={HUBanner}>
            <HUButton
              onPress={() => navigation.navigate('HU')}
              activeOpacity={0.7}>
              <HUButtonText>Comece por aqui!</HUButtonText>
            </HUButton>
          </BannerImage>
        </Header>
        <ContentContainer>
          <ContentHeader>Conteúdo</ContentHeader>
          {options.map(({ image, title, onPress }, index) => (
            <Option key={title}>
              <ContentOption activeOpacity={0.7} onPress={onPress}>
                <ContentImage source={image} />
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
