import { Request, Response } from 'express';
import knex from '../database/connection';

class MaesController{
    async index(req:Request, res:Response){
        const maes = await knex('mae').select('*');  
        return res.json(maes)
    }

    async show(req:Request, res:Response){
        const {id} = req.params;
        const mae = await knex('mae').select('*').where('id',id).first()
        return res.json(mae);
    }

    async create(req:Request, res:Response){
        const {
            nome, 
            data_nascimento, 
            nome_bebe, 
            data_parto, 
            idade_gestacional, 
            peso_nascimento
        } = req.body;

        const mae = {
            nome,
            data_nascimento,
            nome_bebe,
            data_parto,
            idade_gestacional,
            peso_nascimento
        };
        
        const [id] = await knex('mae').insert(mae).returning('id')

        return res.json({
            id,
            ...mae
        });


    }
}

export default MaesController;