import React from 'react';

import moment from 'moment';
import { View } from 'react-native';

import { Title, MainText, BoldMainText, Container } from './styles';

interface Props {
  name: string;
}

const date = moment().format('DD [de] MMMM [de] yy');

export const AdultTermsOfService: React.FC<Props> = ({ name }) => {
  return (
    <>
      <Title>Termo de Consentimento Livre e Esclarecido - Mães</Title>
      <BoldMainText>Prezada senhora,</BoldMainText>
      <MainText>
        Gostaríamos de convidá-la para participar da pesquisa{' '}
        <BoldMainText>
          “Coaching via App: uma abordagem inovadora para o aleitamento materno
          de bebês prematuros”
        </BoldMainText>
        , a ser realizada no Hospital Universitário de Londrina (HU/UEL). O
        objetivo da pesquisa é elaborar e validar um aplicativo (App) via
        smartphone (celular) para a promoção do aleitamento materno (AM) de
        bebês prematuros, voltado para as mães.
      </MainText>
      <MainText>
        Sua participação é muito importante e ela se daria da seguinte forma: as
        mães participantes da pesquisa serão divididas em 2 grupos que receberão
        assistência para ter sucesso na amamentação de seu filho prematuro. Um
        grupo receberá os cuidados de rotina da Maternidade e da Unidade
        Neonatal do HU/UEL, e o outro grupo, além de receber os cuidados de
        rotina, utilizará um App para acompanhamento e orientações sobre AM. A
        escolha de qual grupo que ela fará parte será aleatória, por meio de
        sorteio. Durante a pesquisa, será solicitado que você responda a um
        questionário sobre seus dados pessoais, e a uma escala para mensurar sua
        confiança no processo de amamentação. Independente do grupo que fizer
        parte, seu processo de amamentação será apoiado e acompanhado todo o
        tempo, e você será contatada por telefone em dois momentos após a alta
        hospitalar do bebê, para seguimento deste acompanhamento.
      </MainText>
      <MainText>
        Além disso, após um mês de alta, você poderá ser convidada a participar
        de uma entrevista sobre as vivências durante o processo de amamentação
        do filho prematuro, e estas percepções serão valiosas para uma melhor
        compreensão por parte dos profissionais da saúde e pesquisadores da área
        a respeito do processo de amamentar um bebê prematuro. Neste caso, você
        será entrevistada no ambulatório de seguimento do prematuro ou no
        domicilio, conforme suas possibilidades. As entrevistas serão gravadas e
        posteriormente transcritas na íntegra, com duração de aproximadamente 40
        minutos e no máximo 1 hora.
      </MainText>
      <MainText>
        As informações serão tratadas com o mais absoluto sigilo e
        confidencialidade, de modo a preservar a sua identidade e serão
        utilizadas somente para os fins de pesquisa.
      </MainText>
      <MainText>
        Esclarecemos que sua participação é totalmente voluntária, podendo você:
        recusar-se a participar, ou mesmo desistir a qualquer momento, sem que
        isto acarrete qualquer ônus ou prejuízo à sua pessoa. Salientamos também
        que suas informações serão utilizadas somente para os fins de pesquisa e
        serão tratadas com o mais absoluto sigilo e confidencialidade, de modo a
        preservar a sua identidade.
      </MainText>
      <MainText>
        Asseguramos que você não pagará ou será remunerada pela participação, no
        entanto, se houver quaisquer despesas decorrentes da pesquisa, estas são
        de responsabilidade do pesquisador.
      </MainText>
      <MainText>
        Os possíveis benefícios da sua participação nesta pesquisa serão a
        contribuição para a construção de um App que tem a intenção de
        beneficiar e facilitar o processo de amamentação, promovendo a
        disseminação de conhecimentos e informações sobre o AM entre as mães de
        bebês prematuros.
      </MainText>
      <MainText>
        Quanto aos riscos, que são mínimos, se aplicam ao tempo destinado à
        utilização do App e leitura, resposta dos questionários, e à realização
        da entrevista. Para minimizar esse fator você poderá utilizar o App no
        tempo em que achar oportuno e ainda interromper a entrevista a qualquer
        momento, retomando ou não quando achar conveniente. Faremos o possível
        para auxiliá-la em todo processo caso algum desconforto ocorra,
        esclarecendo-a sempre que for necessário.
      </MainText>
      <MainText>
        Caso você tenha dúvidas ou necessite de maiores esclarecimentos poderá
        nos contatar:
      </MainText>
      <MainText>
        Profª Drª Edilaine Giovanini Rossetto, (43) 98837-6610, Rua Gil de Abreu
        Souza, 1501, Condominio Royal Park, Espernça, Londrina-PR,
        ediluizrossetto@gmail.com
      </MainText>
      <MainText>
        Enfermeira Ms. Gabriela Ramos Ferreira Curan, (43) 99921-6607, Rua
        Reverendo João Batista Ribeiro Neto, 75, apto 1903 torre 1 – Gleba
        Palhano, Londrina, gcuran@uel.br
      </MainText>
      <MainText>
        Enfermeira Louise Marina Silva Fontana, (43) 99147-9194, Av. Garibaldi
        Deliberador, 99 – ap 77, Bloco Dom Pedro I, Jardim Claudia, Londrina-PR,
        louise.fontana@uel.br
      </MainText>
      <MainText>
        Ou procurar o Comitê de Ética em Pesquisa Envolvendo Seres Humanos da
        Universidade Estadual de Londrina, situado junto ao prédio do LABESC –
        Laboratório Escola, no Campus Universitário, telefone 3371-5455, e-mail:
        cep268@uel.br.
      </MainText>
      <MainText>
        Este termo deverá ser preenchido em duas vias de igual teor, sendo uma
        delas devidamente preenchida, assinada e entregue a você.
      </MainText>
      <MainText>Londrina, {date}.</MainText>
      <MainText>Gabriela Ramos Ferreira Curan</MainText>
      <MainText>RG: 9.786.358-0</MainText>
      <MainText>
        Eu, {name}, tendo sido devidamente esclarecida sobre os procedimentos da
        pesquisa, concordo em participar voluntariamente da pesquisa descrita
        acima.
      </MainText>
    </>
  );
};

export const MinorTermsOfService: React.FC<Props> = ({ name }) => {
  return (
    <>
      <View>
        <Title>
          Termo de Consentimento Livre e Esclarecido – Responsáveis pelas mães
          menores de idade
        </Title>
        <BoldMainText>Prezado(a) senhor(a),</BoldMainText>
        <MainText>
          Gostaríamos de convidar a adolescente sob sua responsabilidade para
          participar da pesquisa{' '}
          <BoldMainText>
            “Coaching via App: uma abordagem inovadora para o aleitamento
            materno de bebês prematuros”
          </BoldMainText>
          , a ser realizada no Hospital Universitário da Universidade Estadual
          de Londrina (HU/UEL). O objetivo da pesquisa é elaborar e validar um
          aplicativo (App) via smartphone (celular) para as mães visando a
          promoção do aleitamento materno (AM) de bebês prematuros.
        </MainText>
        <MainText>
          A participação da adolescente sob sua responsabilidade é muito
          importante e ela se daria da seguinte forma: as mães participantes da
          pesquisa serão divididas em 2 grupos que receberão assistência para
          ter sucesso na amamentação de seu filho prematuro.{' '}
        </MainText>
        <MainText>
          Um grupo receberá os cuidados de rotina da Maternidade e da Unidade
          Neonatal do HU/UEL, e o outro grupo, além de receber os cuidados de
          rotina, utilizará um App para acompanhamento e orientações sobre AM. A
          escolha de qual grupo que ela fará parte será aleatória, por meio de
          sorteio.
        </MainText>
        <MainText>
          Durante a pesquisa, será solicitado que a adolescente responda a um
          questionário sobre seus dados pessoais, e a uma escala para mensurar
          sua confiança no processo de amamentação.
        </MainText>
        <MainText>
          Independente do grupo que fizer parte, o processo de amamentação será
          apoiado e acompanhado todo o tempo, e a adolescente será contatada por
          telefone em dois momentos após a alta hospitalar do bebê, para
          seguimento deste acompanhamento.
        </MainText>
        <MainText>
          Além disso, após um mês de alta, ela poderá ser convidada a participar
          de uma entrevista sobre as vivências durante o processo de amamentação
          do filho prematuro, e estas percepções serão valiosas para uma melhor
          compreensão por parte dos profissionais da saúde e pesquisadores da
          área a respeito do processo de amamentar um bebê prematuro.
        </MainText>
        <MainText>
          As adolescentes serão entrevistadas no ambulatório de seguimento do
          prematuro ou no domicilio, conforme as possibilidades das
          entrevistadas. As entrevistas serão gravadas e posteriormente
          transcritas na íntegra, com duração de aproximadamente 40 minutos e no
          máximo 1 hora.
        </MainText>
        <MainText>
          As informações serão tratadas com o mais absoluto sigilo e
          confidencialidade, de modo a preservar a sua identidade e serão
          utilizadas somente para os fins de pesquisa.
        </MainText>
        <MainText>
          Esclarecemos que a participação da adolescente sob sua
          responsabilidade é totalmente voluntária, podendo solicitar a recusa
          ou desistência de participação a qualquer momento, sem que isto
          acarrete qualquer ônus ou prejuízo a vocês.
        </MainText>
        <MainText>
          Asseguramos que vocês não pagarão ou serão remunerados pela
          participação, no entanto, se houver quaisquer despesas decorrentes da
          pesquisa, estas são de responsabilidade do pesquisador.
        </MainText>
        <MainText>
          Os possíveis benefícios da sua autorização de participação nesta
          pesquisa serão a contribuição para a construção de um App que tem a
          intenção de beneficiar e facilitar o processo de amamentação,
          promovendo a disseminação de conhecimentos e informações sobre o AM
          entre as mães de bebês prematuros.
        </MainText>
        <MainText>
          Quanto aos riscos, que são mínimos, se aplicam ao tempo destinado à
          utilização do App, leitura e resposta dos questionários, e à
          realização da entrevista. Para minimizar esse fator ela poderá
          utilizar o App no tempo em que achar oportuno e ainda interromper a
          entrevista a qualquer momento, retomando ou não quando achar
          conveniente. Faremos o possível para auxiliá-la em todo processo caso
          algum desconforto ocorra, esclarecendo-a sempre que for necessário.
        </MainText>
        <MainText>
          Informamos que esta pesquisa atende e respeita os direitos previstos
          no Estatuto da Criança e do Adolescente - ECA, Lei Federal nº 8069 de
          13 de julho de 1990, sendo eles: à vida, à saúde, à alimentação, à
          educação, ao esporte, ao lazer, à profissionalização, à cultura, à
          dignidade, ao respeito, à liberdade e à convivência familiar e
          comunitária. Garantimos também que será atendido o Artigo 18 do ECA:
          “É dever de todos velar pela dignidade da criança e do adolescente,
          pondo-os a salvo de qualquer tratamento desumano, violento,
          aterrorizante, vexatório ou constrangedor.”
        </MainText>
        <MainText>
          Caso você tenha dúvidas ou necessite de maiores esclarecimentos poderá
          nos contatar:
        </MainText>
        <MainText>
          Profª Drª Edilaine Giovanini Rossetto, (43) 98837-6610, Rua Gil de
          Abreu Souza, 1501, Condominio Royal Park, Espernça, Londrina-PR,
          ediluizrossetto@gmail.com
        </MainText>
        <MainText>
          Enfermeira Ms. Gabriela Ramos Ferreira Curan, (43) 99921-6607, Rua
          Reverendo João Batista Ribeiro Neto, 75, apto 1903 torre 1 – Gleba
          Palhano, Londrina, gcuran@uel.br
        </MainText>
        <MainText>
          Enfermeira Louise Marina Silva Fontana, (43) 99147-9194, Av. Garibaldi
          Deliberador, 99 – ap 77, Bloco Dom Pedro I, Jardim Claudia,
          Londrina-PR, louise.fontana@uel.br
        </MainText>
        <MainText>
          Ou procurar o Comitê de Ética em Pesquisa Envolvendo Seres Humanos da
          Universidade Estadual de Londrina, situado junto ao prédio do LABESC –
          Laboratório Escola, no Campus Universitário, telefone 3371-5455,
          e-mail: cep268@uel.br.
        </MainText>
        <MainText>
          Este termo deverá ser preenchido em duas vias de igual teor, sendo uma
          delas devidamente preenchida, assinada e entregue ao(à) senhor(a).
        </MainText>
        <MainText>Londrina, {date}.</MainText>
        <MainText>Gabriela Ramos Ferreira Curan</MainText>
        <MainText>RG: 9.786.358-0</MainText>
        <MainText>
          Eu, tendo sido devidamente esclarecido sobre os procedimentos da
          pesquisa, concordo com a participação voluntária da criança ou do
          adolescente sob minha responsabilidade na pesquisa descrita acima.
        </MainText>
      </View>
      <Container>
        <Title>Termo de Assentimento – Mães</Title>
        <BoldMainText>Prezada, </BoldMainText>
        <MainText>
          Gostaríamos de convidá-la para participar da pesquisa{' '}
          <BoldMainText>
            “Coaching via App: uma abordagem inovadora para o aleitamento
            materno de bebês prematuros”
          </BoldMainText>
          , a ser realizada no Hospital Universitário de Londrina (HU/UEL). O
          objetivo da pesquisa é elaborar e validar um aplicativo (App) via
          smartphone (celular) para a promoção do aleitamento materno (AM) de
          bebês prematuros, voltado para as mães.
        </MainText>
        <MainText>
          Sua participação é muito importante e ela se daria da seguinte forma:
          as mães participantes da pesquisa serão divididas em 2 grupos que
          receberão assistência para ter sucesso na amamentação de seu filho
          prematuro. Um grupo receberá os cuidados de rotina da Maternidade e da
          Unidade Neonatal do HU/UEL, e o outro grupo, além de receber os
          cuidados de rotina, utilizará um App para acompanhamento e orientações
          sobre AM.
        </MainText>
        <MainText>
          A escolha de qual grupo que ela fará parte será aleatória, por meio de
          sorteio. Durante a pesquisa, será solicitado que a adolescente
          responda a um questionário sobre seus dados pessoais, e a uma escala
          para mensurar sua confiança no processo de amamentação.
        </MainText>
        <MainText>
          Independente do grupo que fizer parte, o processo de amamentação será
          apoiado e acompanhado todo o tempo, e a adolescente será contatada por
          telefone em dois momentos após a alta hospitalar do bebê, para
          seguimento deste acompanhamento.
        </MainText>
        <MainText>
          Além disso, após um mês de alta, você poderá ser convidada a
          participar de uma entrevista sobre as vivências durante o processo de
          amamentação do filho prematuro, e estas percepções serão valiosas para
          uma melhor compreensão por parte dos profissionais da saúde e
          pesquisadores da área a respeito do processo de amamentar um bebê
          prematuro.
        </MainText>
        <MainText>
          Você poderá ser entrevistada no ambulatório de seguimento do prematuro
          ou no domicilio, conforme suas possibilidades. As entrevistas serão
          gravadas e posteriormente transcritas na íntegra, com duração de
          aproximadamente 40 minutos e no máximo 1 hora.
        </MainText>
        <MainText>
          As informações serão tratadas com o mais absoluto sigilo e
          confidencialidade, de modo a preservar a sua identidade e serão
          utilizadas somente para os fins de pesquisa.
        </MainText>
        <MainText>
          Esclarecemos que sua participação é totalmente voluntária, podendo
          você: recusar-se a participar, ou mesmo desistir a qualquer momento,
          sem que isto acarrete qualquer ônus ou prejuízo à sua pessoa.
        </MainText>
        <MainText>
          Asseguramos que você não pagará ou será remunerada pela participação,
          no entanto, se houver quaisquer despesas decorrentes da pesquisa,
          estas são de responsabilidade do pesquisador.
        </MainText>
        <MainText>
          Os possíveis benefícios da sua participação nesta pesquisa serão a
          contribuição para a construção de um App que tem a intenção de
          beneficiar e facilitar o processo de amamentação, promovendo a
          disseminação de conhecimentos e informações sobre o AM entre as mães
          de bebês prematuros.
        </MainText>
        <MainText>
          Quanto aos riscos, que são mínimos, se aplicam ao tempo destinado à
          utilização do App, leitura e resposta dos questionários, e à
          realização da entrevista. Para minimizar esse fator você poderá
          utilizar o App no tempo em que achar oportuno e ainda interromper a
          entrevista a qualquer momento, retomando ou não quando achar
          conveniente. Faremos o possível para auxiliá-la em todo processo caso
          algum desconforto ocorra, esclarecendo-a sempre que for necessário.
        </MainText>
        <MainText>
          Informamos que esta pesquisa atende e respeita os direitos previstos
          no Estatuto da Criança e do Adolescente - ECA, Lei Federal nº 8069 de
          13 de julho de 1990, sendo eles: à vida, à saúde, à alimentação, à
          educação, ao esporte, ao lazer, à profissionalização, à cultura, à
          dignidade, ao respeito, à liberdade e à convivência familiar e
          comunitária. Garantimos também que será atendido o Artigo 18 do ECA:
          “É dever de todos velar pela dignidade da criança e do adolescente,
          pondo-os a salvo de qualquer tratamento desumano, violento,
          aterrorizante, vexatório ou constrangedor.”
        </MainText>
        <MainText>
          Caso você tenha dúvidas ou necessite de maiores esclarecimentos poderá
          nos contatar:
        </MainText>
        <MainText>
          Profª Drª Edilaine Giovanini Rossetto, (43) 98837-6610, Rua Gil de
          Abreu Souza, 1501, Condominio Royal Park, Espernça, Londrina-PR,
          ediluizrossetto@gmail.com
        </MainText>
        <MainText>
          Enfermeira Ms. Gabriela Ramos Ferreira Curan, (43) 99921-6607, Rua
          Reverendo João Batista Ribeiro Neto, 75, apto 1903 torre 1 – Gleba
          Palhano, Londrina, gcuran@uel.br
        </MainText>
        <MainText>
          Enfermeira Louise Marina Silva Fontana, (43) 99147-9194, Av. Garibaldi
          Deliberador, 99 – ap 77, Bloco Dom Pedro I, Jardim Claudia,
          Londrina-PR, louise.fontana@uel.br
        </MainText>
        <MainText>
          Ou procurar o Comitê de Ética em Pesquisa Envolvendo Seres Humanos da
          Universidade Estadual de Londrina, situado junto ao prédio do LABESC –
          Laboratório Escola, no Campus Universitário, telefone 3371-5455,
          e-mail: cep268@uel.br.
        </MainText>
        <MainText>
          Este termo deverá ser preenchido em duas vias de igual teor, sendo uma
          delas devidamente preenchida, assinada e entregue a você.
        </MainText>
        <MainText>Londrina, {date}.</MainText>
        <MainText>Gabriela Ramos Ferreira Curan</MainText>
        <MainText>RG: 9.786.358-0</MainText>
        <MainText>
          Eu, {name}, tendo sido devidamente esclarecida sobre os procedimentos
          da pesquisa, concordo em participar voluntariamente da pesquisa
          descrita acima.
        </MainText>
      </Container>
    </>
  );
};
