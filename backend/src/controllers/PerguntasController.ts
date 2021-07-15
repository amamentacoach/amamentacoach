import { Request, Response } from 'express';
import knex from '../database/connection';

class PerguntasController{
    async create(req:Request, res:Response){
        const {categoria, descricao,alternativas,other,multiplas} = req.body;
        await knex('pergunta').insert({categoria, descricao,alternativas,other,multiplas});
        res.sendStatus(200)
    }
}

export default PerguntasController;