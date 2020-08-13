import { Request, Response } from 'express';
import knex from '../database/connection';

class PerguntasController{
    async create(req:Request, res:Response){
        const {categoria, descricao} = req.body;
        await knex('pergunta').insert({categoria, descricao});
        res.sendStatus(200)
    }

    async index(req:Request, res:Response){
        const {categoria} = req.params;
        const perguntas = await knex('pergunta').select('*').where('categoria',categoria);
        res.json(perguntas);
    }
}

export default PerguntasController;