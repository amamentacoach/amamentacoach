import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/pt-br';

import {
  checkBabiesLocation,
  IBabyLocation,
} from '../../services/babyLocation';
import Modal from '../../components/Modal';

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
} from './styles';

import HUBanner from '../../../assets/images/banner_hu.png';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const [babiesData, setBabiesData] = useState<IBabyLocation[]>([]);
  const [modalsVisibility, setModalsVisibility] = useState<boolean[]>([]);

  const options = [
    {
      image: require('../../../assets/images/home_baby.png'),
      title: 'Olá, sou o prematuro',
      onPress: () => navigation.navigate('Premature'),
    },
    {
      image: require('../../../assets/images/home_breastfeed.png'),
      title: 'Passo a passo para amamentar o prematuro',
      onPress: () => navigation.navigate('StepByStepPremature'),
    },
    {
      image: require('../../../assets/images/home_milk.png'),
      title: 'A retirada do leite',
      onPress: () => navigation.navigate('HowToBreastfeed'),
    },
    {
      image: require('../../../assets/images/home_emotions.png'),
      title: 'Emoções e Amamentação ',
      onPress: () => navigation.navigate('EmotionsAndBreastfeeding'),
    },
    {
      image: require('../../../assets/images/home_more_information.png'),
      title: 'Mais informações',
      onPress: () => navigation.navigate('AdditionalInformation'),
    },
    {
      image: require('../../../assets/images/home_message.png'),
      title: 'Depoimento das mamães',
      onPress: () => navigation.navigate('Messages'),
    },
    {
      image: require('../../../assets/images/home_message.png'),
      title: 'Perguntas',
      onPress: () => navigation.navigate('Questions'),
    },
  ];

  useEffect(() => {
    // Busca bebês que podem receber alta e exibe os modais necessários.
    async function checkBabies() {
      const babiesToCheck = await checkBabiesLocation();
      if (babiesToCheck) {
        setBabiesData(babiesToCheck);
        setModalsVisibility(babiesToCheck.map(_ => true));
      }
    }

    // Verifica a última data que o aplicativo foi aberto. Se um dia tiver passado ou é a primeira
    // vez abrindo o app é buscado os bebês que podem receber alta.
    async function checkOneDayPassed() {
      const lastDateStorage = await AsyncStorage.getItem(
        '@AmamentaCoach:lastOpenedDate',
      );
      const currentDate = moment();

      if (
        !lastDateStorage ||
        (!!lastDateStorage &&
          currentDate.diff(moment(lastDateStorage, 'YYYY-MM-DD'), 'days') >= 1)
      ) {
        await checkBabies();
        await AsyncStorage.setItem(
          '@AmamentaCoach:lastOpenedDate',
          currentDate.format('YYYY-MM-DD'),
        );
      }
    }

    checkOneDayPassed();
  }, []);

  // Fecha o modal de index especificado.
  function closeCurrentModal(index: number) {
    const copy = [...modalsVisibility];
    copy[index] = !copy[index];
    setModalsVisibility(copy);
  }

  return (
    <>
      {babiesData.map((baby, index) => (
        <Modal
          key={baby.id}
          content={`O bebê ${baby.name} já teve alta?`}
          visible={modalsVisibility[index]}
          options={[
            {
              text: 'Sim',
              onPress: () => {
                closeCurrentModal(index);
                navigation.navigate('BabyLocationForm');
              },
            },
            {
              text: 'Não',
              onPress: () => closeCurrentModal(index),
            },
          ]}
        />
      ))}

      <ScrollView>
        <Header>
          <HeaderBackground>
            <HeaderText>Início</HeaderText>
          </HeaderBackground>
          <BannerImage source={HUBanner}>
            <HUButton onPress={() => navigation.navigate('HU')}>
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
