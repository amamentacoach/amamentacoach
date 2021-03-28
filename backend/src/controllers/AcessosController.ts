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
                const mae = await knex('mae').select('acessos_app','score_1d','score_15d','score_1m','primeiro_acesso').where('id',mae_id).first()
                await knex('mae').update('acessos_app',mae.acessos_app+1).where('id',mae_id)
                const bebe = await knex('bebe').select('nome','id', 'local', 'data_parto').where('mae_id',mae_id).first()
                const timeDiff = Math.abs(new Date().getTime() - bebe.data_parto.getTime())
                const diffDays =  Math.ceil(timeDiff/(1000 * 3600 * 24))

                if(mae.acessos_app > 1 && mae.score_1d == null){
                    return res.send({acao:"RESPONDER_1D"})
                }else if(diffDays >= 15 && mae.score_15d == null){
                    return res.send({acao:"RESPONDER_15D"})
                }else if(diffDays >= 30 && mae.score_1m == null){
                    return res.send({acao:"RESPONDER_1M"})
                }else{
                    return res.sendStatus(200)
                }
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