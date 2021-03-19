import e, { Request, Response } from 'express';
import knex from '../database/connection';

interface Perguntas{
    pergunta:String,
    respostas:any[]
}

class RelatorioSemanalController{
    async show(req:Request, res:Response){
        const{mae_id} = req

        const perguntas = [4,5,8,9,10,11,12]
        const titulos = ["Como me senti:",
            "Como meu bebê esteve se alimentando:",
            "Minhas Metas para Pensamentos e Sentimentos",
            "Minhas Metas para Ações",
            "Precisei de uma ajuda específica...",
            "Meu ombro amigo da semana:"
        ]

        const date = new Date()
        date.setDate(date.getDate()-7)

        let relatorio : Perguntas[] = [];

        titulos.forEach((titulo) => {
            relatorio.push({pergunta:titulo,respostas:[]})
        });

        let index = 0
        for(const  pergunta  of perguntas){
            const respostas = await knex('resposta')
                .join('pergunta','pergunta.id','=','resposta.pergunta_id')
                .where('resposta.mae_id',mae_id)
                .where('resposta.data','>=',date)
                .where('resposta.pergunta_id',pergunta)
                .select('resposta.descricao as resposta')
                .groupBy('resposta.descricao')

            respostas.forEach(resposta =>{
                if(index >= 4){
                    relatorio[index-1].respostas.push(resposta.resposta)
                }else{
                    relatorio[index].respostas.push(resposta.resposta)
                }
                
            })
            index++
        }
           
        return res.send(relatorio);

    }
}

export default RelatorioSemanalController