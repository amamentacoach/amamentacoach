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
            whatsapp,
            categoria,
            localizacao,
            data_nascimento,
            veiculo_midia,
            semanas_gestante,
            data_provavel_parto,
            companheiro,
            bebes
        } = req.body;

        await knex.transaction(async trx =>{

            const mae = {
                email, 
                senha:await bcrypt.hash(senha,10), 
                nome, 
                localizacao, 
                data_nascimento, 
                ultimo_acesso:new Date(), 
                primeiro_acesso: new Date(), 
                categoria, 
                whatsapp, 
                veiculo_midia,
                semanas_gestante,
                companheiro: companheiro || false,
                data_provavel_parto
            };

            const [id] = await trx('mae').insert(mae).returning('id')

            if(bebes){
                for (const bebe of bebes) {
                    bebe.mae_id = id
                    bebe.local_cadastro = bebe.local
                    await trx('bebe').insert(bebe);
                }
            }

            const secret = process.env.SECRET
            const token = jwt.sign({id},secret?secret:"segredo",{
                    expiresIn:3600
            })
            res.json({token})
        })
    }

    async update(req:Request, res:Response){
        const {
            email,
            nome, 
            companheiro,
            localizacao,
            data_nascimento,
            bebes
        } = req.body;

        const { mae_id } = req;

        await knex.transaction(async trx =>{

            const mae = {email, nome, companheiro, localizacao, data_nascimento};
            await trx('mae').where({id: mae_id}).update(mae);

            for (let bebe of bebes) {
                bebe.local_cadastro = bebe.local
                const { id, ...bebeUpdate} = bebe;
                await trx('bebe').where({mae_id}).andWhere({id}).update(bebeUpdate);
            }
        });

        const result = await knex('mae')
        .select('*')
        .where('mae.id',mae_id).first()

        result['senha'] = null;

        result['tempo_amamentacao'] = result['tempo_amamentacao'] ? result['tempo_amamentacao'].split('|') : null


        const bebesResult = await knex('bebe').select('*').where('mae_id',mae_id)
        const ordenhas = await knex('ordenha').select('*').where('mae_id',mae_id)

        for (let index = 0; index < bebes.length; index++){
            bebesResult[index].primeiro_estimulo = bebesResult[index].primeiro_estimulo?.split('|')
            bebesResult[index].mamadas = await knex('mamada').select('id','data_hora','mama','duracao').where('bebe_id','=',`${bebesResult[index].id}`)
        }
           
        result.bebes=bebesResult
        result.ordenhas=ordenhas
        return res.json(result);
    }



}

export default UserController;