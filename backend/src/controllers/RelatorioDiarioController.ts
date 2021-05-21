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

        const bebes = await knex('bebe').select('nome','id').where('mae_id',mae_id);

        bebes.forEach(async bebe =>{
            bebe.mamadas = await knex('mamada').select('*').where('bebe_id',bebe.id).where('mamada.data_hora','>=',date).orderBy('data_hora')
        })

        const ordenhas = await knex('ordenha')
            .where('data_hora','>=',date)
            .select('*')
            .orderBy('ordenha.data_hora')

        return res.send({bebes, ordenhas});

    }
}

export default RelatorioDiarioController