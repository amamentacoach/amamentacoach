import { Request, Response } from 'express';
import knex from '../database/connection';

class RespostasMaeController{
    async create(req:Request, res:Response){
        const {pergunta_id} = req.params;
        let respostas: any[];
        respostas = req.body.respostas;
        const {mae_id} = req;
        let retorno:any;

        respostas.map(async (resposta,i)=>{
            await knex('resposta').insert({mae_id,pergunta_id,descricao:resposta,data:new Date()});
            if(pergunta_id==="4"){
                switch (resposta) {
                    case "Feliz":
                    case "Confiante":
                    case "Orgulhosa":
                        break;
                    case "Ansiosa":
                    case "Triste":  
                    case "Desanimada":
                    case "Preocupada":
                        const mae:any = await  knex('mae').select('nome').where('id','=',mae_id).first();
                        retorno = {
                            feedback:`Continue firme, ${mae.nome}! Talvez o conteúdo “Emoções e Amamentação” possa te ajudar hoje.`,
                            redirect:"EmotionsAndBreastfeeding"
                        }
                        break;
                    default:
                        break;
                }
                retorno ? res.json(retorno) : res.sendStatus(200)
            }else if(i==respostas.length-1)
                res.sendStatus(200)
        })
    }

    async index(req:Request, res:Response){
        const {mae_id} = req;

        const {nome} = await knex('mae').select('nome').where('mae.id',mae_id).first();

        const respostas = await knex('resposta')
            .join('pergunta','pergunta.id','=','resposta.pergunta_id')
            .select('pergunta.descricao as pergunta','resposta.descricao as resposta')
            .where('mae_id',mae_id)

        return res.json({
            id:parseInt(mae_id),
            nome,
            respostas
        })
    }
}

export default RespostasMaeController;