import { Request, Response } from 'express';
import knex from '../database/connection';

class AltaController{
    async show(req:Request, res:Response){
        const {mae_id} = req
        const internados = await knex('bebe').select('nome','id', 'local', 'data_parto').where('mae_id',mae_id).where('local','<>','Casa')
        res.json(internados)
    }

    async create(req:Request, res:Response){
        const {id} = req.params;
        const {
            local,
            data
        } = req.body;
        
        await knex('bebe').update({local, data_alta:data}).where('id',id)

        return res.sendStatus(200);


    }
}

export default AltaController;