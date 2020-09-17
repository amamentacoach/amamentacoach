import { Request, Response } from 'express';
import knex from '../database/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

class MaesController{
    async index(req:Request, res:Response){
        const maes = await knex('mae')
            .select('id, email, nome, data_nascimento, companheiro, escolaridade, renda, qtd_gravidez, ultimo_acesso, imagem_mae, imagem_pai');  
        return res.json(maes)
    }

    async show(req:Request, res:Response){
        const {id} = req.params;
        console.log("id",id)
        console.log(req.mae_id)
        if(id==req.mae_id){
            const mae = await knex('mae')
            .select('id', 'email', 'nome', 'ultimo_acesso', 'imagem_mae', 'imagem_pai')
            .where('id',id).first()
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
            qtd_gravidez,
            ultimo_acesso:new Date()
        };
        
        const [id] = await knex('mae').insert(mae).returning('id')

        return res.json({
            id,
        });


    }

    async auth(req:Request,res:Response){
        const {email,senha} = req.body;
        const mae = await knex('mae').select('*').where('email','=',email).first()

        if(await bcrypt.compare(senha,mae.senha)){
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