import { Request, Response } from 'express';
import knex from '../database/connection';

interface Count{
    count:any[]
}

class DuvidasController{
    async show(req:Request, res:Response){
        
        const duvidasNaoResolvidas = await knex('duvida')
            .where('resolvido',false)
            .orderBy('data_hora','asc')
            .select(['mae.nome','duvida.descricao','duvida.whatsapp','duvida.data_hora','duvida.id'])
            .join('mae','mae.id','=','duvida.mae_id')
        
        const countNaoResolvidas = await knex('duvida')
        .where('resolvido',false)
        .count()
        .first()
        
        const duvidasResolvidas = await knex('duvida')
            .where('resolvido',true)
            .where('resposta','<>','null')
            .orderBy('data_hora','asc')
            .select(['mae.nome','duvida.descricao','duvida.whatsapp','duvida.data_hora','duvida.id','duvida.resposta'])
            .join('mae','mae.id','=','duvida.mae_id')    

        res.render('duvidas',{duvidasNaoResolvidas,duvidasResolvidas,countNaoResolvidas})
    }

    async create(req:Request,res:Response){
        const {
            descricao,
            whatsapp,
        } = req.body;

        const {mae_id} = req;

        const duvida = {mae_id, whatsapp, data_hora:new Date(), descricao, resolvido:false}
        
        await knex('duvida').insert(duvida);

        res.sendStatus(200);
    }

    async resolver(req:Request,res:Response){
        const {id} = req.params
        const {
            resposta,
        } = req.body;

        const duvida = {resposta, resolvido:true}
        
        await knex('duvida').update(duvida).where({id});

        res.sendStatus(200);
    }
}

export default DuvidasController;