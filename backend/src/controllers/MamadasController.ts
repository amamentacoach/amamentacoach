import { Request, Response } from 'express';
import knex from '../database/connection';

class MamadasController{
    async show(req:Request, res:Response){
        const {bebe_id} = req.params;

        const {nome} = await knex('bebe').select('nome').where('bebe.id',bebe_id).first();

        const mamadas = await knex('mamada')
            .select('*')
            .where('bebe_id',bebe_id).orderBy('data_hora','desc')

        return res.json({
            id:parseInt(bebe_id),
            nome,
            mamadas
        })
    }

    async create(req:Request,res:Response){
        const {
            mama,
            duracao,
            data_hora
        } = req.body;

        const {bebe_id} = req.params;

        const mamada = {bebe_id:parseInt(bebe_id), mama, duracao, data_hora}
        
        await knex('mamada').insert(mamada);

        res.sendStatus(200);
    }
}

export default MamadasController;