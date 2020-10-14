import { Request, Response } from 'express';
import knex from '../database/connection';

class BebesController{
    async index(req:Request, res:Response){
        const id_mae = req.mae_id;
        const bebes = await knex('bebe').select('*').where('mae_id',id_mae);  
        return res.json(bebes)
    }

    async show(req:Request, res:Response){
        const {id} = req.params;
        const bebe = await knex('bebe').select('*').where('id',id).first()
        return res.json(bebe);
    }

    async create(req:Request, res:Response){
        const id_mae = req.mae_id
        const {
            nome,
            data_parto,
            semanas_gest, 
            dias_gest, 
            peso, 
            apgar1,
            apgar2,
            tipo_parto, 
            local,
            complicacoes
        } = req.body;

        const bebe = {
            nome,
            data_parto,
            semanas_gest,
            dias_gest,
            peso,
            apgar1,
            apgar2,
            tipo_parto,
            local,
            complicacoes:complicacoes || false,
            mae_id:id_mae
        };
        
        const [id] = await knex('bebe').insert(bebe).returning('id')

        return res.json({
            id_bebe:id,
            nome,
        });


    }
}

export default BebesController;