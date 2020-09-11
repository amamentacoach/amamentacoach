import { Request, Response } from 'express';
import knex from '../database/connection';

class OrdenhasController{
    async show(req:Request, res:Response){
        const {bebe_id} = req.params;

        const {nome} = await knex('bebe').select('nome').where('bebe.id',bebe_id).first();

        const ordenhas = await knex('ordenha')
            .select('*')
            .where('bebe_id',bebe_id).orderBy('data_hora','desc')

        return res.json({
            id:parseInt(bebe_id),
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

        const {bebe_id} = req.params;

        const ordenha = {bebe_id:parseInt(bebe_id), qtd_leite, mama, duracao, data_hora:new Date}
        
        await knex('ordenha').insert(ordenha);

        res.sendStatus(200);
    }
}

export default OrdenhasController;