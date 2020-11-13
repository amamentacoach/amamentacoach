import { Request, Response } from 'express';
import knex from '../database/connection';

class MensagensController{
    async create(req:Request, res:Response){
        const {
            conteudo
        } = req.body;

        await knex('mensagem').insert({mae_id:req.mae_id,conteudo,data:new Date()});

        res.sendStatus(200);
    }

    async index(req:Request, res:Response){
        let page:string
        if(req.query.page)
            page=req.query.page.toString()
        else page = "1"

        const [count] = await knex('mensagem').count()
        res.header('X-Total-Count', `${count["count"]}` )

        const mensagens = await knex('mae')
            .join('mensagem','mae.id','=','mensagem.mae_id')
            .distinct()
            .limit(7)
            .offset((parseInt(page)-1)*7)
            .select('mae.nome','mensagem.conteudo','mensagem.data');

        return res.json(mensagens)
    }
}

export default MensagensController;