import { Request, Response } from 'express';
import knex from '../database/connection';

class BebesController{
    async index(req:Request, res:Response){
        const id_mae = req.mae_id;
        const bebes = await knex('bebe').select('*').where('mae_id',id_mae);  
        for (let index = 0; index < bebes.length; index++){
            bebes[index].primeiro_estimulo = bebes[index].primeiro_estimulo.split('|')
            bebes[index].mamadas = await knex('mamada').select('id','data_hora','mama','duracao').where('bebe_id','=',`${bebes[index].id}`)
        }
        return res.json(bebes)
    }

    async show(req:Request, res:Response){
        const {id} = req.params;
        const bebe = await knex('bebe').select('*').where('id',id).first()
        bebe['primeiro_estimulo'] = bebe['primeiro_estimulo'].split('|')
        return res.json(bebe);
    }

    async create(req:Request, res:Response){
        const id_mae = req.mae_id
        const {
            nome,
            data_parto,
            semanas_gest, 
            dias_gest, 
            peso, 
            apgar1,
            apgar2,
            tipo_parto, 
            local,
            complicacoes,
            contato_pele,
            primeiro_estimulo,
            tempo_primeiro_estimulo,
            primeira_visita
        } = req.body;

        const bebe = {
            nome,
            data_parto,
            semanas_gest,
            dias_gest,
            peso,
            apgar1,
            apgar2,
            tipo_parto,
            local,
            local_cadastro:local,
            complicacoes:complicacoes || '',
            contato_pele,
            primeiro_estimulo: primeiro_estimulo.join('|'),
            tempo_primeiro_estimulo,
            primeira_visita,
            mae_id:id_mae
        };
        
        const [id] = await knex('bebe').insert(bebe).returning('id')

        return res.json({
            id_bebe:id,
            nome,
        });


    }
}

export default BebesController;