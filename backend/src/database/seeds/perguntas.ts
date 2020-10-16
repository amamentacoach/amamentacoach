import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("pergunta").del();

    // Inserts seed entries
    await knex("pergunta").insert([
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
    ]);
};
