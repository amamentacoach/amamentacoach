import { Request, Response } from 'express';
import knex from '../database/connection';

class RespostasController{
    async create(req:Request, res:Response){
        const {mae_id,pergunta_id} = req.params;
        const {descricao} = req.body;
        await knex('resposta').insert({mae_id,pergunta_id,descricao,data:new Date()});
        res.sendStatus(200)
    }

    async index(req:Request, res:Response){
        const {mae_id} = req.params;

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

export default RespostasController;