import { Action, AppScreen } from '@common/telemetria';
import i18n from 'i18n-js';
import { useEffect } from 'react';
import { Linking, TouchableOpacity } from 'react-native';

import { createTelemetryAction } from 'utils/telemetryAction';

import { Container, Link, ScrollView, Text, TextContainer } from './styles';

interface ItemProps {
  texts: string[];
  link?: string;
}

const Item: React.FC<ItemProps> = ({ texts, link }) => {
  return (
    <TextContainer>
      {texts.map(text => (
        <Text key={text}>{text}</Text>
      ))}
      {link && (
        <TouchableOpacity
          onPress={() => Linking.openURL(link)}
          activeOpacity={0.7}>
          <Link>{link}</Link>
        </TouchableOpacity>
      )}
    </TextContainer>
  );
};

const Credits: React.FC = () => {
  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.Credits },
    });
  }, []);

  return (
    <ScrollView>
      <Container>
        <Item
          texts={[
            i18n.t('CreditsPage.Item1.1'),
            i18n.t('CreditsPage.Item1.2'),
            i18n.t('CreditsPage.Item1.3'),
            i18n.t('CreditsPage.AvailableIn'),
          ]}
          link={'https://www.nice.org.uk/guidance/cg93'}
        />
        <Item
          link={'https://storyset.com/illustration/motherhood/pana'}
          texts={[
            i18n.t('CreditsPage.Item2.1'),
            i18n.t('CreditsPage.Item2.2'),
            i18n.t('CreditsPage.Item2.3'),
            i18n.t('CreditsPage.AvailableIn'),
          ]}
        />
        <Item
          link={
            'https://www.saoraimundo.com/amamentar-entenda-os-beneficios-e-sua-importancia/'
          }
          texts={[
            i18n.t('CreditsPage.Item3.1'),
            i18n.t('CreditsPage.Item3.2'),
            i18n.t('CreditsPage.Item3.3'),
            i18n.t('CreditsPage.AvailableIn'),
          ]}
        />
        <Item
          link={
            'https://www.saoraimundo.com/amamentar-entenda-os-beneficios-e-sua-importancia/'
          }
          texts={[
            i18n.t('CreditsPage.Item4.1'),
            i18n.t('CreditsPage.Item4.2'),
            i18n.t('CreditsPage.Item4.3'),
            i18n.t('CreditsPage.AvailableIn'),
          ]}
        />
        <Item
          link={
            'https://guacui.es.gov.br/noticia/2018/10/doacao-de-leite-materno-pode-ser-feita-em-guacui.html'
          }
          texts={[
            i18n.t('CreditsPage.Item5.1'),
            i18n.t('CreditsPage.Item5.2'),
            i18n.t('CreditsPage.Item5.3'),
            i18n.t('CreditsPage.AvailableIn'),
          ]}
        />
        <Item
          texts={[i18n.t('CreditsPage.Item6.1'), i18n.t('CreditsPage.Item6.2')]}
        />
        <Item
          link={
            'https://guacui.es.gov.br/noticia/2018/10/doacao-de-leite-materno-pode-ser-feita-em-guacui.html'
          }
          texts={[
            i18n.t('CreditsPage.Item7.1'),
            i18n.t('CreditsPage.Item7.2'),
            i18n.t('CreditsPage.Item7.3'),
            i18n.t('CreditsPage.AvailableIn'),
          ]}
        />
        <Item
          link={
            'https://bebe.abril.com.br/amamentacao/leite-materno-infografico-mostra-como-ele-e-produzido/'
          }
          texts={[
            i18n.t('CreditsPage.Item8.1'),
            i18n.t('CreditsPage.Item8.2'),
            i18n.t('CreditsPage.Item8.3'),
            i18n.t('CreditsPage.AvailableIn'),
          ]}
        />
      </Container>
    </ScrollView>
  );
};

export default Credits;
