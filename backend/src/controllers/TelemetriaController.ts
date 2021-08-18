import { Request, Response } from 'express';
import Telemetria from '../database/mongodb/Telemetria';

class TelemetriaController{
    async create(req:Request, res:Response){
        const {mae_id} = req;
        const {acao} =  req.body;
        const telemetria = new Telemetria({
            mae_id,
            acao
        });
        await telemetria.save();
        return res.sendStatus(200);
    }
}

export default TelemetriaController;