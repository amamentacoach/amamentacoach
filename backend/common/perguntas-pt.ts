import type { Pergunta } from "./perguntas";

const perguntas: Pergunta[] = [
  // Categoria 1: Enquete “Amamentar um prematuro”
  {
    id: 1,
    categoria: 1,
    descricao:
      "Pra você, qual é a melhor parte de dedicar-se a amamentar um bebê prematuro?",
    alternativas:
      "Sentimento de empoderamento (lidar com este desafio me faz acreditar que sou capaz de outras grandes coisas)|" +
      "Gratidão pela oportunidade (penso que muitas mulheres, por muitas razões, não conseguem nem tentar)|" +
      "A formação de um poderoso vínculo ao travar uma batalha em parceria com meu(a) pequeno(a)|" +
      "Não consigo identificar nada de bom",
    outro: true,
    multiplas: true,
    alvo: "GERAL",
  },
  // Categoria 8: Enquete “Motivação”
  {
    id: 2,
    categoria: 8,
    descricao: "O que te motiva a continuar tentando amamentar?",
    alternativas:
      "Pensar que é o melhor para o meu bebê|" +
      "O incentivo que estou recebendo dos profissionais|" +
      "O incentivo que estou recebendo da minha família|" +
      "Pensar no custo da fórmula|" +
      "Outras motivações|" +
      "Não estou muito motivada a continuar",
    outro: false,
    multiplas: true,
    alvo: "GERAL",
  },
  // Categoria 9: Enquete “Sobre ajuda”
  {
    id: 3,
    categoria: 9,
    descricao:
      "Você sente que está recebendo toda a ajuda de que precisa para continuar tentando amamentar seu bebê?",
    alternativas:
      "Sim, tanto dos profissionais quanto da minha família|" +
      "Apenas da minha família|" +
      "Apenas dos profissionais|" +
      "Parcialmente, tanto dos profissionais quanto da minha família|" +
      "Não estou recebendo ajuda",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  // Categoria 2: Enquetes / questionários do DIÁRIO: SENTIMENTOS
  {
    id: 4,
    categoria: 2,
    descricao: "Como estou me sentindo:",
    alternativas:
      "😀 Feliz|" +
      "😌 Confiante|" +
      "🤩 Orgulhosa|" +
      "😥 Ansiosa|" +
      "😢 Triste|" +
      "😔 Desanimada|" +
      "😧 Preocupada",
    outro: true,
    multiplas: false,
    alvo: "GERAL",
  },
  // Categoria 10: Enquete Meu bebe hoje
  {
    id: 5,
    categoria: 10,
    descricao: "Como meu bebê está:",
    alternativas: "🙂 Continua como estava|" + "🙁 Piorou|" + "😁 Melhorou",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 6,
    categoria: 10,
    descricao: "Como meu bebê está se alimentando:",
    alternativas:
      "Apenas no meu peito|" +
      "No meu peito, e também recebendo complemento|" +
      "Por relactação/translactação|" +
      "Apenas por copinho|" +
      "Apenas por chuca|" +
      "Apenas por sonda",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 7,
    categoria: 10,
    descricao: "O que eu consegui fazer pelo meu bebê:",
    alternativas:
      "Fiquei na Unidade quase 1 hora|" +
      "Fiquei na Unidade entre 1 e 3 horas|" +
      "Fiquei na Unidade mais de 3 horas|" +
      "Fiz canguru por 1 hora|" +
      "Fiz canguru por mais de 1 hora|" +
      "Trouxe meu leite|" +
      "Retirei meu leite na Unidade|" +
      "Ofereci leite fresco|" +
      "Limpei seus olhinhos e boquinha|" +
      "Troquei fraldas|" +
      "Dei banho|" +
      "Dei a medicação (ou treinei com leite)|" +
      "Coloquei meu bebê ao seio para sugar|" +
      "Hoje fiquei em casa",
    outro: false,
    multiplas: true,
    alvo: "GERAL",
  },
  // Categoria 3: Enquetes / questionários do DIÁRIO: METAS
  {
    id: 8,
    categoria: 3,
    descricao: "Metas para Pensamentos e Sentimentos",
    alternativas:
      "Pensar mais em coisas positivas|" +
      "Valorizar mais as pequenas coisas|" +
      "Aumentar minha segurança|" +
      "Viver um dia de cada vez|" +
      "Dominar minha ansiedade ou preocupação|" +
      "Pensar menos nas coisas que fogem do meu controle",
    outro: false,
    multiplas: true,
    alvo: "GERAL",
  },
  {
    id: 9,
    categoria: 3,
    descricao: "Metas para Ações",
    alternativas:
      "Fazer canguru com meu bebê|" +
      "Retirar o leite sempre que precisar|" +
      "Oferecer meu leite fresco ao meu bebê sempre que precisar de complemento|" +
      "Realizar os cuidados sentindo-me segura|" +
      "Ter coragem para pedir ajuda|" +
      "Ter coragem para afastar pessoas que possam estar atrapalhando de alguma forma",
    outro: false,
    multiplas: true,
    alvo: "AC",
  },
  {
    id: 10,
    categoria: 3,
    descricao: "Metas para Ações",
    alternativas:
      "Ficar mais tempo na Unidade|" +
      "Fazer mais canguru|" +
      "Retirar o leite mais vezes por dia|" +
      "Trazer meu leite|" +
      "Oferecer leite fresco ao meu bebê|" +
      "Realizar mais cuidados junto ao meu bebê|" +
      "Ter coragem para pedir ajuda|" +
      "Procurar me informar + sobre meu bebê",
    outro: false,
    multiplas: true,
    alvo: "UCI/UTI",
  },
  // Categoria 4: Enquetes / questionários do DIÁRIO: AJUDA
  {
    id: 11,
    categoria: 4,
    descricao: "Precisei de uma ajuda específica...",
    alternativas:
      "da Enfermagem|" +
      "da Medicina|" +
      "da Psicologia|" +
      "do Serviço Social|" +
      "da Fonoaudiologia|" +
      "da Fisioterapia",
    outro: false,
    multiplas: true,
    alvo: "GERAL",
  },
  {
    id: 12,
    categoria: 4,
    descricao: "Meu ombro amigo do dia: ",
    alternativas:
      "Marido / namorado / rolo|" +
      "Mãe|" +
      "Sogra|" +
      "Amiga|" +
      "Irmã|" +
      "Cunhada|" +
      "Outra pessoa",
    outro: false,
    multiplas: true,
    alvo: "GERAL",
  },
  // Categoria 5: Enquete sobre a participação do Pai
  {
    id: 13,
    categoria: 5,
    descricao: "Nesta semana, o que o papai do seu bebê tem feito por ele?",
    alternativas:
      "Visita na Unidade de 1 a 2 vezes|" +
      "Visita na Unidade mais de 2 vezes|" +
      "Canguru|" +
      "Me ajudou com a ordenha|" +
      "Ofereceu a dieta|" +
      "Limpou os olhinhos e boquinha do bebê|" +
      "Trocou fraldas|" +
      "Deu banho|" +
      "Ajudou mais em casa para que eu pudesse estar mais na Unidade|" +
      "Nenhuma das alternativas",
    outro: false,
    multiplas: true,
    alvo: "UCI/UTI",
  },
  {
    id: 14,
    categoria: 5,
    descricao: "Nesta semana, o que o papai do seu bebê tem feito por ele?",
    alternativas:
      "Canguru|" +
      "Me ajudou com a ordenha|" +
      "Limpou os olhinhos e boquinha do bebê|" +
      "Trocou fraldas|" +
      "Deu banho|" +
      "Fez dormir|" +
      "Estimulou e brincou|" +
      "Acompanhou consultas|" +
      "Ajudou mais em casa para que eu pudesse descansar|" +
      "Nenhuma das alternativas",
    outro: false,
    multiplas: true,
    alvo: "AC",
  },
  // Categoria 6: Ações realizadas com o bebe
  {
    id: 15,
    categoria: 6,
    descricao: "Ações realizadas com meu bebê",
    alternativas:
      "Fiz canguru com meu bebê|" +
      "Retirei o leite sempre que precisei|" +
      "Ofereci meu leite fresco ao meu bebê sempre que precisou de complemento|" +
      "Realizei os cuidados sentindo-me segura|" +
      "Tive coragem para pedir ajuda|" +
      "Tive coragem para afastar pessoas que possam estar atrapalhando de alguma forma",
    outro: false,
    multiplas: true,
    alvo: "AC",
  },
  {
    id: 16,
    categoria: 6,
    descricao: "Ações realizadas com meu bebê",
    alternativas:
      "Fiquei mais tempo na Unidade|" +
      "Fiz mais canguru|" +
      "Retirei o leite mais vezes por dia|" +
      "Trouxe meu leite|" +
      "Ofereci leite fresco ao meu bebê|" +
      "Realizei mais cuidados junto ao meu bebê|" +
      "Tive coragem para pedir ajuda|" +
      "Procurei me informar + sobre meu bebê",
    outro: false,
    multiplas: true,
    alvo: "UCI/UTI",
  },
  // Categoria 7: Escala Auto Confiança para amamentar
  {
    id: 17,
    categoria: 7,
    descricao: "Eu consigo retirar leite da mama suficiente para o meu bebê.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 18,
    categoria: 7,
    descricao:
      "Eu consigo lidar com o fato de que retirar leite da mama e/ou amamentar podem ser demorados.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 19,
    categoria: 7,
    descricao:
      "Eu consigo lidar bem com qualquer situação da amamentação (retirada de leite da mama e a amamentação em si) da mesma forma que faço com outras tarefas difíceis.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 20,
    categoria: 7,
    descricao:
      "Eu consigo lidar com a amamentação de forma que eu me sinta satisfeita.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 21,
    categoria: 7,
    descricao: "Eu continuo querendo amamentar",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 22,
    categoria: 7,
    descricao: "Eu estou satisfeita com a minha experiência de amamentar.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 23,
    categoria: 7,
    descricao:
      "Eu consigo obter ajuda com a amamentação se eu precisar (ou quando precisar).",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 24,
    categoria: 7,
    descricao:
      "Eu serei capaz de saber quando meu bebê precisa ser amamentado.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 25,
    categoria: 7,
    descricao:
      "Eu serei capaz de garantir que meu bebê está pegando o meu peito corretamente durante toda a mamada.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 26,
    categoria: 7,
    descricao:
      "Eu serei capaz de saber se meu bebê está recebendo leite suficiente no meu peito.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 27,
    categoria: 7,
    descricao:
      "Eu serei capaz de amamentar mesmo que meu bebê esteja chorando.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 28,
    categoria: 7,
    descricao:
      "Eu serei capaz de amamentar meu bebê sem usar outros tipos de leite como complemento.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 29,
    categoria: 7,
    descricao:
      "Eu serei capaz de amamentar confortavelmente na frente de pessoas da minha família.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 30,
    categoria: 7,
    descricao:
      "Eu serei capaz de amamentar meu bebê até esvaziar o peito antes de mudar para o outro.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 31,
    categoria: 7,
    descricao: "Eu serei capaz de amamentar meu bebê em todas as mamadas.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 32,
    categoria: 7,
    descricao:
      "Eu serei capaz de atender as necessidades de amamentação do meu bebê.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 33,
    categoria: 7,
    descricao:
      "Eu serei capaz de reconhecer quando meu bebê estiver satisfeito.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 34,
    categoria: 7,
    descricao:
      "Eu serei capaz de substituir a retirada do leite das mamas pela amamentação, na maioria das mamadas ou em todas elas.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
];

export default perguntas;
