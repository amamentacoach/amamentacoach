import { Request, Response } from 'express';
import knex from '../database/connection';

class AcessosController{
    async create(req:Request, res:Response){
        const {local} = req.params
        const {mae_id} = req
        switch (local) {
            case "videos":
                await knex('mae').update('acesso_videos',true).where('id',mae_id)
                return res.sendStatus(200)
            case "app":
                const acessosAntApp = await knex('mae').select('acessos_app').where('id',mae_id).first()
                await knex('mae').update('acessos_app',acessosAntApp.acessos_app+1).where('id',mae_id)
                return res.sendStatus(200)
            case "diario":
                const acessosAntDiario = await knex('mae').select('acessos_diario').where('id',mae_id).first()
                await knex('mae').update('acessos_diario',acessosAntDiario.acessos_diario+1).where('id',mae_id)
                return res.sendStatus(200)
            default:
                return res.sendStatus(404)
        }
    }
}

export default AcessosController;