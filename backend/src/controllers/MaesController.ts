import { Request, Response } from 'express';
import knex from '../database/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

class MaesController{

    async show(req:Request, res:Response){
        const id = req.mae_id;
        if(id==req.mae_id){

            const mae = await knex('mae')
            .select('mae.id', 'email', 'mae.nome', 'ultimo_acesso', 'imagem_mae', 'imagem_pai')
            .where('mae.id',id).first()


            const bebes = await knex('bebe').select('*').where('mae_id',id)

            for (let index = 0; index < bebes.length; index++)
                bebes[index].ordenhas = await knex('ordenha').select('id','qtd_leite','data_hora','mama','duracao').where('bebe_id','=',`${bebes[index].id}`)
                
            mae.bebes=bebes
            return res.json(mae);
        }else{
            res.sendStatus(401)
        }
        
    }

    async create(req:Request, res:Response){
        const {
            email,
            senha,
            nome, 
            data_nascimento, 
            companheiro,
            moram_juntos,
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
            moram_juntos,
            escolaridade,
            renda,
            qtd_gravidez,
            ultimo_acesso:new Date(),
        };
        
        const [id] = await knex('mae').insert(mae).returning('id')

        return res.json({
            id,
        });


    }

    async auth(req:Request,res:Response){
        const {email,senha} = req.body;
        const mae = await knex('mae').select('*').where('email','=',email).first()

        if(mae && await bcrypt.compare(senha,mae.senha)){
            const secret = process.env.SECRET
            await knex('mae').update({ultimo_acesso:new Date()}).where('id',mae.id)
            const token = jwt.sign({id:mae.id},secret?secret:"segredo",{
                expiresIn:86400
            })
            res.json({token})
        }else{
            res.sendStatus(401)
        }
    }
}

export default MaesController;