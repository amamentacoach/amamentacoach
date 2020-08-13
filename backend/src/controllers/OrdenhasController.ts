import { Request, Response } from 'express';
import knex from '../database/connection';

class OrdenhasController{
    async show(req:Request, res:Response){
        const {mae_id} = req.params;

        const {nome} = await knex('mae').select('nome').where('mae.id',mae_id).first();

        const ordenhas = await knex('ordenha')
            .select('*')
            .where('mae_id',mae_id).orderBy('data_hora','desc')

        return res.json({
            id:parseInt(mae_id),
            nome,
            ordenhas
        })
    }

    async create(req:Request,res:Response){
        const {
            qtd_leite,
            mama,
            duracao,
        } = req.body;

        const {mae_id} = req.params;

        const ordenha = {mae_id:parseInt(mae_id), qtd_leite, mama, duracao, data_hora:new Date}
        
        await knex('ordenha').insert(ordenha);

        res.sendStatus(200);
    }
}

export default OrdenhasController;