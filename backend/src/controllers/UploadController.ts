import { Request, Response } from 'express';
import knex from '../database/connection';

class UploadController{
    async create(req:Request,res:Response){
        const {filename} = req.file;
        const {id,tipo} = req.params
        if(tipo==='bebe'){
            await knex('bebe').update('imagem_bebe',filename).where('id',id);
            res.json({filename});
        }else if(tipo==='pai'){
            await knex('mae').update('imagem_pai',filename).where('id',id);
            res.json({filename});
        }else if(tipo==='mae'){
            await knex('mae').update('imagem_mae',filename).where('id',id);
            res.json({filename});
        }else{
            res.sendStatus(404);
        }
    }
}

export default UploadController;