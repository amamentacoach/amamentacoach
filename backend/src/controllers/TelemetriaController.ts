import { Request, Response } from 'express';
import Telemetria, { ITelemetria } from '../database/mongodb/Telemetria';

class TelemetriaController{
    async create(req:Request, res:Response){
        const {mae_id} = req;
        const acoes : ITelemetria[] =  req.body;

        acoes.map( acao => acao.mae_id = mae_id )

        await Telemetria.create(acoes)
        
        return res.sendStatus(200);
    }
}

export default TelemetriaController;