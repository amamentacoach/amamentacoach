import { Action, AppScreen } from '@common/telemetria';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';

import ImageWrapper from 'components/ImageWrapper';
import InformationPages from 'components/InformationPages';
import MainButton from 'components/MainButton';
import SecondaryButton from 'components/SecondaryButton';
import theme from 'config/theme';
import { createTelemetryAction } from 'utils/telemetryAction';

import type {
  InfoPageModelProps,
  InfoPageItem,
} from 'components/InformationPages';
import type { RootStackProps } from 'routes/app';

import {
  ContentContainer,
  ContentHeader,
  ContentText,
  FirstButtonContainer,
  Footer,
  HeaderBackground,
  ImageContainer,
  SecondButtonContainer,
} from './styles';

import ExpectationVsReality1 from '@assets/images/expectation_vs_reality_1.png';
import ExpectationVsReality2 from '@assets/images/expectation_vs_reality_2.png';
import ExpectationVsReality3 from '@assets/images/expectation_vs_reality_3.png';

const NotWhatIExpected: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();

  const pages: InfoPageItem[] = [
    {
      id: '1',
      title: i18n.t('NotWhatIExpectedPage.Header'),
      image: ExpectationVsReality1,
      content: [
        {
          id: '1',
          text: i18n.t('NotWhatIExpectedPage.Text1'),
        },
      ],
    },
    {
      id: '2',
      title: i18n.t('NotWhatIExpectedPage.Header'),
      image: ExpectationVsReality2,
      content: [
        {
          id: '1',
          text: i18n.t('NotWhatIExpectedPage.Text2'),
        },
      ],
    },
    {
      id: '3',
      title: i18n.t('NotWhatIExpectedPage.Header'),
      image: ExpectationVsReality3,
      content: [
        {
          id: '1',
          text: i18n.t('NotWhatIExpectedPage.Text3'),
        },
      ],
    },
  ];

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.NotWhatIExpected },
    });
  }, []);

  const InfoModel: React.FC<InfoPageModelProps> = ({
    pagesLength,
    index,
    title,
    image,
    content,
    goToPage,
  }) => (
    <>
      <HeaderBackground />
      <ContentContainer>
        <ContentHeader>{title}</ContentHeader>
        {image && (
          <ImageContainer>
            <ImageWrapper
              source={image}
              height="100%"
              width={250}
              resizeMode="contain"
            />
          </ImageContainer>
        )}
        {content.map(({ id, text }) => (
          <ContentText key={id}>{text}</ContentText>
        ))}
        <Footer>
          {index > 0 && (
            <FirstButtonContainer>
              <SecondaryButton
                color={theme.black}
                text={i18n.t('GoBack')}
                onPress={() => goToPage(index - 1)}
              />
            </FirstButtonContainer>
          )}
          <SecondButtonContainer>
            <MainButton
              color={theme.babyGreen}
              text={
                index === pagesLength - 1 ? i18n.t('Leave') : i18n.t('Next')
              }
              onPress={() =>
                index === pagesLength - 1
                  ? navigation.goBack()
                  : goToPage(index + 1)
              }
            />
          </SecondButtonContainer>
        </Footer>
      </ContentContainer>
    </>
  );

  return (
    <InformationPages
      data={pages}
      PageModel={InfoModel}
      scrollEnabled={false}
    />
  );
};

export default NotWhatIExpected;
