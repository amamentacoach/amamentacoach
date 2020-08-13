import { Request, Response } from 'express';
import knex from '../database/connection';

class UploadController{
    async create(req:Request,res:Response){
        const {filename} = req.file;
        const {mae_id,tipo} = req.params
        if(tipo==='bebe'){
            await knex('mae').update('imagem_bebe',filename).where('id',mae_id);
            res.json({filename});
        }else if(tipo==='pai'){
            await knex('mae').update('imagem_pai',filename).where('id',mae_id);
            res.json({filename});
        }else{
            res.sendStatus(404);
        }
    }
}

export default UploadController;