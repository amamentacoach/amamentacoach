

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import knex from '../database/connection';
import moment from 'moment'
require('dotenv/config');

class AdminController{

    async auth(req:Request,res:Response){
        const {password} = req.body;
    
        if(password===process.env.ADMIN_PASSWORD){
            const secret = process.env.SECRET
            const token = jwt.sign({id:999999},secret?secret:"segredo",{
                expiresIn:2592000
            })
            res.json({token})
        }else res.sendStatus(401);
    }

    async showMothers(req:Request,res:Response){
        const {name} = req.query
        if(name){
            const mothers = await knex('mae').select('id','nome').where('nome', 'like', `%${name}%`);
            res.send(mothers)
        }
        else{
            const mothers = await knex('mae').select('id','nome');
            res.send(mothers)
        }
        
    }

    async showMother(req:Request,res:Response){
        const {id} = req.params
        if(id){
            const mother = await knex('mae').select(
                'id',
                'nome',
                'email',
                'data_nascimento',
                'amamentou_antes',
                'tempo_amamentacao',
                'companheiro',
                'moram_juntos',
                'escolaridade',
                'gestacao_planejada',
                'licenca_maternidade',
                'ocupacao',
                'orientacao_prenatal',
                'primeira_visita',
                'qtd_filhos_vivos',
                'qtd_gravidez',
                'renda',
                'primeiro_estimulo',
                'tempo_primeiro_estimulo',
                'whatsapp',
                )
                .where('id',id).first();
            mother['data_nascimento'] = moment(mother['data_nascimento']).format('yyyy-MM-DD')
            res.send(mother);
        }else res.sendStatus(404);     
    }

    async showBaby(req:Request,res:Response){
        const {id} = req.params
        if(id){
            const baby = await knex('bebe').select('*')
                .where('id',id).first();
                baby['data_parto'] = moment(baby['data_parto']).format('yyyy-MM-DD')
                baby['data_alta'] = moment(baby['data_alta']).format('yyyy-MM-DD')
            res.send(baby);
        }else res.sendStatus(404);     
    }

    async showBabies(req:Request,res:Response){
        const {id} = req.params
        if(id){
            const babies = await knex('bebe').select(
                'id',
                'nome'
                )
                .where('mae_id',id);
            res.send(babies);
        }else res.sendStatus(404);     
    }


    async saveMother(req:Request,res:Response){
        const {id} = req.params
        if(id){
            const {
                id,
                nome,
                email,
                data_nascimento,
                amamentou_antes,
                tempo_amamentacao,
                companheiro,
                moram_juntos,
                escolaridade,
                gestacao_planejada,
                licenca_maternidade,
                ocupacao,
                orientacao_prenatal,
                primeira_visita,
                qtd_filhos_vivos,
                qtd_gravidez,
                renda,
                primeiro_estimulo,
                tempo_primeiro_estimulo,
                whatsapp
            } = req.body

            await knex('mae').update({
                nome,
                email, 
                data_nascimento, 
                amamentou_antes, 
                tempo_amamentacao,
                companheiro,
                moram_juntos,
                escolaridade,
                gestacao_planejada,
                licenca_maternidade,
                ocupacao,
                orientacao_prenatal,
                primeira_visita,
                qtd_filhos_vivos,
                qtd_gravidez,
                renda,
                primeiro_estimulo,
                tempo_primeiro_estimulo,
                whatsapp
            }).where('id','=',id)
            res.sendStatus(200)
        
        }else res.sendStatus(404);     
    }

    async saveBaby(req:Request,res:Response){
        const {id} = req.params
        if(id){
            const {
                id,
                nome,
                apgar1,
                apgar2,
                complicacoes,
                contato_pele,
                data_alta,
                data_parto,
                dias_gest,
                local,
                local_cadastro,
                mae_id,
                peso,
                semanas_gest,
                tipo_parto,
            } = req.body

            await knex('bebe').update({
                nome,
                apgar1,
                apgar2,
                complicacoes,
                contato_pele,
                data_alta,
                data_parto,
                dias_gest,
                local,
                local_cadastro,
                mae_id,
                peso,
                semanas_gest,
                tipo_parto,
            }).where('id','=',id)
            res.sendStatus(200)
        
        }else res.sendStatus(404);     
    }

    async recoveryPassword(req:Request, res:Response){
        console.log(req.body);

        const {email, senha} = req.body;

        if(senha !== process.env.ADMIN_PASSWORD){
            return res.send('<h1>Senha administrativa inválida</h1>');
        }

        const resul = await knex('mae').select('*').where('email','=',email).first()
        console.log(resul)
        if(resul){

            const secret = process.env.SECRET
            const token = jwt.sign({id:resul.id},secret?secret:"segredo",{
                expiresIn:86400
            })

            console.log(token)

            return res.redirect(`/recuperar/${token}`)// gerar link
        }else{
            return res.send('<h1>Não foi encontrada uma mãe com este email. Clique em voltar e verifique os dados inseridos.</h1>');
        }
    }
    
}

export default AdminController;