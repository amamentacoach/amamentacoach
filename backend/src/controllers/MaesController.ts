import { Request, Response } from 'express';
import knex from '../database/connection';
import bcrypt from 'bcrypt';

class MaesController{
    async index(req:Request, res:Response){
        const maes = await knex('mae')
            .select('id, email, nome, data_nascimento, companheiro, escolaridade, renda, qtd_gravidez, ultimo_acesso, imagem_mae, imagem_pai');  
        return res.json(maes)
    }

    async show(req:Request, res:Response){
        const {id} = req.params;
        const mae = await knex('mae')
            .select('id, email, nome, data_nascimento, companheiro, escolaridade, renda, qtd_gravidez, ultimo_acesso, imagem_mae, imagem_pai')
            .where('id',id).first()
        return res.json(mae);
    }

    async create(req:Request, res:Response){
        const {
            email,
            senha,
            nome, 
            data_nascimento, 
            companheiro, 
            escolaridade, 
            renda, 
            qtd_gravidez,

        } = req.body;

        const mae = {
            email,
            senha: await bcrypt.hash(senha,10),
            nome,
            data_nascimento,
            companheiro,
            escolaridade,
            renda,
            qtd_gravidez
        };
        
        const [id] = await knex('mae').insert(mae).returning('id')

        return res.json({
            id,
        });


    }
}

export default MaesController;