import { Request, Response } from 'express';
import knex from '../database/connection';


const alvosMap = new Map<string, string>();
alvosMap.set("Alojamento conjunto","AC")
alvosMap.set("Casa", "AC")
alvosMap.set("UCI Neonatal", "UCI/UTI")
alvosMap.set("UTI Neonatal", "UCI/UTI")

class RelatorioDiarioController{
    async show(req:Request, res:Response){
        const{mae_id} = req

        const date = new Date()
        date.setDate(date.getDate()-1)
        
        const mamadas = await knex('mamada')
            .join('bebe','bebe.id','=','bebe_id')
            .where('bebe.mae_id', mae_id)
            .where('mamada.data_hora','>=',date)
            .select('mamada.id','bebe.nome as bebe','mamada.mama','mamada.duracao','mamada.data_hora')
            .orderBy('mamada.data_hora')

        const ordenhas = await knex('ordenha')
            .where('data_hora','>=',date)
            .select('ordenha.id','ordenha.mama','ordenha.duracao','ordenha.qtd_leite','ordenha.data_hora')
            .orderBy('ordenha.data_hora')
        
        
        const jaRespondeu = await  knex('resposta')
            .where('data','>=',date)
            .whereIn('pergunta_id',[15,16])
            .where('mae_id', mae_id)
            .count('*')

            
        if(jaRespondeu[0].count==0){
            const bebe = await knex('bebe').select('local').where('mae_id',mae_id).first()
            const alvo = alvosMap.get(bebe.local)
            console.log(alvo)
            const perguntas = await knex('pergunta').where('categoria',6).select('*')
                .where(bd =>{
                    bd.orWhere('alvo','GERAL')
                    bd.orWhere('alvo',alvo)
                }).orderBy('id');
            perguntas.map((pergunta,i)=>{
                pergunta["alternativas"]=pergunta.alternativas.split('|')
            })
            return res.send({mamadas, ordenhas, perguntas});
        }

        return res.send({mamadas, ordenhas});

    }
}

export default RelatorioDiarioController