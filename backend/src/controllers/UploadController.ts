import { Request, Response } from 'express';
import knex from '../database/connection';

class UploadController{
    async create(req:Request,res:Response){
        const {filename} = req.file;
        const {tipo} = req.params;
        try{
            if(tipo==='bebe'){
                await knex('mae').update('imagem_bebe',filename).where('id',req.mae_id);
                res.json({filename});
            }else if(tipo==='pai'){
                await knex('mae').update('imagem_pai',filename).where('id',req.mae_id);
                res.json({filename});
            }else if(tipo==='mae'){
                await knex('mae').update('imagem_mae',filename).where('id',req.mae_id);
                res.json({filename});
            }else{
                res.sendStatus(404);
            }
        }catch{
            res.sendStatus(500);
        }
    }
}

export default UploadController;