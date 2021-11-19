import { Request, Response } from 'express';
import Telemetria, { ITelemetry } from '../database/mongodb/Telemetria';

class TelemetriaController{
    async create(req:Request, res:Response){
        const {mae_id} = req;
        const acoes : ITelemetry[] =  req.body;

        acoes.map( acao => acao.mae_id = mae_id )

        await Telemetria.create(acoes)
        
        return res.sendStatus(200);
    }
}

export default TelemetriaController;