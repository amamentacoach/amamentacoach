import { Request, Response } from 'express';
import knex from '../database/connection';
require('dotenv/config');

class GestanteController{

    async informarNascimento(req:Request, res:Response){
        const {
            companheiro,
            data_parto,
            semanas_gestacao,
            cidade,
            estado,
            bebes
        } = req.body;

        const { mae_id } = req;

        await knex.transaction(async trx =>{

            const mae = {
                companheiro: companheiro || false,
                data_parto,
                semanas_gestacao,
                categoria: 'Mae',
                cidade_estado: `${cidade} - ${estado}`
            };

            await trx('mae').update(mae).where({id: mae_id})

            if(bebes){
                for (const bebe of bebes) {
                    const {
                        nome,
                        local_nascimento,
                        local_atual,
                        instituicao
                    } =  bebe
                    const bebeCadastro = {
                        nome,
                        mae_id,
                        local_cadastro: local_nascimento,
                        local: local_atual,
                        instituicao
                    };
                    await trx('bebe').insert(bebeCadastro);
                }
            }
        })

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

export default GestanteController;