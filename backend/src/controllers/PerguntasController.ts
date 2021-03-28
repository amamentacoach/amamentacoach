import { Request, Response } from 'express';
import knex from '../database/connection';

const alvosMap = new Map<string, string>();
alvosMap.set("Alojamento Conjunto","AC")
alvosMap.set("Casa", "UCI/UTI")
alvosMap.set("UCI Neonatal", "UCI/UTI")
alvosMap.set("UTI Neonatal", "UCI/UTI")

class PerguntasController{
    async create(req:Request, res:Response){
        const {categoria, descricao,alternativas,other,multiplas} = req.body;
        await knex('pergunta').insert({categoria, descricao,alternativas,other,multiplas});
        res.sendStatus(200)
    }

    async index(req:Request, res:Response){
        const {categoria} = req.params;
        const {mae_id} = req;
        const bebe = await knex('bebe').select('local').where('mae_id',mae_id).first()
        const alvo = alvosMap.get(bebe.local)
        const perguntas = await knex('pergunta').select('*').where('categoria',categoria).where('alvo','GERAL').orWhere('alvo',alvo).orderBy('id');
        perguntas.map((pergunta,i)=>{
            pergunta["alternativas"]=pergunta.alternativas.split('|')
        })
        res.json(perguntas);
    }

    async escalaEAlimentacao(req:Request, res:Response){
        const {mae_id} = req;
        const bebe = await knex('bebe').select('local').where('mae_id',mae_id).first()
        const alvo = alvosMap.get(bebe.local)
        const escala = await knex('pergunta').select('*').where('categoria',7).where('alvo','GERAL').orWhere('alvo',alvo).orderBy('id');
        const alimentacao = await knex('pergunta').select('*').where('id',5).first();
        escala.map((pergunta,i)=>{
            pergunta["alternativas"]=pergunta.alternativas.split('|')
        })
        alimentacao["alternativas"] = alimentacao.alternativas.split('|')
        res.json({escala, alimentacao});
    }
}

export default PerguntasController;