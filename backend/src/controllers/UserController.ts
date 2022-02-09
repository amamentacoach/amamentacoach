import { Request, Response } from 'express';
import knex from '../database/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
require('dotenv/config');

class UserController{

    async create(req:Request, res:Response){
        const {
            email,
            senha,
            nome, 
            companheiro,
            localizacao,
            data_nascimento,
            bebes
        } = req.body;

        await knex.transaction(async trx =>{
            const mae = {email, senha, nome, companheiro, localizacao, data_nascimento, ultimo_acesso:new Date(), primeiro_acesso: new Date()};
            const [id] = await trx('mae').insert(mae).returning('id')

            for (const bebe of bebes) {
                bebe.mae_id = id
                bebe.local_cadastro = bebe.local
                await trx('bebe').insert(bebe);
            }

            const secret = process.env.SECRET
            const token = jwt.sign({id},secret?secret:"segredo",{
                    expiresIn:3600
            })
            res.json({token})
        })
    }

}

export default UserController;