import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("pergunta").del();

    // Inserts seed entries
    await knex("pergunta").insert([
        // Categoria 1: Enquete “Amamentar um prematuro”
        { 
            id: 1, 
            categoria: 1, 
            descricao:'Pra você, qual é a melhor parte de dedicar-se a amamentar um bebê prematuro?',
            alternativas: 'Sentimento de empoderamento (lidar com este desafio me faz acreditar que sou capaz de outras grandes coisas)|'
                + 'Gratidão pela oportunidade (penso que muitas mulheres, por muitas razões, não conseguem nem tentar)|'
                + 'A formação de um poderoso vínculo ao travar uma batalha em parceria com meu(a) pequeno(a)|'
                + 'Não consigo identificar nada de bom',
            outro:true,
            multiplas:true,
        },
        { 
            id: 2, 
            categoria: 1, 
            descricao:'O que te motiva a continuar tentando amamentar?',
            alternativas: 'Pensar que é o melhor para o meu bebê|'
                + 'O incentivo que estou recebendo dos profissionais|'
                + 'O incentivo que estou recebendo da minha família|'
                + 'Pensar no custo da fórmula|'
                + 'Outras motivações|'
                + 'Não estou muito motivada a continuar',
            outro:false,
            multiplas:true,
        },
        { 
            id: 3, 
            categoria: 1, 
            descricao:'Você sente que está recebendo toda a ajuda de que precisa para continuar tentando amamentar seu bebê?',
            alternativas: 'Sim, tanto dos profissionais quanto da minha família|'
                + 'Apenas da minha família|'
                + 'Apenas dos profissionais|'
                + 'Parcialmente, tanto dos profissionais quanto da minha família|'
                + 'Não estou recebendo ajuda',
            outro:false,
            multiplas:false,
        },

        // Categoria 2: Enquetes / questionários do DIÁRIO: SENTIMENTOS
        { 
            id: 4, 
            categoria: 2, 
            descricao:'Como estou me sentindo:',
            alternativas: 'Feliz|'
                + 'Confiante|'
                + 'Orgulhosa|'
                + 'Ansiosa|'
                + 'Triste|'
                + 'Desanimada|'
                + 'Preocupada',
            outro:true,
            multiplas:false,
        },
        { 
            id: 5, 
            categoria: 2, 
            descricao:'Como meu bebê está se alimentando:',
            alternativas: 'Apenas no meu peito|'
                + 'No meu peito, c/ complemento por copinho|'
                + 'Por relactação/ translactação|'
                + 'Apenas por copinho |'
                + 'Por chuca|'
                + 'Por sonda',
            outro:false,
            multiplas:false,
        },
        { 
            id: 6, 
            categoria: 2, 
            descricao:'Como meu bebê está:',
            alternativas: 'Continua como estava|'
                + 'Piorou|'
                + 'Melhorou',
            outro:false,
            multiplas:false,
        },
        { 
            id: 7, 
            categoria: 2, 
            descricao:'O que eu consegui fazer pelo meu bebê:',
            alternativas: 'Fiquei na Unidade quase 1 hora|'
                + 'Fiquei na Unidade entre 1 e 3 horas|'
                + 'Fiquei na Unidade mais de 3 horas|'
                + 'Fiz canguru por 1 hora|'
                + 'Fiz canguru por mais de 1 hora|'
                + 'Trouxe meu leite|'
                + 'Retirei meu leite na Unidade|'
                + 'Ofereci leite fresco|'
                + 'Limpei seus olhinhos e boquinha|'
                + 'Troquei fraldas|'
                + 'Dei banho|'
                + 'Dei a medicação (ou treinei com leite)|'
                + 'Coloquei meu bebê ao seio para sugar|'
                + 'Hoje fiquei em casa',
            outro:false,
            multiplas:true,
        },
        // Categoria 3: Enquetes / questionários do DIÁRIO: METAS
        { 
            id: 8, 
            categoria: 3, 
            descricao:'Metas para Pensamentos e Sentimentos',
            alternativas: 'Pensar mais em coisas positivas|'
                + 'Valorizar mais as pequenas coisas|'
                + 'Aumentar minha segurança|'
                + 'Viver um dia de cada vez|'
                + 'Dominar minha ansiedade ou preocupação|'
                + 'Pensar menos nas coisas que fogem do meu controle',
            outro:false,
            multiplas:true,
        },
        { 
            id: 9, 
            categoria: 3, 
            descricao:'Metas para Ações',
            alternativas: 'Fazer canguru com meu bebê|'
                + 'Retirar o leite sempre que precisar|'
                + 'Oferecer meu leite fresco ao meu bebê sempre que precisar de complemento|'
                + 'Realizar os cuidados sentindo-me segura|'
                + 'Ter coragem para pedir ajuda|'
                + 'Ter coragem para afastar pessoas que possam estar atrapalhando de alguma forma',
            outro:false,
            multiplas:true,
            alvo:"AC"
        },
        { 
            id: 10, 
            categoria: 3, 
            descricao:'Metas para Ações',
            alternativas: 'Ficar mais tempo na Unidade|'
                + 'Fazer mais canguru|'
                + 'Retirar o leite mais vezes por dia|'
                + 'Trazer meu leite|'
                + 'Oferecer leite fresco ao meu bebê|'
                + 'Realizar mais cuidados junto ao meu bebê|'
                + 'Ter coragem para pedir ajuda|'
                + 'Procurar me informar + sobre meu bebê',
            outro:false,
            multiplas:true,
            alvo:"UCI/UTI"
        },
        // Categoria 4: Enquetes / questionários do DIÁRIO: AJUDA
        { 
            id: 11, 
            categoria: 4, 
            descricao:'Precisei de uma ajuda específica...',
            alternativas: 'da Enfermagem|'
                + 'da Medicina|'
                + 'da Psicologia|'
                + 'do Serviço Social|'
                + 'da Fonoaudiologia|'
                + 'da Fisioterapia',
            outro:false,
            multiplas:true,
        },
        { 
            id: 12, 
            categoria: 4, 
            descricao:'Meu ombro amigo do dia: ',
            alternativas: 'Marido / namorado / rolo|'
                + 'Mãe|'
                + 'Sogra|'
                + 'Amiga|'
                + 'Irmã|'
                + 'Cunhada|'
                + 'Outra pessoa',
            outro:false,
            multiplas:true,
        },

        // Categoria 5: Enquete sobre a participação do Pai
        { 
            id: 13, 
            categoria: 5, 
            descricao:'Nesta semana, o que o papai do seu bebê tem feito por ele?',
            alternativas: 'Visita na Unidade de 1 a 2 vezes|'
                + 'Visita na Unidade mais de 2 vezes|'
                + 'Canguru|'
                + 'Me ajudou com a ordenha|'
                + 'Ofereceu a dieta|'
                + 'Limpou os olhinhos e boquinha do bebê|'
                + 'Outra Trocou fraldas|'
                + 'Deu banho|'
                + 'Ajudou mais em casa para que eu pudesse estar mais na Unidade|'
                + 'Nenhuma das alternativas',
            outro:false,
            multiplas:true,
            alvo:'UCI/UTI'
        },
        { 
            id: 14, 
            categoria: 5, 
            descricao:'Nesta semana, o que o papai do seu bebê tem feito por ele?',
            alternativas: 'Canguru|'
                + 'Me ajudou com a ordenha|'
                + 'Limpou os olhinhos e boquinha do bebê|'
                + 'Trocou fraldas|'
                + 'Deu banho|'
                + 'Fez dormir|'
                + 'Estimulou e brincou|'
                + 'Acompanhou consultas|'
                + 'Ajudou mais em casa para que eu pudesse descansar|'
                + 'Nenhuma das alternativas',
            outro:false,
            multiplas:true,
            alvo:'AC'
        },
    ]);
};
