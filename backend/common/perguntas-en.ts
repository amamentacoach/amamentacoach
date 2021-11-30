import type { Pergunta } from "./perguntas";

const perguntas: Pergunta[] = [
  // Categoria 1: Enquete “Amamentar um prematuro”
  {
    id: 1,
    categoria: 1,
    descricao:
      "For you, what's the best part about breastfeeding a premature baby?",
    alternativas:
      "Feeling of empowerment (dealing with this challenge makes me believe that I am capable of other great things)|" +
      "Gratitude for the opportunity (I think many women, for many reasons, can’t even try)|" +
      "The formation of a powerful bond when fighting a battle in partnership with my tiny partner|" +
      "I can't identify anything good",
    outro: true,
    multiplas: true,
    alvo: "GERAL",
  },
  // Categoria 8: Enquete “Motivacao”
  {
    id: 2,
    categoria: 8,
    descricao: "What motivates you to keep trying to breastfeed??",
    alternativas:
      "Thinking it's best for my baby|" +
      "The incentive I'm getting from professionals|" +
      "The encouragement I'm getting from my family|" +
      "Thinking about the cost of the formula|" +
      "Other motivations|" +
      "I'm not too motivated to continue",
    outro: false,
    multiplas: true,
    alvo: "GERAL",
  },
  // Categoria 9: Enquete “Sobre ajuda”
  {
    id: 3,
    categoria: 9,
    descricao:
      "Do you feel like you're getting all the help you need to keep trying to breastfeed your baby??",
    alternativas:
      "Yes, both from professionals and from my family|" +
      "Only from my family|" +
      "Only from professionals|" +
      "Partially, both professionals and of my family|" +
      "I'm not getting help",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  // Categoria 2: Enquetes / questionários do DIÁRIO: SENTIMENTOS
  {
    id: 4,
    categoria: 2,
    descricao: "How I'm feeling:",
    alternativas:
      "😀 Happy|" +
      "😌 Confident|" +
      "🤩 Proud|" +
      "😥 Anxious|" +
      "😢 Sad|" +
      "😔 Discouraged|" +
      "😧 Worried",
    outro: true,
    multiplas: false,
    alvo: "GERAL",
  },
  // Categoria 10: Enquete Meu bebe hoje
  {
    id: 5,
    categoria: 10,
    descricao: "How is my baby is:",
    alternativas:
      "🙂 Continues as he or she was|" + "🙁 Worsened|" + "😁 Better",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 6,
    categoria: 10,
    descricao: "How my baby is feeding:",
    alternativas:
      "Only on my chest - exclusively breastfeeding|" +
      "Breastfeeding, with complement by cup|" +
      "By relactation/translactation|" +
      "Only per cup|" +
      "By baby bottle|" +
      "By nasogastric/orogastric tube",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 7,
    categoria: 10,
    descricao: "What I was able to do for my baby:",
    alternativas:
      "I have being staying in the NICU almost 1 hour|" +
      "I have being staying in the NICU between 1 and 3  hours|" +
      "I have being staying in the NICU more than 3  hours|" +
      "I have being staying in kangaroo for 1 hour period|" +
      "I have being staying in kangaroo for more than 1 hour|" +
      "I brought my pumped milk|" +
      "I pumped my breast milk in the NICU|" +
      "I offered fresh milk for my baby|" +
      "I cleaned my baby’s eyes and mouth|" +
      "I changed my baby’s diapers|" +
      "I bathed my baby|" +
      "I gave some oral medication to my baby (or I trained the administration of oral medication using milk)|" +
      "I put my baby in my breast to training breastfeed|" +
      "Today I stayed home",
    outro: false,
    multiplas: true,
    alvo: "GERAL",
  },
  // Categoria 3: Enquetes / questionários do DIÁRIO: METAS
  {
    id: 8,
    categoria: 3,
    descricao: "Goals for Thoughts and Feelings",
    alternativas:
      "Think more about positive things|" +
      "Value the little things more|" +
      "Increase my security|" +
      "Live one day at a time|" +
      "Master my anxiety or concern|" +
      "Think less about things that are out of my control",
    outro: false,
    multiplas: true,
    alvo: "GERAL",
  },
  {
    id: 9,
    categoria: 3,
    descricao: "Goals for actions",
    alternativas:
      "Stay in kangaroo with my baby|" +
      "Pump whenever necessary|" +
      "Offer my fresh milk to my baby whenever necessary as a complement|" +
      "Take care by my baby by feeling confident|" +
      "Have the courage to ask for help|" +
      "Have the courage to drive away people who may be harming me in some way",
    outro: false,
    multiplas: true,
    alvo: "AC",
  },
  {
    id: 10,
    categoria: 3,
    descricao: "Goals for actions",
    alternativas:
      "Stay longer in the NICU|" +
      "Stay more in kangaroo with my baby|" +
      "Pump more times a day|" +
      "Bring my breast milk|" +
      "Offer my fresh breast milk to my baby|" +
      "Perform more care with my baby|" +
      "Have the courage to ask for help|" +
      "Seek for more information about my baby with the physicians and nurses",
    outro: false,
    multiplas: true,
    alvo: "UCI/UTI",
  },
  // Categoria 4: Enquetes / questionários do DIÁRIO: AJUDA
  {
    id: 11,
    categoria: 4,
    descricao: "I needed a specific help...",
    alternativas:
      "of nurses|" +
      "of physicians|" +
      "of psychologist|" +
      "of Social Assistant|" +
      "of speech therapist|" +
      "of physiotherapist",
    outro: false,
    multiplas: true,
    alvo: "GERAL",
  },
  {
    id: 12,
    categoria: 4,
    descricao: "My biggest source of support for the day was:",
    alternativas:
      "my husband/boyfriend/partner|" +
      "My mother|" +
      "My mother-in-law|" +
      "A friend|" +
      "My sister|" +
      "My sister-in-law|" +
      "Another person",
    outro: false,
    multiplas: true,
    alvo: "GERAL",
  },
  // Categoria 5: Enquete sobre a participação do Pai
  {
    id: 13,
    categoria: 5,
    descricao: "This week, what has your baby's daddy been doing for him??",
    alternativas:
      "Visit in the NICU 1 to 2 times|" +
      "Visit the NICU more than 2 times|" +
      "Kangaroo|" +
      "Helped me with pumping|" +
      "Offered milk to the baby|" +
      "Cleaned the baby's eyes and mouth|" +
      "Diaper Exchanges|" +
      "Bathed baby|" +
      "Helped more at home so I could be more in the Neonatal Unit|" +
      "None of the alternatives",
    outro: false,
    multiplas: true,
    alvo: "UCI/UTI",
  },
  {
    id: 14,
    categoria: 5,
    descricao: "This week, what has your baby's daddy been doing for him??",
    alternativas:
      "Kangaroo|" +
      "Helped me with pumping|" +
      "Cleaned the baby's eyes and mouth|" +
      "Diaper Exchanges|" +
      "Bathed baby|" +
      "Made baby sleep|" +
      "Stimulated and joked|" +
      "Accompanied the baby to medical appointments|" +
      "Helped more at home so I could rest|" +
      "None of the alternatives",
    outro: false,
    multiplas: true,
    alvo: "AC",
  },
  // Categoria 6: Ações realizadas com o bebe
  {
    id: 15,
    categoria: 6,
    descricao: "Actions taken with my baby",
    alternativas:
      "I stayed in a kangaroo position with my baby|" +
      "I pumped the milk whenever I needed it|" +
      "I offered my fresh milk to my baby whenever he needed a supplement|" +
      "I performed the baby's cares feeling safe|" +
      "I had the courage to ask for help|" +
      "I had the courage to push people away who might be in the way in some way",
    outro: false,
    multiplas: true,
    alvo: "AC",
  },
  {
    id: 16,
    categoria: 6,
    descricao: "Actions taken with my baby",
    alternativas:
      "I stayed longer in the Neonatal Unit|" +
      "I spent more time in a kangaroo position with my baby|" +
      "I pumped the milk more times a day|" +
      "I brought my pumped milk|" +
      "I offered fresh milk for my baby ao meu bebê|" +
      "I performed more care with my baby|" +
      "I had the courage to ask for help|" +
      "I looked for more information about my baby with the doctors and nurses",
    outro: false,
    multiplas: true,
    alvo: "UCI/UTI",
  },
  // Categoria 7: Escala Auto Confiança para amamentar
  {
    id: 17,
    categoria: 7,
    descricao: "I can pump enough milk for my baby.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 18,
    categoria: 7,
    descricao:
      "I can deal with the fact that breast pumping and breastfeeding can be time consuming.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 19,
    categoria: 7,
    descricao:
      "I can successfully cope with the breastfeeding situation (pumping and actual breastfeeding) like I have with other challenging tasks.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 20,
    categoria: 7,
    descricao: "I can manage the breastfeeding situation to my satisfaction.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 21,
    categoria: 7,
    descricao: "I can keep wanting to breastfeed",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 22,
    categoria: 7,
    descricao: "I can be satisfied with my breastfeeding experience.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 23,
    categoria: 7,
    descricao: "I can get help with breastfeeding if and/or when I need it.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 24,
    categoria: 7,
    descricao: "I will be able to determine when my baby needs to be fed.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 25,
    categoria: 7,
    descricao:
      "I will be able to ensure that my baby is properly latched on for the whole feeding.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 26,
    categoria: 7,
    descricao:
      "I will be able to determine that my baby is getting enough milk.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 27,
    categoria: 7,
    descricao:
      "I will be able to manage to breastfeed even if my baby is crying.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 28,
    categoria: 7,
    descricao:
      "I will be able to breastfeed my baby without using formula as a supplement.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 29,
    categoria: 7,
    descricao:
      "I will be able to comfortably breastfeed with my family members present.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 30,
    categoria: 7,
    descricao:
      "I will be able to finish feeding my baby on one breast before switching to the other breast.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 31,
    categoria: 7,
    descricao: "I will be able to breastfeed my baby for every feeding.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 32,
    categoria: 7,
    descricao:
      "I will be able to manage to keep up with my baby’s breastfeeding demands.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 33,
    categoria: 7,
    descricao: "I will be able to tell when my baby is finished breastfeeding.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
  {
    id: 34,
    categoria: 7,
    descricao:
      "I will be able to switch from mostly pumping to mostly or completely breastfeeding my baby.",
    alternativas: "1|2|3|4|5",
    outro: false,
    multiplas: false,
    alvo: "GERAL",
  },
];

export default perguntas;
