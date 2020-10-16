import { Request, Response } from 'express';
import knex from '../database/connection';

class PerguntasController{
    async create(req:Request, res:Response){
        const {categoria, descricao,alternativas,other,multiplas} = req.body;
        await knex('pergunta').insert({categoria, descricao,alternativas,other,multiplas});
        res.sendStatus(200)
    }

    async index(req:Request, res:Response){
        const {categoria} = req.params;
        const perguntas = await knex('pergunta').select('*').where('categoria',categoria);
        perguntas.map((pergunta,i)=>{
            pergunta["alternativas"]=pergunta.alternativas.split('|')
        })
        res.json(perguntas);
    }
}

export default PerguntasController;