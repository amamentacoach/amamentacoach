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
            .select('mae.id', 
                    'email', 
                    'mae.nome', 
                    'ultimo_acesso', 
                    'imagem_mae', 
                    'imagem_bebe', 
                    'imagem_pai', 
                    'companheiro', 
                    'data_nascimento', 
                    'localizacao')
            .where('mae.id',id).first()


            const bebes = await knex('bebe').select('*').where('mae_id',id)
            const ordenhas = await knex('ordenha').select('*').where('mae_id',id)

            for (let index = 0; index < bebes.length; index++)
                bebes[index].mamadas = await knex('mamada').select('id','data_hora','mama','duracao').where('bebe_id','=',`${bebes[index].id}`)
                
            mae.bebes=bebes
            mae.ordenhas=ordenhas
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
            amamentou_antes,
            tempo_amamentacao,
            companheiro,
            moram_juntos,
            escolaridade, 
            renda, 
            qtd_gravidez,
            whatsapp,
            gestacao_planejada,
            primeira_visita,
            primeiro_estimulo,
            tempo_primeiro_estimulo,
            qtd_filhos_vivos,
            orientacao_prenatal,
            ocupacao,
            licenca_maternidade,
            localizacao,
            telefone2,
            qtd_abortos,
            numero_filhos_gestacao,
            consultas_prenatal,
            complicacoes_gestacao
        } = req.body;

        const mae = {
            email,
            senha: await bcrypt.hash(senha,10),
            nome,
            data_nascimento,
            amamentou_antes,
            tempo_amamentacao,
            companheiro,
            moram_juntos,
            escolaridade,
            renda,
            qtd_gravidez,
            whatsapp,
            gestacao_planejada,
            primeira_visita,
            primeiro_estimulo,
            ultimo_acesso:new Date(),
            primeiro_acesso: new Date(),
            tempo_primeiro_estimulo,
            qtd_filhos_vivos,
            orientacao_prenatal,
            ocupacao,
            licenca_maternidade,
            localizacao,
            telefone2,
            qtd_abortos,
            numero_filhos_gestacao,
            consultas_prenatal,
            complicacoes_gestacao
        };
        
        const [id] = await knex('mae').insert(mae).returning('id')

        const secret = process.env.SECRET
        const token = jwt.sign({id},secret?secret:"segredo",{
            expiresIn:3600
        })
        res.json({token})

    }

    async auth(req:Request,res:Response){
        const {email,senha} = req.body;
        const mae = await knex('mae').select('*').where('email','=',email).first()

        if(mae && mae.status == 1 && await bcrypt.compare(senha,mae.senha)){
            const secret = process.env.SECRET
            await knex('mae').update({ultimo_acesso:new Date()}).where('id',mae.id)
            const token = jwt.sign({id:mae.id},secret?secret:"segredo",{
                expiresIn:2592000
            })
            res.json({token})
        }else if(mae && mae.status === 0){
            res.sendStatus(404)
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

    async subscribe(req:Request,res:Response){
        const {userId} = req.body;
        const mae = await knex('mae').select('user_id').where('id',req.mae_id).first()
        if(mae.user_id == null && userId.length>1)
            await knex('mae').update({user_id:userId}).where('id',req.mae_id);
        return res.sendStatus(200)
    }

    async esperandoAprovacao(req:Request,res:Response){
        const maes = await knex('mae').select('id','nome','email').where('status',0)
        const countRevogacoes = await knex('mae')
                .where('status',-2)
                .count()
                .first()
        const revogacoes = await knex('mae').select('id','nome','email','whatsapp', 'motivo_revogacao').where('status',-2)
        return res.render('aprovar',{maes, revogacoes, countRevogacoes})
    }

    async aprovar(req:Request,res:Response){
        const {id, acao} = req.params
        if(acao==="aprovar"){
            await knex('mae').update('status',1).where({id})
            return res.sendStatus(200)
        }else if(acao==="reprovar"){
            await knex('mae').update('status',-1).where({id})
            return res.sendStatus(200)
        }
        return res.sendStatus(404)
    }

    async revogar(req:Request,res:Response){
        const id = req.mae_id;
        const {motivo} = req.body
        await knex('mae').update({status: -2, motivo_revogacao: motivo}).where({id})
        return res.sendStatus(200)
    }
}

export default MaesController;