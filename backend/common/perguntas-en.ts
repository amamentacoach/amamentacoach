import type { Pergunta } from "./perguntas";

const perguntas: Pergunta[] = [
  // Categoria 1: Enquete “Amamentar um prematuro”
  {
    id: 1,
    categoria: 1,
    descricao:
      "What's the best part about feeding breastmilk to your premature baby?",
    alternativas:
      "The feeling of empowerment (dealing with this challenge makes me believe that I am capable of other great things)|" +
      "I am grateful for the possibility of trying to establish breastfeeding." +
      "Strengthening the bond with my little partner as we strive to establish breastfeeding" +
      "Ability to provide preemie with breastmilk for health benefits." +
      "I can't identify anything good about breastfeeding a premature baby",
    outro: true,
    multiplas: true,
    alvo: "GERAL",
  },
  // Categoria 8: Enquete “Motivação”
  {
    id: 2,
    categoria: 8,
    descricao: "What motivates you to keep trying to breastfeed?",
    alternativas:
      "Thinking it's what's best for my baby|" +
      "The encouragement and advice from health professionals|" +
      "The cost of formula|" +
      "Considering the cost of the formula|" +
      "Other motivations|" +
      "I'm not feeling motivated to continue breastfeeding",
    outro: false,
    multiplas: true,
    alvo: "GERAL",
  },
  // Categoria 9: Enquete “Sobre ajuda”
  {
    id: 3,
    categoria: 9,
    descricao:
      "Do you feel like you're getting all the help you need to keep trying to breastfeed your baby?",
    alternativas:
      "Yes, both from professionals and from my family|" +
      "Only from my family|" +
      "Only from professionals|" +
      "Partially, both from professionals and from my family|" +
      "I'm not receiving any help",
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
    descricao: "How my baby is doing:",
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
      "Exclusively breastfeeding|" +
      "Mostly breastfeeding|" +
      "About half the time breastfeeding and half the time receiving supplement|" +
      "Mostly receiving supplement|" +
      "Receiving supplement at every feed|" +
      "My baby is still not receiving formula or milk, only parenteral nutrition|" +
      "I don't know",
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
      "I have being staying in 'kangaroo' for 1 hour period|" +
      "I have being staying in 'kangaroo' for more than 1 hour|" +
      "I brought my pumped milk|" +
      "I pumped my breast milk in the NICU|" +
      "I offered fresh milk for my baby|" +
      "I cleaned my baby's eyes and mouth|" +
      "I changed my baby's diapers|" +
      "I bathed my baby|" +
      "I gave some oral medication to my baby (or I trained in the administration of oral medication using milk)|" +
      "I brought my baby to my breast to suckle|" +
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
      "Think positively|" +
      "Value the little things|" +
      "Increase my self-confidence|" +
      "Live one day at a time|" +
      "Manage my anxiety or concern|" +
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
      'Engage in skin-to-skin "kangaroo" care with my baby|' +
      "Pump every three hours|" +
      "Offer fresh breast milk to my baby to supplement as needed|" +
      "Feel confident taking care of my baby|" +
      "Say no to offers or advice that are not helpful to me|" +
      "Have the courage to distance myself from people who may be harming me in some way",
    outro: false,
    multiplas: true,
    alvo: "AC",
  },
  {
    id: 10,
    categoria: 3,
    descricao: "Goals for actions",
    alternativas:
      "I engaged in kangaroo care or skin-to-skin with my baby|" +
      "I pumped as much as possible|" +
      "I offered fresh breast milk to supplement my baby|" +
      "I felt confident taking care of my baby|" +
      "I said no to offers or advice that was not helpful to me|" +
      "Seek more information about my baby from the physicians and nurses",
    outro: true,
    multiplas: true,
    alvo: "UCI/UTI",
  },
  // Categoria 4: Enquetes / questionários do DIÁRIO: AJUDA
  {
    id: 11,
    categoria: 4,
    descricao: "I needed help with...",
    alternativas:
      "nurses|" +
      "physicians|" +
      "a psychologist|" +
      "social services|" +
      "lactation consultant|" +
      "a physiotherapist",
    outro: false,
    multiplas: true,
    alvo: "GERAL",
  },
  {
    id: 12,
    categoria: 4,
    descricao: "My biggest source of support for the day was:",
    alternativas:
      "My partner|" +
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
    descricao:
      "This week, what has your partner been performing with your baby?",
    alternativas:
      "Visit in the NICU 1 to 2 times|" +
      "Visit the NICU more than 2 times|" +
      'Skin-to-skin "Kangaroo" care|' +
      "Helped me with pumping|" +
      "Offered milk to the baby|" +
      "Cleaned the baby's eyes and mouth|" +
      "Diaper changes|" +
      "Bathed the baby|" +
      "Soothed the baby|" +
      "Accompanied me and/or the baby to medical appointments|" +
      "Helped out at home so I could rest|" +
      "None of the above",
    outro: true,
    multiplas: true,
    alvo: "UCI/UTI",
  },
  {
    id: 14,
    categoria: 5,
    descricao: "This week, what has your partner been doing for your baby?",
    alternativas:
      'Skin-to-skin "Kangaroo" care|' +
      "Helped me with pumping|" +
      "Cleaned the baby's eyes and mouth|" +
      "Diaper changes|" +
      "Bathed the baby|" +
      "Put baby to sleep|" +
      "Stimulated and played with them|" +
      "Accompanied consultations|" +
      "Helped more at home so I could rest",
    outro: true,
    multiplas: true,
    alvo: "AC",
  },
  // Categoria 6: Ações realizadas com o bebe
  {
    id: 15,
    categoria: 6,
    descricao: "Goals for Actions",
    alternativas:
      'Engage in  skin-to-skin "kangaroo" care with my baby|' +
      "Pump whenever necessary|" +
      "Offer my fresh milk to my baby whenever necessary as a supplement|" +
      "Being confident in caring for my baby|" +
      "Have the courage to ask for help|" +
      "Have the courage to distance myself from people who may be harming me in some way",
    outro: false,
    multiplas: true,
    alvo: "AC",
  },
  {
    id: 16,
    categoria: 6,
    descricao: "Goals for Actions",
    alternativas:
      "Stay longer in the NICU|" +
      'Engage in  more skin-to-skin "kangaroo" care with my baby|' +
      "Pump more often daily|" +
      "Bring my breast milk|" +
      "Offer my fresh breast milk to my baby|" +
      "Perform more care tasks with my baby|" +
      " Have the courage to ask for help|" +
      "Seek more information about my baby from the physicians and nurses",
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
      "I will be able to manage to keep up with my baby's breastfeeding demands.",
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
