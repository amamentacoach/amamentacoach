import { Request, Response } from 'express';
import knex from '../database/connection';

class OrdenhasController{
    async show(req:Request, res:Response){
        const {mae_id} = req;

        const ordenhas = await knex('ordenha')
            .select('*')
            .where('mae_id',mae_id).orderBy('data_hora','desc')

        return res.json({
            ordenhas
        })
    }

    async create(req:Request,res:Response){
        const {
            qtd_leite,
            mama,
            duracao,
            data_hora
        } = req.body;

        const {mae_id} = req;

        const ordenha = {mae_id:parseInt(mae_id), qtd_leite, mama, duracao, data_hora}
        
        await knex('ordenha').insert(ordenha);

        res.sendStatus(200);
    }

    async showByDate(req:Request,res:Response){
        const {mae_id} = req
        const {date} = req.params

        const dateIni = new Date(date)
        const dateFim = new Date(date)
        dateFim.setDate(dateFim.getDate()+1)

        const ordenhas = await knex('ordenha')
            .select('*')
            .whereBetween('data_hora',[dateIni, dateFim])
            .where('mae_id',mae_id).orderBy('data_hora','desc')

        res.send(ordenhas)
    }
}

export default OrdenhasController;