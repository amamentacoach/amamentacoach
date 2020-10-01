import { Request, Response } from 'express';
import knex from '../database/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
require('dotenv/config');

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
                expiresIn:2592000
            })
            res.json({token})
        }else{
            res.sendStatus(401)
        }
    }

    async forgot(req:Request,res:Response){
        const {email} = req.body;
        const resul = await knex('mae').select('*').where('email','=',email).first()
        if(resul){
            const transporter = nodemailer.createTransport({
                    service: 'Hotmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.SENHA
                    }
            });

            const secret = process.env.SECRET
            const token = jwt.sign({id:resul.id},secret?secret:"segredo",{
                expiresIn:86400
            })


            const link = `${process.env.HOST}/recuperar/${token}` // gerar link

            const email = {
                from: process.env.EMAIL,
                to: resul.email,
                subject: 'Amamenta Coach - Recuperação de senha',
                text: `Olá ${resul.nome}, clique no link abaixo para recuperar sua senha no app Amamenta Coach:\n${link}`,
                html: `<p>Olá <b>${resul.nome}</b>, clique no link abaixo para recuperar sua senha no app <b>Amamenta Coach</b>:</p>${link}`
            }

            transporter.sendMail(email,(err,resul)=>{
                if(err)
                    return res.sendStatus(401)
                else return res.sendStatus(200)
            })
        }
    }

    async recuperarSenha(req:Request,res:Response){
        const {senha} = req.body;

        await knex('mae').update({senha:await bcrypt.hash(senha,10)}).where('id',req.mae_id);
        return res.render('sucesso')
        
    }

    async alterarSenha(req:Request,res:Response){
        const {senha} = req.body;

        await knex('mae').update({senha:await bcrypt.hash(senha,10)}).where('id',req.mae_id);
        return res.sendStatus(200)
    }
}

export default MaesController;