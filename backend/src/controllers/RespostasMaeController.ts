import { Request, Response } from 'express';
import knex from '../database/connection';
import moment from 'moment';


interface Resposta{
    pergunta_id: number,
    descricao: string
}

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

    async responderEscala(req:Request, res:Response){
        const {mae_id} = req
        const  {ocasiao} = req.body
        const respostas:Resposta[] = req.body.respostas

        let score = 0
        
        await knex.transaction(async trx =>{

            const mae = await knex('mae').select('score_1d', 'score_alta', 'score_15d','score_1m', 'primeiro_acesso').where('id', mae_id).first();

            const bebe = await knex('bebe').select('data_parto').where('mae_id', '=', mae_id).first()
            const diff = moment(new Date()).diff(bebe.data_parto);
            const dias_vida = Math.trunc(moment.duration(diff).asDays())

            for(const resposta of respostas){
                const {pergunta_id, descricao} = resposta
                score += parseInt(descricao);
                await trx('resposta').insert({mae_id,pergunta_id,descricao,data:new Date()});
            }
    
            switch (ocasiao) {
                case "1D":
                    await trx('mae').update({score_1d:score}).where({id:mae_id})
                    break;
                case "ALTA":
                    await trx('mae').update({score_alta:score}).where({id:mae_id})
                    break;
    
                case "15D":
                    await trx('mae').update({score_15d:score}).where({id:mae_id})
                    break;
    
                case "1M":
                    await knex('mae').update({score_1m:score}).where({id:mae_id})
                    break;
            
                default:
                    if(!mae.score_1d && dias_vida<13){
                        await trx('mae').update({score_1d:score}).where({id:mae_id})
                        break;
                    }else if(!mae.score_15d && dias_vida>=13){
                        await trx('mae').update({score_15d:score}).where({id:mae_id})
                        break;
                    }else if(!mae.score_1m && dias_vida>=27){
                        await trx('mae').update({score_1m:score}).where({id:mae_id})
                        break;
                    }else{
                        break;
                    }
            }  
                     
        })

       
        res.send({score})
    }

    async responderAlimentacao(req:Request, res:Response){
        const {mae_id} = req
        const  {ocasiao } = req.body
        const {respostas} = req.body

        

        
        await knex.transaction(async trx =>{

            const mae = await knex('mae').select('alim_15d', 'alim_1m', 'primeiro_acesso').where('id', mae_id).first();

            const bebe = await knex('bebe').select('data_parto').where('mae_id', '=', mae_id).first()
            const diff = moment(new Date()).diff(bebe.data_parto);
            const dias_vida = Math.trunc(moment.duration(diff).asDays())

            for(const resposta of respostas){
                await trx('resposta').insert({mae_id,pergunta_id:6,descricao:resposta,data:new Date()});
            }
    
            switch (ocasiao) {
                case "ALTA":
                    await trx('mae').update({alim_alta:respostas.join('|')}).where({id:mae_id})
                    break;
    
                case "15D":
                    await trx('mae').update({alim_15d:respostas.join('|')}).where({id:mae_id})
                    break;
    
                case "1M":
                    await trx('mae').update({alim_1m:respostas.join('|')}).where({id:mae_id})
                    break;
            
                default:
                    if(!mae.alim_15d && dias_vida>=13){
                        await trx('mae').update({alim_15d:respostas.join('|')}).where({id:mae_id})
                        break;
                    }else if(!mae.alim_1m && dias_vida>=27){
                        await trx('mae').update({alim_1m:respostas.join('|')}).where({id:mae_id})
                        break;
                    }else{
                        break;
                    }
                    break;
            }  
                     
        })

       
        res.sendStatus(200)
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